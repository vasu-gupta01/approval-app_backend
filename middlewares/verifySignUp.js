const db = require("../models");
const Approvers = db.approvers;

checkDuplicateUsername = (req, res, next) => {
  Approvers.findOne({
    username: req.body.username,
  }).exec((err, approver) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (approver) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    next();
  });
};

const verifySignUp = {
  checkDuplicateUsername,
};

module.exports = verifySignUp;
