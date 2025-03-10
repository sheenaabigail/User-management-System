const Hod = require('../Models/HodModel'); // Adjust the path as needed

const updateHodById = async (req, res) => {
    try {
      const { id } = req.params;
    //   console.log(id);
      const updatedData = req.body;
      console.log("ID", id);
      console.log("hi", updatedData);
      const therapist = await Hod.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      console.log(hod);
      if (!hod) {
        return res.status(404).json({ message: "hod not found" });
      }
  
      res
        .status(200)
        .json({ message: "hod updated successfully", hod });
    } catch (error) {
      res.status(500).json({ message: "Error updating hod", error:`${error}` });
    }
  };

  module.exports = {updateHodById};