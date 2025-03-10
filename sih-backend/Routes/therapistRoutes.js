const express = require('express');
const { uploadDocument, fetchAllDocuments, deleteDocument, fetchDocumentsByCategory } = require('../Therapist/DocumentManagement');
const {registerTherapist} = require("../Therapist/addTherapist");
const { loginTherapist } = require('../Therapist/loginTherapist');
const { getAllTherapists } = require('../Therapist/getAllTherapist');
const { getPatientAssignedToTherapist } = require('../Therapist/getPatient');
const { getAssignedReports } = require('../Supervisor/EvaluationReports');
const { updateTherapistById } = require('../Therapist/updateTherapist');
const { getTherapistById } = require('../Therapist/getTherapist');
const router = express.Router();

router.post("/:id/upload-document", uploadDocument);
router.get("/:id/documents", fetchAllDocuments);
router.delete("/:id/delete-document", deleteDocument);
router.get("/:id/documents/:category", fetchDocumentsByCategory);
router.post('/addTherapist', registerTherapist);
router.post('/login',loginTherapist)
router.get('/allTherapist',getAllTherapists);
router.post('/getPatient',getPatientAssignedToTherapist);

module.exports = router;
