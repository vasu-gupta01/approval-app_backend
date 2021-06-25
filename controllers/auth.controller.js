const config = require("../config/auth.config");
const db = require("../models");
const Approvers = db.approverModels.Approvers;
const Roles = db.approverModels.Roles;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const approver = new Approvers({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  approver.save((err, approver) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Approver was registered successfully!" });
  });
};

exports.signin = (req, res) => {
  Approvers.findOne({
    username: req.body.username,
  })
    .select("+password")
    .populate("role")
    .populate({ path: "role", populate: { path: "department" } })
    .exec((err, approver) => {
      if (err) {
        res.status(500).send({ message: err });
        console.log(err);
        return;
      }

      if (!approver) {
        return res.status(404).send({ message: "Approver not found." });
      }

      console.log(approver.role);

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        approver.password
      );

      if (!passwordIsValid) {
        return res
          .status(401)
          .send({ accessToken: null, message: "Invalid Password!" });
      }

      var token = jwt.sign(
        { id: approver.id, role: approver.role },
        config.secret,
        {
          expiresIn: 86400,
        }
      );

      res.status(200).send({
        id: approver._id,
        firstname: approver.firstname,
        lastname: approver.lastname,
        username: approver.username,
        role: approver.role,
        accessToken: token,
      });
    });
};
