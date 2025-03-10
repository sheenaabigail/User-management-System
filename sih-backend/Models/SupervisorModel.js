const mongoose = require("mongoose");
const { Schema } = mongoose;

const supervisorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  experience: { type: String, required: true },
  qualification: { type: String, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true, default: 'welcome' },

  reports_assigned: [
    {
      report_id: { type: String, required: true },
      therapistId: { type: String, required: true },
      submission_date: { type: Date, required: true },
      status: {
        type: String,
        enum: ["Pending", "Reviewed", "Feedback Provided"],
        default: "Pending",
      },
      feedback_given: [
        {
          feedback_id: { type: String, required: true },
          report_id: { type: String, required: true, ref:'Report' },
          therapistId: { type: String, required: true },
          feedback_text: { type: String, required: true },
          rating: { type: Number, min: 1, max: 10, required: true },
          clinical_rating: {
            type: Number,
            min: 1,
            max: 10,
            required: true,
          },
          feedback_date: { type: Date, required: true },
        },
      ],
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Supervisor = mongoose.model("Supervisor", supervisorSchema);

module.exports = Supervisor;
