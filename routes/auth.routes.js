const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

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
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUsername],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
