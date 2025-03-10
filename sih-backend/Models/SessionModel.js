const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const SessionSchema = new Schema({
    patientId: {
        type: Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    therapistId: {
        type: Types.ObjectId,
        ref: 'Therapist',
        required: true,
    },
    startTime: { 
        type: Date, 
        required: true 
    },
    endTime: { 
        type: Date, 
        required: true 
    },
    rating: {
        type: Number,
        min: 1.0,
        max: 5.0,
        required: false,
    },
    sessionNotes: {
        type: [String],
        default: [],
    },
    documents: [
        {
            documentType: {
                type: String,
                enum: ['preTherapyEvaluations', 'therapyPlans', 'videoRecords', 'sessionReports'],
                required: true,
            },
            reportStatus: {
                type: String,
                default: 'pending', // Default status for each document
            },
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Session', SessionSchema);
