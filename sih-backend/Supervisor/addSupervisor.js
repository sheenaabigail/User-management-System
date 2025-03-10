const Supervisor = require('../Models/SupervisorModel'); // Adjust path as needed
const { encryptData } = require('../utils/encryptionutil'); // Import encryption utility
// const 
// Register a new supervisor
const registerSupervisor = async (req, res) => {
    const { name, email, phone, department, experience, qualification, gender } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !department || !experience || !qualification || !gender) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if a supervisor with the same email exists
        const existingSupervisor = await Supervisor.findOne({ email });
        if (existingSupervisor) {
            return res.status(400).json({ error: 'Supervisor with this email already exists' });
        }

        // Encrypt sensitive fields
        const encryptedEmail = await encryptData(email);
        const encryptedPhone = await encryptData(phone);
        const encryptedPassword = await encryptData('welcome');

        // Create a new supervisor instance
        const newSupervisor = new Supervisor({
            name,
            email: email,
            phone: encryptedPhone,
            department,
            experience,
            qualification,
            gender,
            password: encryptedPassword,
        });

        // Save the supervisor to the database
        await newSupervisor.save();

        res.status(201).json({ message: 'Supervisor registered successfully', supervisor: newSupervisor });
    } catch (error) {
        console.error('Error registering supervisor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { registerSupervisor };
