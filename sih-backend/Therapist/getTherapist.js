const Therapist = require('../Models/TherapistModel'); // Adjust the path as needed


const getTherapistById = async (req, res) => {
    console.log("getTherapistById");
    try {
      const { id } = req.params;
      console.log("ID", id);
  
      const therapist = await Therapist.findById(id);
      if (!therapist) {
        return res.status(404).json({ message: "therapist not found" });
      }
  
      res.status(200).json({ therapist });
    } catch (error) {
      res.status(500).json({ message: "Error fetching therapist", error });
    }
  };

  module.exports = {getTherapistById};