const mongoose = require('mongoose');

const hodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true, default: "welcome" },
  languages: { type: String, required: true },
  year: { type: String, required: true },
  gender: { type: String, required: true },
});

module.exports = mongoose.model('hod', hodSchema);
