const Therapist = require("../Models/TherapistModel");
const Report = require('../Models/ReportModel');

const uploadDocument = async (req, res) => {
  try {
    const { category, fileName, fileType, fileUrl, patientId, sessionId } = req.body;
    const therapistId = req.params.id;

    const therapist = await Therapist.findById(therapistId);
    if (!therapist) {
      return res.status(404).json({ error: "Therapist not found." });
    }
    const supervisorId = therapist.supervisorId;
    if (category === "sessionReports") {
      const newReport = new Report({ fileName, fileType, fileUrl, patientId, therapistId, supervisorId, sessionId});
      const savedReport = await newReport.save();

      therapist.uploadedDocuments.sessionReports.push({
        report_id: savedReport._id,
        uploadedAt: new Date(),
      });

      await therapist.save();
      return res.status(200).json({ message: "Session report uploaded successfully!" });
    } else {
      return res.status(400).json({ error: "Invalid document category." });
    }
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ error: "Failed to upload document." });
  }
};


const fetchAllDocuments = async (req, res) => {
  try {
    const therapistId = req.params.id;

    const therapist = await Therapist.findById(therapistId);
    if (!therapist) {
      return res.status(404).json({ error: "Therapist not found." });
    }

    res.status(200).json(therapist.uploadedDocuments);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Failed to fetch documents." });
  }
};

// Controller to delete a document
const deleteDocument = async (req, res) => {
  try {
    const { category, documentId } = req.body; 
    const therapistId = req.params.id;

    // Find the therapist by ID
    const therapist = await Therapist.findById(therapistId);
    if (!therapist) {
      return res.status(404).json({ error: "Therapist not found." });
    }

    // Validate the category and remove the document from the array
    if (therapist.uploadedDocuments[category]) {
      therapist.uploadedDocuments[category] = therapist.uploadedDocuments[category].filter(
        (doc) => doc._id.toString() !== documentId
      );

      // Save the updated therapist document
      await therapist.save();
      return res.status(200).json({ message: `Document deleted successfully from ${category}.` });
    } else {
      return res.status(400).json({ error: "Invalid document category." });
    }
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Failed to delete document." });
  }
};

// Controller to fetch documents by category
const fetchDocumentsByCategory = async (req, res) => {
  try {
    const therapistId = req.params.id;
    const category = req.params.category;

    // Find the therapist by ID
    const therapist = await Therapist.findById(therapistId);
    if (!therapist) {
      return res.status(404).json({ error: "Therapist not found." });
    }

    // Return the documents for the specific category
    if (therapist.uploadedDocuments[category]) {
      return res.status(200).json(therapist.uploadedDocuments[category]);
    } else {
      return res.status(400).json({ error: "Invalid document category." });
    }
  } catch (error) {
    console.error("Error fetching documents by category:", error);
    res.status(500).json({ error: "Failed to fetch documents." });
  }
};

module.exports = {
  uploadDocument,
  fetchAllDocuments,
  deleteDocument,
  fetchDocumentsByCategory,
};
