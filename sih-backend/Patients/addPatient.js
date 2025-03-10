const Patient = require('../Models/PatientModel');

const addPatient = async (req, res) => {
  const { name, age, email, address, gender, phone, problem, goals } = req.body;

  if (!name || !age || !email || !address || !gender || !phone || !problem || !goals ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: 'Patient with this email already exists' });
    }

    const newPatient = new Patient({
      name,
      age,
      email,
      address,
      gender,
      phone,
      problem,
      goals,
    });

    await newPatient.save();

    res.status(201).json({ message: 'Patient added successfully', patient: newPatient });
  } catch (error) {
    console.error('Error adding patient:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addPatient };
