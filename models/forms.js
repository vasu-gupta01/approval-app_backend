const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FieldTypesSchema = new Schema({
  name: String,
  options: Array,
});

const ViewerTypesSchema = new Schema({
  name: String,
});

const FieldsSchema = new Schema({
  name: String,
  required: Boolean,
  type: { type: Schema.Types.ObjectId, ref: "FieldTypes" },
});

const ViewerControlsSchema = new Schema({
  name: String,
  type: { type: Schema.Types.ObjectId, ref: "viewerfieldtypes" },
});

const FormsSchema = new Schema({
  fields: [FieldsSchema],
  viewer_fields: [ViewerControlsSchema],
  name: String,
  finals: [{ type: Schema.Types.ObjectId, ref: "approvers" }],
  date_created: { type: Date, default: Date.now },
  counter: Number,
  stages: Object,
});

const Forms = mongoose.model("forms", FormsSchema);

const FieldTypes = mongoose.model("fieldtypes", FieldTypesSchema);
const ViewerFieldTypes = mongoose.model("viewerfieldtypes", ViewerTypesSchema);

const FormModels = {
  Forms,
  FieldTypes,
  ViewerFieldTypes,
};

module.exports = FormModels;
