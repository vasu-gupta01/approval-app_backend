const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentsSchema = new Schema({
  name: String,
});

const RolesSchema = new Schema({
  description: String,
  name: String,
  level: Number,
  department: {},
});

const Roles = mongoose.model("roles", RolesSchema);
const Department = mongoose.model("departments", DepartmentsSchema);

module.exports = Roles;
