const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const SingleFieldSchema = new Schema({
//   _id: mongoose.ObjectId,
//   value: String,
// });

// const ApprovalRequestsSchema = new Schema({
//   data: [SingleFieldSchema],
// });

// const ApprovalRequestsSchema = new Schema({
//   filled_by: String,
//   form_title: String,
//   fields: Array,
//   approved: Boolean,
//   date_filled: { type: Date, default: Date.now },
//   date_approved: { type: Date, default: null },
//   approval: Object,
// });

const ApprovalSchema = new Schema({
  approver: { type: Schema.Types.ObjectId, ref: "approvers" },
  status: Number,
  comments: String,
  date_approved: { type: Date, default: null },
});

const FieldsSchema = new Schema({
  field_id: Schema.Types.ObjectId,
  name: String,
  value: String,
});

const ApprovalRequestsSchema = new Schema({
  serial_number: String,
  fields: [FieldsSchema],
  filled_by: String,
  department: String,
  form: { type: Schema.Types.ObjectId, ref: "forms" },
  approval: [{ type: Schema.Types.ObjectId, ref: "approvals" }],
  date_submitted: { type: Date, default: Date.now },
  final_approval: { type: Number, default: 0 },
  approval_date: { type: Date, default: null },
});

// const ApprovalRequestsSchema = new Schema({
//   data: [
//     {
//       field_id: {
//         type: mongoose.ObjectId,
//         required: [true, "The field ID is required"],
//       },

//       value: String,
//     },
//   ],
// });

// ApprovalRequestsSchema.pre("save", (next) => {
//   now = new Date();

//   this.date_filled = now;

//   next();
// });

const Approvals = mongoose.model("approvals", ApprovalSchema);

const ApprovalRequests = mongoose.model(
  "approvalRequests",
  ApprovalRequestsSchema
);

const ApprovalModels = {
  Approvals,
  ApprovalRequests,
};

module.exports = ApprovalModels;
