const Supervisor = require('../Models/SupervisorModel'); // Adjust the path as needed

const updateSupervisorById = async (req, res) => {
    try {
      const { id } = req.params;
    //   console.log(id);
      const updatedData = req.body;
      console.log("ID", id);
      console.log("hi", updatedData);
      const supervisor = await Supervisor.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      console.log(supervisor);
      if (!supervisor) {
        return res.status(404).json({ message: "supervisor not found" });
      }
  
      res
        .status(200)
        .json({ message: "supervisor updated successfully", supervisor });
    } catch (error) {
      res.status(500).json({ message: "Error updating supervisor", error:`${error}` });
    }
  };

  module.exports = {updateSupervisorById};