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

  app.get(
    "/api/getapprovalrequests",
    [authJwt.verifyToken],
    controller.getAllApprovalRequests
  );

  app.get("/api/getapprovers", controller.getApprovers);

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

  app.post("/api/sendform", controller.sendForm);

  app.post("/api/getform", controller.getForm);
};
