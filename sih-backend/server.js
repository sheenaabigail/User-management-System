const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');  // Import the cors middleware
const fs = require('fs');
const Grid = require('gridfs-stream');
const Therapist = require('./Models/TherapistModel');  // Adjust this path as needed

const app = express();
app.use(express.json());
app.use(cors());  // This will allow all origins by default

// Import Routes
const patientRoutes = require('./Routes/patientRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const therapistRoutes = require('./Routes/therapistRoutes');
const hodRoutes = require('./Routes/hodRoutes');
const supervisorRoutes = require('./Routes/supervisorRoutes');

// Add routes to the app
app.use('/api/supervisor', supervisorRoutes);

app.use('/api/therapist', therapistRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/hod', hodRoutes);
app.use('/api/supervisor', supervisorRoutes);

// File Upload Route
const uploadRoutes = require('./Routes/uploadRoutes');  // New file upload route
app.use('/api', uploadRoutes);  // Register file upload route


// MongoDB connection
mongoose.connect(
    'mongodb+srv://bhuvaneshg:deepakbhuvi@cluster0.e2m47pj.mongodb.net/VoiceLift',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Set up GridFS for MongoDB
const conn = mongoose.createConnection('mongodb+srv://bhuvaneshg:deepakbhuvi@cluster0.e2m47pj.mongodb.net/VoiceLift', { useNewUrlParser: true, useUnifiedTopology: true });
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Default GridFS collection
});

// Server Port
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
