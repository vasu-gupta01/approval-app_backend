const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FieldTypesSchema = new Schema({
  name: String,
  options: Array,
});

const FieldsSchema = new Schema({
  name: String,
  required: Boolean,
  type: { type: Schema.Types.ObjectId, ref: "FieldTypes" },
});

const FormsSchema = new Schema({
  fields: [FieldsSchema],
  name: String,
  finals: [{ type: Schema.Types.ObjectId, ref: "approvers" }],
  date_created: { type: Date, default: Date.now },
  counter: Number,
  stages: Object,
});

const Forms = mongoose.model("forms", FormsSchema);

const FieldTypes = mongoose.model("fieldtypes", FieldTypesSchema);

const FormModels = {
  Forms,
  FieldTypes,
};

module.exports = FormModels;
