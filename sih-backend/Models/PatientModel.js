const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
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
    address:{
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    goals: {
        type: String
    },
    therapistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapist',
    },
    language: {
        type: [String], 
        required: true
    },
    specializationNeeded: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'terminated'],
        default: 'active'
    },
    terminationReason: {
        type: String
    },
    transferHistory: [
        {
            fromTherapistId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Therapist'
            },
            toTherapistId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Therapist'
            },
            dateOfTransfer: {
                type: Date,
                default: Date.now
            }
        }
    ],
    exercises: Array,
    noOfSessions: {
        type: Number,
        default: 0
    },
    sessionLogs: [
        {
          sessionId: {
            type: mongoose.Schema.Types.ObjectId,
          },
          therapistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Therapist',
          },
          sessionNotes: {
            type: [String],
            default: [],
          },
          sessionDate: {
            type: Date,
          },
          documents: [
            {
              documentType: {
                type: String,
                enum: ['preTherapyEvaluations', 'therapyPlans', 'videoRecords', 'sessionReports'],
              },
              reportStatus: {
                type: String,
                default: 'pending', // Default status for each document
              },
            }
          ]
        }
      ]
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
