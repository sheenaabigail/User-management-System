const Session = require('../Models/SessionModel');
const Therapist = require('../Models/TherapistModel');
const Patient = require('../Models/PatientModel');
const Notification = require('../Models/NotificationModel')

const scheduleSession = async (req, res) => {
  const { 
    patientId, 
    adminId,
    startTime, 
    endTime, 
    notes, 
    rating 
  } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const therapist = await Therapist.findById(patient.therapistId);
    if (!therapist) {
      return res.status(404).json({ message: 'Therapist not found' });
    }

    const requestedDay = new Date(startTime).toLocaleString('en-us', { weekday: 'long', timeZone: 'UTC' });
    let isAvailable = false;
    let selectedSlot = null;

    therapist.availableTimes.forEach((timeSlot) => {
      if (timeSlot.day === requestedDay) {
        timeSlot.slots.forEach((slot) => {
          const [slotStartH, slotStartM] = slot.startTime.split(':');
          const [slotEndH, slotEndM] = slot.endTime.split(':');
          const sessionStartTime = new Date(startTime);
          const sessionEndTime = new Date(endTime);

          const slotStart = new Date(Date.UTC(1970, 0, 1, slotStartH, slotStartM));
          const slotEnd = new Date(Date.UTC(1970, 0, 1, slotEndH, slotEndM));
          const sessionStart = new Date(Date.UTC(1970, 0, 1, sessionStartTime.getUTCHours(), sessionStartTime.getUTCMinutes()));
          const sessionEnd = new Date(Date.UTC(1970, 0, 1, sessionEndTime.getUTCHours(), sessionEndTime.getUTCMinutes()));

          if (sessionStart >= slotStart && sessionEnd <= slotEnd && slot.isAvailable) {
            isAvailable = true;
            selectedSlot = slot;
          }
        });
      }
    });

    if (!isAvailable) {
      return res.status(400).json({ message: 'Therapist is not available at the requested time.' });
    }

    const overlappingSessions = await Session.find({
      therapistId: therapist._id,
      $or: [
        { startTime: { $lt: new Date(endTime) }, endTime: { $gt: new Date(startTime) } },
      ],
    });

    if (overlappingSessions.length > 0) {
      return res.status(400).json({ message: 'Therapist is already booked for the selected time.' });
    }

    // Prepare default documents
    const documents = [
      { documentType: 'preTherapyEvaluations', reportStatus: 'pending' },
      { documentType: 'therapyPlans', reportStatus: 'pending' },
      { documentType: 'videoRecords', reportStatus: 'pending' },
      { documentType: 'sessionReports', reportStatus: 'pending' },
    ];

    const newSession = await Session.create({
      patientId,
      therapistId: therapist._id,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      rating,
      sessionNotes: notes || [],
      documents,
    });

    await Patient.updateOne(
      { _id: patientId },
      {
        $inc: { noOfSessions: 1 },
        $push: { sessionLogs: { sessionId: newSession._id } },
      }
    );

    await Therapist.updateOne(
      {
        _id: therapist._id,
        'availableTimes.day': requestedDay,
      },
      {
        $set: {
          'availableTimes.$[dayFilter].slots.$[slotFilter].isAvailable': false,
        },
      },
      {
        arrayFilters: [
          { 'dayFilter.day': requestedDay },
          { 'slotFilter.startTime': selectedSlot.startTime },
        ],
      }
    );
    const newTherapistNotify = await Notification.create({
        userId: therapist._id,
        message: `Your next session with ${patient.name} is scheduled on ${startTime.substring(0, startTime.length - 1).split('T')}`,
        role: 'therapist',
        sessionId: newSession._id,
        timestamp: new Date(),
        read: false,
      });
      const newAdminNotify = await Notification.create({
        userId: adminId,
        message: `A new session with ${patient.name} has been scheduled by ${therapist.name}.`,
        role: 'admin',
        sessionId: newSession._id,
        timestamp: new Date(),
        read: false,
      });
    return res.status(201).json({ message: 'Session successfully scheduled', session: newSession });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

module.exports = {
  scheduleSession,
};
