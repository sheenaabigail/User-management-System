const Patient = require('../Models/PatientModel');

const getUnassignedPatient = async (req, res) => {
    try {
      console.log("Hi");
      // Fetch patients where therapistId is null
      const patients = await Patient.find({ therapistId: null });
      
      if (!patients.length) {
        return res.status(201).json({ message: "No patients found without a therapist." });
      }
  
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch patients" });
    }
  };
  
module.exports = { getUnassignedPatient};
  