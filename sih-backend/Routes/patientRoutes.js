const express = require('express');
const { getAllPatients } = require('../Patients/getAllPatients');
const { addPatient } = require('../Patients/addPatient');
const { getSlotsForPatient } = require('../Patients/AvailableSlots');
const { scheduleSession } = require('../Patients/SessionSchedular');
const { assignTherapist } = require('../Patients/AssignTherapist');
const { getUnassignedPatient } = require('../Patients/getUnassignedPatient');
const getPatientList = require('../Patients/PatientList');

const router = express.Router();

router.get('/allPatients', getAllPatients);
router.post('/addPatient', addPatient);
router.get('/:patientId/availableSlots', getSlotsForPatient);
router.post('/schedule',scheduleSession);
router.post('/assignTherapist', assignTherapist);
router.get('/unassignedPatients',getUnassignedPatient);
router.get("/patientDetails", getPatientList);

module.exports = router;
