const Therapist = require('../Models/TherapistModel'); // Adjust the path to your model

const getAllTherapists = async (req,res) => {
    console.log("Hi");
    try {
        const therapists = await Therapist.find({}); // Fetch all therapists
        res.status(200).send({
            success: true,
            data: therapists,
        });
    } catch (error) {
        console.error('Error fetching therapists:', error);
        return {
            success: false,
            error: 'Failed to fetch therapists',
        };
    }
};

module.exports = { getAllTherapists};
