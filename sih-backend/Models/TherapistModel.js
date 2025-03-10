const mongoose = require('mongoose');
const { Schema } = mongoose;

const therapistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    languages: {
        type: [String],
        required: true
    },
    specialization: {
        type: [String], 
        required: true
    },
    casesHandled:{
        type: Number,
    },
    year: {
        type: String,
        required: true
    },
    availability: {
        type: [Date],
    },
    password: {
        type: String,
        required: true,
        default: 'welcome' 
    },
    gender: {
      type: String,
      required: true
  },

  assignedPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
  availableTimes: [
      {
      day: { type: String, required: true },
      slots: [
          {
          startTime: { type: String, required: true },
          endTime: { type: String, required: true },
          isAvailable: { type: Boolean, required: true }
          }
      ]
      }
  ],
  
}, { timestamps: true });

module.exports = mongoose.model('Therapist', therapistSchema);
