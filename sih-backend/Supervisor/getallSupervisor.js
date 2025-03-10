// const Patient = require('../Models/PatientModel');
const Supervisor = require('../Models/SupervisorModel');

const getAllSupervisor = async (req, res) => {
  try {
    console.log("Hi");
    const supervisors = await Supervisor.find({});
    res.status(200).json(supervisors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch supervisors' });
  }
};

module.exports = { getAllSupervisor };
