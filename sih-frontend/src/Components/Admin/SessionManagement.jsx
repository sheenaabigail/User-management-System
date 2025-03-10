import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import TherapistSearchFilter from "./TherapistSearchFilter";
import ScheduleSessions from "./ScheduleSessions";
import axios from "axios";

const ReassignAssign = () => {
  // State for managing views, patients, and therapists
  const [viewMode, setViewMode] = useState("patient");
  const [patients, setPatients] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showScheduleSession, setShowScheduleSession] = useState(false);
  const [patientId, setPatientId] = useState(null);

  // Dummy data for therapists and patients
  useEffect(() => {
    const mockPatients = [
      { _id: 1, name: "John Doe", therapistId: 1 },
      { _id: 2, name: "Jane Smith", therapistId: 2 },
    ];
    const mockTherapists = [
      { _id: 1, name: "Dr. Mike" },
      { _id: 2, name: "Dr. Anna" },
    ];

    setPatients(mockPatients);
    setTherapists(mockTherapists);
  }, []);

  // Open modal when assigning or reassigning
  const openModal = (patient) => {
    setSelectedPatient(patient);
    setPatientId(patient._id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPatient(null);
    setSelectedTherapist(null);
    setShowScheduleSession(false);
    setModalOpen(false);
  };

  const handleAssignTherapist = async () => {
    if (selectedTherapist != null) {
      try {
        console.log(selectedTherapist);
        // Simulate API call for assignment
        alert(`Assigned ${selectedTherapist.name} to ${selectedPatient.name}`);
        setShowScheduleSession(true);
      } catch (error) {
        console.error(error);
        alert("Failed to assign therapist.");
      }
    } else {
      alert("Please select a therapist.");
    }
  };

  const handleReassign = async () => {
    if (selectedTherapist != null) {
      try {
        console.log(selectedTherapist);
        // Simulate API call for reassignment
        alert(`Reassigned ${selectedPatient.name} to ${selectedTherapist.name}`);
      } catch (error) {
        console.error(error);
        alert("Failed to reassign therapist.");
      }
    } else {
      alert("Please select a therapist.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Assign/Reassign Therapist
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Button
          variant={viewMode === "patient" ? "contained" : "outlined"}
          onClick={() => setViewMode("patient")}
        >
          Patients
        </Button>
        <Button
          variant={viewMode === "therapist" ? "contained" : "outlined"}
          onClick={() => setViewMode("therapist")}
        >
          Therapists
        </Button>
      </Box>

      {/* Patients View */}
      {viewMode === "patient" && (
        <List>
          {patients.map((patient) => (
            <div key={patient._id}>
              <ListItem>
                <ListItemText
                  primary={patient.name}
                  secondary={`Assigned to: Therapist ${patient.therapistId}`}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => openModal(patient)}
                >
                  Reassign
                </Button>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}

      {/* Therapists View */}
      {viewMode === "therapist" && (
        <Box sx={{ display: "flex", gap: 2 }}>
          <List sx={{ flex: 1, maxWidth: 300 }}>
            {therapists.map((therapist) => (
              <div key={therapist._id}>
                <ListItem
                  button
                  onClick={() => setSelectedPatient(therapist)}
                  sx={{
                    backgroundColor:
                      selectedPatient?._id === therapist._id
                        ? "lightblue"
                        : "transparent",
                  }}
                >
                  <ListItemText primary={therapist.name} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Box>
      )}

      {/* Modal for Assigning/Reassigning Therapist */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: "90%",
            maxWidth: 600,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {viewMode === "patient"
              ? `Reassign ${selectedPatient?.name}`
              : `Assign Therapist`}
          </Typography>

          {/* Therapist Search Filter */}
          <TherapistSearchFilter
            onTherapistSelect={(therapist) => setSelectedTherapist(therapist)}
          />

          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={viewMode === "patient" ? handleReassign : handleAssignTherapist}
            >
              {viewMode === "patient" ? "Reassign" : "Assign"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ReassignAssign;
