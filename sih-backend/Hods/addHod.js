const Hod = require('../Models/HodModel'); // Adjust path as needed
const { encryptData } = require('../utils/encryptionutil'); // Import encryption utility

// Register a new therapist
const registerHod = async (req, res) => {
    const { name, email, phone, languages, year, gender } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !languages || !year || !gender) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if a therapist with the same email exists
        const existingHod = await Hod.findOne({ email });
        if (existingHod) {
            return res.status(400).json({ error: 'Hod with this email already exists' });
        }

        // Encrypt sensitive fields
        const encryptedPhone = await encryptData(phone);
        const encryptedPassword = await encryptData('welcome');

        // Create a new Hod instance
        const newHod = new Hod({
            name,
            email: email,
            phone: encryptedPhone,
            languages,
            year,
            gender,
            password: encryptedPassword
        });

        // Save the Hod to the database
        await newHod.save();

        res.status(201).json({ message: 'Hod registered successfully', Hod: newHod });
    } catch (error) {
        console.error('Error registering Hod:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { registerHod };
