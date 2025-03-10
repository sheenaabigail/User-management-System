const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  report_id: {
    type: String,
    required: true,
    unique: true,
  },
  patientId:{
    type:mongoose.Types.ObjectId,
    required: true,},

  therapistId: {
    type: String,
    required: true,
  },
  supervisorId: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    enum: ['pdf', 'docx', 'txt'],
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  evaluation_status: {
    type: String,
    enum: ["Pending", "Reviewed"],
    default: "Pending",
  },
  evaluation_date: {
    type: Date,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  clinical_rating: {
    type: Number,
    min: 1,
    max: 10,
  },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
