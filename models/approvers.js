const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentsSchema = new Schema({
  name: String,
});

const RolesSchema = new Schema({
  description: String,
  name: String,
  level: Number,
  department: { type: Schema.Types.ObjectId, ref: "departments" },
});

const ApproversSchema = new Schema({
  username: String,
  email: String,
  password: { type: String, select: false },
  firstname: String,
  lastname: String,
  role: { type: Schema.Types.ObjectId, ref: "roles" },
});

const Departments = mongoose.model("departments", DepartmentsSchema);

const Roles = mongoose.model("roles", RolesSchema);

const Approvers = mongoose.model("approvers", ApproversSchema);

const ApproverModels = {
  Roles,
  Approvers,
  Departments,
};

module.exports = ApproverModels;
