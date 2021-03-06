const { authJwt } = require("../middlewares");
const controller = require("../controllers/app.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    // const allowedOrigins = [
    //   "http://localhost:3000",
    //   "http://localhost:3001",
    //   "http://localhost:3002",
    // ];
    // const origin = req.headers.origin;
    // if (allowedOrigins.includes(origin)) {
    //   res.setHeader("Access-Control-Allow-Origin", origin);
    // }
    // res.header("Access-Control-Allow-Origin", "http://192.168.86.240:3001");
    // res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/getforms", controller.getAllForms);

  app.post("/api/getviewerfields", controller.getViewerFields);

  app.get("/api/getfieldtypes", controller.getFieldTypes);

  app.get("/api/getviewerfieldtypes", controller.getViewerFieldTypes);

  app.post(
    "/api/updaterequestviewerfields",
    [authJwt.verifyToken],
    controller.updateApprovalViewerFields
  );

  app.post(
    "/api/getapprovalrequests",
    [authJwt.verifyToken],
    controller.getAllApprovalRequests
  );

  app.post(
    "/api/dashapprovalrequests",
    controller.getDashboardApprovalRequests
  );

  app.get("/api/getapprovers", controller.getApprovers);

  app.get("/api/getapproverswithoutmod", controller.getApproversWithoutMod);

  app.get("/api/getroles", controller.getRoles);

  app.get("/api/getdepartments", controller.getDepartments);

  app.post(
    "/api/approver/update",
    [authJwt.verifyToken],
    controller.updateApprover
  );

  app.post("/api/role/update", [authJwt.verifyToken], controller.updateRole);

  app.post("/api/createrole", [authJwt.verifyToken], controller.createRole);

  app.post(
    "/api/createdepartment",
    [authJwt.verifyToken],
    controller.createDepartment
  );

  app.post(
    "/api/updatedepartment",
    [authJwt.verifyToken],
    controller.departmentsUpdate
  );

  app.post(
    "/api/updateapproval",
    [authJwt.verifyToken],
    controller.updateApproval
  );

  app.post(
    "/api/getapprovalrequest",
    [authJwt.verifyToken],
    controller.getApprovalRequest
  );

  app.post("/api/updateform", [authJwt.verifyToken], controller.updateForm);

  app.post("/api/createform", [authJwt.verifyToken], controller.createForm);

  app.post("/api/sendform", controller.sendForm);

  app.post("/api/getform", controller.getForm);

  // TEMPORARY
  app.post("/api/mail/send", controller.sendmail);
};
