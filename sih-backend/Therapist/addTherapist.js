const Therapist = require('../Models/TherapistModel'); // Adjust path as needed
const { encryptData } = require('../utils/encryptionutil'); // Import encryption utility

// Register a new therapist
const registerTherapist = async (req, res) => {
    const { name, email, phone, languages, specialization, year, availability, gender } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !languages || !specialization || !year || !gender) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if a therapist with the same email exists
        const existingTherapist = await Therapist.findOne({ email });
        if (existingTherapist) {
            return res.status(400).json({ error: 'Therapist with this email already exists' });
        }

        // Encrypt sensitive fields
        const encryptedPhone = await encryptData(phone);
        const encryptedPassword = await encryptData('welcome');
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const defaultAvailableTimes = days.map((day) => ({
        day,
        slots: Array.from({ length: 8 }, (_, i) => ({
            startTime: `${8 + i}:00`,
            endTime: `${9 + i}:00`,
            isAvailable: true,
        })),
        }));
        // Create a new therapist instance
        const newTherapist = new Therapist({
            name,
            email: email,
            phone: encryptedPhone,
            languages,
            specialization,
            year,
            availability,
            gender,
            password: encryptedPassword,
            availableTimes: defaultAvailableTimes,
        });
        
        console.log(newTherapist);
        // Save the therapist to the database
        await newTherapist.save();

        res.status(201).json({ message: 'Therapist registered successfully', therapist: newTherapist });
    } catch (error) {
        console.error('Error registering therapist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { registerTherapist };
