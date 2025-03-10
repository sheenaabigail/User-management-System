const Admin = require('../Models/AdminModel'); // Adjust path as needed
const { encryptData } = require('../utils/encryptionutil'); // Import encryption utility

// Register a new therapist
const registerAdmin = async (req, res) => {
    const { name, email, phone, languages, year, gender } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !languages || !year || !gender) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if a therapist with the same email exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin with this email already exists' });
        }

        // Encrypt sensitive fields
        const encryptedPhone = await encryptData(phone);
        const encryptedPassword = await encryptData('welcome');

        // Create a new Admin instance
        const newAdmin = new Admin({
            name,
            email: email,
            phone: encryptedPhone,
            languages,
            year,
            gender,
            password: encryptedPassword
        });

        // Save the Admin to the database
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully', Admin: newAdmin });
    } catch (error) {
        console.error('Error registering Admin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { registerAdmin };
