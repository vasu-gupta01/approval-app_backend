const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RolesSchema = new Schema({
  description: String,
  name: String,
  level: Number,
});

const Roles = mongoose.model("roles", RolesSchema);

module.exports = Roles;
