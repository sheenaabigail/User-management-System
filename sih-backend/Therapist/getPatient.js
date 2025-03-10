const Patient = require('../Models/PatientModel');

const getPatientAssignedToTherapist = async (req, res) => {
  try {
    const {therapistId} = req.body;
		console.log(therapistId);
    console.log("Hi");
    const patients = await Patient.find({therapistId:therapistId});
		console.log(patients)
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
};

module.exports = {  getPatientAssignedToTherapist  };
