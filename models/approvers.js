const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RolesSchema = new Schema({
  description: String,
  name: String,
  level: Number,
});

const ApproversSchema = new Schema({
  username: String,
  email: String,
  password: { type: String, select: false },
  firstname: String,
  lastname: String,
  role: { type: Schema.Types.ObjectId, ref: "roles" },
});

const Roles = mongoose.model("roles", RolesSchema);

const Approvers = mongoose.model("approvers", ApproversSchema);

const ApproverModels = {
  Roles,
  Approvers,
};

module.exports = ApproverModels;
