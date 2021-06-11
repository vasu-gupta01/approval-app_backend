const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.approverModels = require("./approvers");
// db.roles = require("./roles");
db.formModels = require("./forms");
db.approvalModels = require("./approvalRequests");

module.exports = db;
