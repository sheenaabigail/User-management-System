const bcrypt = require('bcrypt');

// Function to encrypt data
const encryptData = async (data) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(data, salt);
    } catch (err) {
        throw new Error('Encryption failed');
    }
};

// Function to compare encrypted data with plain data
const compareData = async (hashedData, plainData) => {
    try {
        return hashedData === plainData;
    } catch (err) {
        throw new Error('Comparison failed');
    }
};

module.exports = { encryptData, compareData };
