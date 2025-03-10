const { model } = require("mongoose");
const Hod = require('../Models/HodModel'); // Adjust path as needed
const { compareData } = require("../utils/encryptionutil");
const { verifyPassword } = require("../utils/password");
// const {}
const loginHod = async (req, res) => {
    try {
      const { email, password } = req.body;
        console.log(email);
      const hod = await Hod.findOne({ email });
      console.log(hod);
      if (!hod) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    //   console.log(temp);
    console.log(password,hod.password);
      const isPasswordValid = await verifyPassword(password, hod.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      
      res
        .status(200)
        .json({ message: "Login successful", id: hod._id });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error: `${error}` });
    }
  };

  module.exports = {loginHod}