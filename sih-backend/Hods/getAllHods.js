const Patient = require('../Models/HodModel');

const getAllHods = async (req, res) => {
  try {
    const Hods = await Patient.find({});
    res.status(200).json(Hods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Hods' });
  }
};

module.exports = { getAllHods };
