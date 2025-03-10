const Supervisor = require("../Models/SupervisorModel");
const Report = require("../Models/ReportModel");
const mongoose = require("mongoose");

const evaluateReport = async (req, res) => {
  const {
    supervisorId,
    report_id,
    feedback_text,
    rating,
    clinical_rating,
    therapistId,
  } = req.body;

  try {
    const supervisor = await Supervisor.findById(supervisorId);
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    const report = await Report.findById(report_id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    if (report.therapistId !== therapistId) {
      return res
        .status(400)
        .json({ message: "Report does not belong to the specified student" });
    }

    if (report.supervisorId !== supervisorId) {
      return res
        .status(400)
        .json({ message: "Supervisor is not assigned to this report" });
    }

    report.evaluation_status = "Reviewed";
    report.evaluation_date = new Date();
    report.rating = rating;
    report.clinical_rating = clinical_rating;

    await report.save();

    supervisor.reports_assigned.forEach((reportAssignment) => {
      if (reportAssignment.report_id === report_id) {
        reportAssignment.status = "Feedback Provided";
        reportAssignment.feedback_given.push({
          feedback_id: new mongoose.Types.ObjectId(),
          report_id,
          therapistId,
          feedback_text,
          rating,
          clinical_rating,
          feedback_date: new Date(),
        });
      }
    });

    await supervisor.save();

    return res.status(200).json({
      message:
        "Report evaluated, feedback, and clinical rating provided successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAssignedReports = async (req, res) => {
  const { supervisorId } = req.params;

  try {
    const supervisor = await Supervisor.findById(supervisorId).populate(
      "reports_assigned.report_id"
    );

    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    return res
      .status(200)
      .json({ reports_assigned: supervisor.reports_assigned });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { evaluateReport, getAssignedReports };
