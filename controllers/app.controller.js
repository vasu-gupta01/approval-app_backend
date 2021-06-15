const jwt = require("jsonwebtoken");
const db = require("../models");
const config = require("../config/auth.config");
const Forms = db.formModels.Forms;
const Fields = db.formModels.FieldTypes;
const ApprovalRequests = db.approvalModels.ApprovalRequests;
const Approvals = db.approvalModels.Approvals;
const Approvers = db.approverModels.Approvers;

exports.getAllForms = (req, res) => {
  Forms.find({}).then((data) => res.json(data));
};

exports.getApprovers = (req, res) => {
  Approvers.find({}).then((data) => res.json(data));
};

exports.getForm = (req, res) => {
  Forms.findOne({
    _id: req.body.id,
  }).exec((err, form) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      var fields_arr = [];
      findFieldTypes(form.fields).then((return_val) => {
        fields_arr = return_val;

        const body = {
          _id: form._id,
          fields: return_val,
          name: form.name,
        };
        res.status(200).send(body);
      });
    }
  });
};

exports.getAllApprovalRequests = (req, res) => {
  // ApprovalRequests.find({}).then((data) => res.json(data));
  if (req.headers) {
    var decoded = jwt.verify(req.headers["x-access-token"], config.secret);

    switch (decoded.role.level) {
      case 1:
        getApprovalRequestsfromDB(req, res, {
          department: decoded.role.department,
        });
        break;
      case 2:
        getApprovalRequestsfromDB(req, res, {});
        break;
      case 3:
        getApprovalRequestsfromDB(req, res, {});
        break;
      default:
        res.status(401).send({ message: "Unauthorized!" });
        break;
    }
  }
};

let getApprovalRequestsfromDB = async (req, res, criteria) => {
  await ApprovalRequests.find(criteria)
    .select("filled_by approval form date_submitted")
    .populate("form", "name")
    .populate({
      path: "approval",
      populate: { path: "approver" },
    })
    .exec((err, approvals) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send(approvals);
    });
};

exports.getApprovalRequest = (req, res) => {
  ApprovalRequests.findOne({
    _id: req.body.id,
  })
    .select("filled_by fields form approval date_submitted department")
    .populate("approval")
    .populate("form")
    .exec((err, data) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        let found = false;
        var approver = undefined;
        for (let app of data.approval) {
          if (app.approver == req.body.approver) {
            found = true;
            approver = app;
            console.log(approver);
          }
        }
        if (found && approver) {
          const send_data = {
            filled_by: data.filled_by,
            fields: data.fields,
            form: data.form,
            approval: approver,
            date_submitted: data.date_submitted,
            department: data.department,
          };

          res.status(200).send(send_data);
        } else {
          const send_data = {
            filled_by: data.filled_by,
            fields: data.fields,
            form: data.form,
            approval: null,
            date_submitted: data.date_submitted,
            department: data.department,
          };
          res.status(200).send(send_data);
        }
      }
    });
};

exports.updateApproval = (req, res) => {
  ApprovalRequests.findOne({ _id: req.body.request_id })
    .select("approval")
    .populate("approval")
    .exec((err, request) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        for (let app of request.approval) {
          if (app.approver == req.body.approver) {
            const now = new Date();

            Approvals.findByIdAndUpdate(
              app,
              {
                $set: {
                  status: req.body.action,
                  comments: req.body.comments,
                  date_approved: now,
                },
              },
              (err, resp) => {
                if (err) {
                  console.log(err);
                  res
                    .status(401)
                    .send({ message: "Unable to update approval" });
                } else {
                  res.status(200).send({ message: "Approval Updated!" });
                }
              }
            );
          }
        }
      }
    });
};

exports.sendForm = (req, res) => {
  const approvals = req.body.approval;

  createApprovals(approvals)
    .then((return_val) => {
      const body = {
        fields: req.body.fields,
        filled_by: req.body.filled_by,
        form_title: req.body.form_title,
        approval: return_val,
        form: req.body.form_id,
        department: req.body.department,
      };

      ApprovalRequests.create(body, (check_keys = false)).then(() => {
        console.log(return_val);
        res.status(200).send({ message: "Submitted request successfully!" });
      });
    })
    .catch((e) => {
      res.status(401).send({ message: e });
    });
};

let createApprovals = async (approvals) => {
  let return_approvals = [];

  if (approvals) {
    try {
      for (let app of approvals) {
        const body = {
          approver: app,
          status: 0,
          comments: "",
        };

        await Approvals.create(body, (check_keys = false)).then((appr) => {
          return_approvals.push(appr._id);
        });
      }

      return return_approvals;
    } catch (e) {
      console.log(e);
    }
  } else {
    throw new Error("Approvals empty");
  }
};

let findFieldTypes = async (form_fields) => {
  let return_arr = [];

  if (form_fields) {
    try {
      for (let field_type of form_fields) {
        let action = await Fields.findOne({
          _id: field_type.type,
        }).exec();

        return_arr.push({
          _id: field_type._id,
          name: field_type.name,
          required: field_type.required,
          type: action,
        });
      }

      return return_arr;
    } catch (e) {}
  }
};
