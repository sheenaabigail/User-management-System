const express = require('express');
const { allocatePatientToTherapist, transferPatient, terminatePatient } = require('../Admin/AllocationPatient');
const { loginAdmin } = require('../Admin/loginAdmin');
const { registerAdmin } = require('../Admin/addAdmin');
const { getStatistics } = require('../Admin/stats');
const Notification = require('../Models/NotificationModel');  // Adjust the path as necessary

// Route to fetch notifications
const router = express.Router();


router.post('/allocatePatient', allocatePatientToTherapist);
router.post('/reallocatePatient', transferPatient);
router.post('/transferPatient', terminatePatient);
router.post('/login',loginAdmin);
router.post('/addAdmin',registerAdmin);
router.get('/stats',getStatistics)


router.get('/notifications', async (req, res) => {
    console.log("Hello guys")
    try {
      const { userId, role } = req.query;  // Extract userId and role from query params
      console.log(userId);
      console.log(role);
      // Build query object based on the filters provided
      let filter = {};
  
      if (userId) {
        filter.userId = userId;  // Filter by userId if provided
      }
  
      if (role) {
        filter.role = role;  // Filter by role if provided
      }
  
      // Fetch notifications with optional filters
      const notifications = await Notification.find(filter).sort({ timestamp: -1 });  // Sort by most recent timestamp
      
      if (notifications.length === 0) {
        return res.status(404).json({ message: 'No notifications found' });
      }
  
      return res.status(200).json({ notifications });
    } catch (err) {
      console.error('Error fetching notifications:', err);
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  });
module.exports = router;
module.exports = router;
