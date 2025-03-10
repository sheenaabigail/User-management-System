const Patient = require('../Models/PatientModel');
const Therapist = require('../Models/TherapistModel');
const Notification = require('../Models/NotificationModel');  // Assuming you have a Notification model

const assignTherapist = async (req, res) => {
    const { patientId, therapistId, adminId } = req.body;
    console.log("Assigning Therapist...");
    try {
        // Update the Therapist model
        console.log(patientId, therapistId);
        const therapist = await Therapist.findByIdAndUpdate(
            therapistId,
            { $push: { assignedPatients: patientId } },
            { new: true }
        );

        // Update the Patient model
        const patient = await Patient.findByIdAndUpdate(
            patientId,
            { therapistId: therapistId },
            { new: true }
        );

        // Create notifications for Admin, Therapist, and Supervisor
        const adminNotification = new Notification({
            userId: adminId,
            message: `Patient ${patient.name} has been successfully assigned to therapist ${therapist.name}.`,
            role: 'admin',
            timestamp: new Date(),
        });
        await adminNotification.save();

        const therapistNotification = new Notification({
            userId: therapistId,
            message: `You have been assigned a new patient: ${patient.name}.`,
            role: 'therapist',
            timestamp: new Date(),
        });
        await therapistNotification.save();

        // Assuming supervisorId is passed, if not, you can set it based on your logic
        const supervisorId = patient.supervisorId;  // Replace this with actual logic to fetch the supervisor
        const supervisorNotification = new Notification({
            userId: supervisorId,
            message: `Patient ${patient.name} has been assigned a therapist.`,
            role: 'supervisor',
            timestamp: new Date(),
        });
        await supervisorNotification.save();

        res.json({
            message: 'Patient assigned to therapist successfully',
            patient,
            therapist,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = { assignTherapist };
