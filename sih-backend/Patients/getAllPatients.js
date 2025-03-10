const Patient = require('../Models/PatientModel');

const getAllPatients = async (req, res) => {
  try {
    console.log("Hi");
    const patients = await Patient.find({});
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
};

module.exports = { getAllPatients };
