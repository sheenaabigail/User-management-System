const { model } = require("mongoose");
const Admin = require('../Models/AdminModel'); // Adjust path as needed
// const { compareData } = require("../utils/pass");
const {verifyPassword} = require("../utils/password")
const loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
        console.log(email);
      const admin = await Admin.findOne({ email });
      console.log(admin);
      if (!admin) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    //   console.log(temp);
    console.log(password,admin.password);
      const isPasswordValid = await verifyPassword(password, admin.password);
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      
      res
        .status(200)
        .json({ message: "Login successful", id: admin._id });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error: `${error}` });
    }
  };

  module.exports = {loginAdmin}