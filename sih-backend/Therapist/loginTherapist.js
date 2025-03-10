const { model } = require("mongoose");
const Therapist = require('../Models/TherapistModel'); // Adjust path as needed
const { compareData } = require("../utils/encryptionutil");
const { verifyPassword } = require("../utils/password");
const loginTherapist = async (req, res) => {
    try {
      const { email, password } = req.body;
        console.log(email);
      const therapist = await Therapist.findOne({ email });
      console.log(therapist);
      if (!therapist) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    //   console.log(temp);
    console.log(password,therapist.password);
      const isPasswordValid = await verifyPassword(password, therapist.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      
      res
        .status(200)
        .json({ message: "Login successful", id: therapist._id });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error: `${error}` });
    }
  };

  module.exports = {loginTherapist}