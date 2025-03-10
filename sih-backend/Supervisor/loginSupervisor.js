const { model } = require("mongoose");
const Supervisor = require('../Models/SupervisorModel'); // Adjust path as needed
const { compareData } = require("../utils/encryptionutil");
const { verifyPassword } = require("../utils/password");
const loginSupervisor = async (req, res) => {
    try {
      const { email, password } = req.body;
        console.log(email);
      const supervisor = await Supervisor.findOne({ email });
      console.log(supervisor);
      if (!supervisor) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    //   console.log(temp);
    console.log(password,supervisor.password);
      const isPasswordValid = await verifyPassword(password, supervisor.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      
      res
        .status(200)
        .json({ message: "Login successful", id: supervisor._id });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error: `${error}` });
    }
  };

  module.exports = {loginSupervisor}