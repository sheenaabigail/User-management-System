const express = require('express');
const multer = require('multer');
const { GridFSBucket, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Therapist = require('../Models/TherapistModel'); // Adjust this path as needed
const Supervisor = require('../Models/SupervisorModel');
const Patient = require('../Models/PatientModel');
const Session = require('../Models/SessionModel')

const router = express.Router();

const mongoURI = 'mongodb+srv://bhuvaneshg:deepakbhuvi@cluster0.e2m47pj.mongodb.net/';
const databaseName = 'VoiceLift';

// MongoDB connection
const client = new mongoose.mongo.MongoClient(mongoURI);

let db;
let bucket;

client.connect()
    .then(() => {
        db = client.db(databaseName);
        bucket = new GridFSBucket(db);
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Multer setup for file upload
const storage = multer.memoryStorage(); // Store files in memory before streaming
const upload = multer({ storage });

// File upload handler with therapistId metadata
router.post('/upload', upload.single('file'), async (req, res) => {
    const { therapistId, supervisorId, patientId, documentType, sessionId } = req.body;

    // Validate that required fields are present
    if (!therapistId || !supervisorId || !patientId || !documentType || !sessionId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        // Validate Therapist ID format
        if (!ObjectId.isValid(therapistId) || !ObjectId.isValid(supervisorId) || !ObjectId.isValid(patientId) || !ObjectId.isValid(sessionId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        // Check if the therapist exists
        const therapistExists = await Therapist.findById(therapistId);
        if (!therapistExists) {
            return res.status(404).json({ error: 'Therapist not found' });
        }
        // Check if the patient exists
        const patientExists = await Patient.findById(patientId);
        if (!patientExists) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Check if the session exists
        const sessionExists = await Session.findById(sessionId);
        if (!sessionExists) {
            return res.status(404).json({ error: 'Session not found' });
        }

        // Find the session log for the given document type
        const sessionLog = patientExists.sessionLogs.find(log => log.sessionId.toString() === sessionId && log.documents.some(doc => doc.documentType === documentType));

        if (sessionLog) {
            // If the document already exists and the status is 'completed', return a message
            const document = sessionLog.documents.find(doc => doc.documentType === documentType);
            if (document.reportStatus === 'completed') {
                return res.status(201).json({ error: `${documentType} document has already been uploaded and marked as completed` });
            }
        }

        // Create metadata with additional fields
        const metadata = {
            therapistId,
            supervisorId,
            patientId,
            status: 'pending',
            documentType,
            sessionId,
        };

        // Upload file with metadata
        const uploadStream = bucket.openUploadStream(req.file.originalname, {
            metadata: metadata,
            contentType: req.file.mimetype,
        });

        uploadStream.end(req.file.buffer);

        uploadStream.on('finish', async () => {
            // Update the session log's document status to 'completed' after successful upload
            await Patient.updateOne(
                { _id: patientId, 'sessionLogs.sessionId': sessionId },
                {
                    $set: {
                        'sessionLogs.$.documents.$[elem].reportStatus': 'completed',
                        'sessionLogs.$.documents.$[elem].fileId': uploadStream.id,
                    }
                },
                {
                    arrayFilters: [{ 'elem.documentType': documentType }],
                    new: true
                }
            );

            res.status(201).json({
                message: 'File uploaded successfully',
                fileId: uploadStream.id,
                metadata: metadata,
            });
        });

        uploadStream.on('error', (err) => {
            console.error('Upload error:', err);
            res.status(500).json({ error: 'Failed to upload file' });
        });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// File retrieval handler based on file type
router.get('/file/:id', async (req, res) => {
    const { id } = req.params;

    try {
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid file ID format' });
        }

        const file = await db.collection('fs.files').findOne({ _id: new ObjectId(id) });
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        const downloadStream = bucket.openDownloadStream(new ObjectId(id));

        if (file.contentType.includes('video')) {
            res.setHeader('Content-Type', file.contentType);
            res.setHeader('Content-Disposition', `inline; filename="${file.filename}"`);
            downloadStream.pipe(res);
        } else if (file.contentType.includes('pdf')) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline');
            downloadStream.pipe(res);
        } else {
            res.status(400).json({ error: 'Unsupported file type' });
        }

        downloadStream.on('error', (err) => {
            console.error('Stream error:', err);
            res.status(500).json({ error: 'Error streaming file' });
        });

    } catch (err) {
        console.error('Error retrieving file:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
