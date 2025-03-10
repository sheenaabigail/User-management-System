const Supervisor = require('../Models/SupervisorModel'); // Adjust the path as needed


const getSupervisorById = async (req, res) => {
    console.log("getsupervisorById");
    try {
      const { id } = req.params;
      console.log("ID", id);
  
      const supervisor = await Supervisor.findById(id);
      if (!supervisor) {
        return res.status(404).json({ message: "supervisor not found" });
      }
  
      res.status(200).json({ supervisor });
    } catch (error) {
      res.status(500).json({ message: "Error fetching supervisor", error });
    }
  };

  module.exports = {getSupervisorById};