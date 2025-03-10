const Therapist = require('../Models/TherapistModel'); // Adjust the path as needed

const updateTherapistById = async (req, res) => {
    try {
      const { id } = req.params;
    //   console.log(id);
      const updatedData = req.body;
      console.log("ID", id);
      console.log("hi", updatedData);
      const therapist = await Therapist.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      console.log(therapist);
      if (!therapist) {
        return res.status(404).json({ message: "therapist not found" });
      }
  
      res
        .status(200)
        .json({ message: "therapist updated successfully", therapist });
    } catch (error) {
      res.status(500).json({ message: "Error updating therapist", error:`${error}` });
    }
  };

  module.exports = {updateTherapistById};