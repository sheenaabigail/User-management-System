const Patient = require('../Models/PatientModel');
const Therapist = require('../Models/TherapistModel');
const Supervisor = require('../Models/SupervisorModel');
const Session = require('../Models/SessionModel');

const getStatistics = async (req, res) => {
    try {
        // Define the start and end of the current day
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0); // Midnight
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999); // End of the day

        // Use Promise.all to fetch counts concurrently
        const [
            patientsCount,
            therapistsCount,
            supervisorsCount,
            sessionsCount,
            patientsCreatedTodayCount,
            reassignedPatientsCount,
        ] = await Promise.all([
            Patient.countDocuments(),
            Therapist.countDocuments(),
            Supervisor.countDocuments(),
            Session.countDocuments(),
            Patient.countDocuments({
                createdAt: { $gte: startOfDay, $lte: endOfDay },
            }),
            Patient.countDocuments({
                "transferHistory.0": { $exists: true }, // Check if transferHistory is not empty
            }),
        ]);

        // Respond with the statistics
        res.status(200).json({
            message: 'Statistics retrieved successfully',
            data: {
                patients: patientsCount,
                therapists: therapistsCount,
                supervisors: supervisorsCount,
                sessions: sessionsCount,
                patientsCreatedToday: patientsCreatedTodayCount,
                reassignedPatients: reassignedPatientsCount, // The count of reassigned patients
            },
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({
            message: 'Error retrieving statistics',
            error: `${error}`,
        });
    }
};

module.exports = { getStatistics };
