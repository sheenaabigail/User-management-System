const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user
    message: { type: String, required: true },
    role: { type: String, enum: ['admin', 'therapist', 'supervisor'], required: true },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
