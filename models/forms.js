const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FieldTypesSchema = new Schema({
  name: String,
  options: Array,
});

const FieldsSchema = new Schema({
  _id: mongoose.ObjectId,
  name: String,
  required: Boolean,
  type: { type: Schema.Types.ObjectId, ref: "FieldTypes" },
});

const FormsSchema = new Schema({
  fields: [FieldsSchema],
  name: String,
});

const Forms = mongoose.model("forms", FormsSchema);

const FieldTypes = mongoose.model("fieldtypes", FieldTypesSchema);

const FormModels = {
  Forms,
  FieldTypes,
};

module.exports = FormModels;
