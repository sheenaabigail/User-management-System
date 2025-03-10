const Patient = require('../Models/PatientModel');
const Therapist = require('../Models/TherapistModel');

const allocatePatientToTherapist = async (req, res) => {
    const { patientId, therapistId } = req.body;

    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).send('Patient not found');
        }

        const therapist = await Therapist.findById(therapistId);
        if (!therapist) {
            return res.status(404).send('Therapist not found');
        }

        patient.therapistId = therapistId;
        await patient.save();

        res.status(200).send('Patient allocated to therapist successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const transferPatient = async (req, res) => {
    const { patientId, toTherapistId } = req.body;

    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).send('Patient not found');
        }
        
        const fromTherapistS = await Patient.findById(patientId).exec();
        const fromTherapistId = fromTherapistS.therapistId.toString();
        console.log(fromTherapistId);
        const fromTherapist = await Therapist.findById(fromTherapistId).exec();
        if (!fromTherapist) {
            return res.status(404).send('From Therapist not found');
        }

        const toTherapist = await Therapist.findById(toTherapistId);
        if (!toTherapist) {
            return res.status(404).send('To Therapist not found');
        }

        patient.transferHistory.push({
            fromTherapistId: fromTherapistId,
            toTherapistId: toTherapistId,
            dateOfTransfer: new Date()
        });

        patient.therapistId = toTherapistId;
        await patient.save();

        res.status(200).send('Patient transferred successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const terminatePatient = async (req, res) => {
    const { patientId, reason } = req.body;

    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).send('Patient not found');
        }

        patient.status = 'terminated';
        patient.terminationReason = reason;

        await patient.save();

        res.status(200).send('Patient terminated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    allocatePatientToTherapist,
    transferPatient,
    terminatePatient
};
