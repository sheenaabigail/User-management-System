import React, { useEffect, useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import TherapistSearchFilter from "./TherapistSearchFilter";
import ScheduleSessions from "./ScheduleSessions";
import axios from "axios";

const Assign = ({ adminId }) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [showScheduleSession, setShowScheduleSession] = useState(false); // Control when to show the session scheduling
  const [patientId, setPatientId] = useState(null);
  const [therapist, setTherapistId] = useState(null);

  useEffect(() => {
    const getAllPatients = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/patient/unassignedPatients`
        );
        setPatients(response.data);
        console.log(response);
        if (response.status === 201) {
          alert("No patients found without therapist");
        }
      } catch (error) {
        console.error("Error in fetching the patient details");
      }
    };
    getAllPatients();
  }, []);

  const openModal = (patient) => {
    setSelectedPatient(patient);
    setPatientId(patient._id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPatient(null);
    setSelectedTherapist(null);
    setShowScheduleSession(false); // Close the session scheduling screen
    setModalOpen(false);
  };

  const setNextAppointment = (appointment) => {
    alert(`Next appointment scheduled: ${appointment}`);
    closeModal();
  };

  const setActive = (tab) => {
    console.log(`Switched to ${tab} tab`);
  };

  const handleAssignClick = () => {
    if (selectedTherapist) {
      const assigning = async () => {
        if (selectedTherapist!=null) {
          try {
            console.log(selectedTherapist);
            const response = await axios.post('http://localhost:5000/api/patient/assignTherapist', {
              patientId: patientId,
              therapistId: selectedTherapist,
              adminId:adminId,
            });
            console.log(response.data); // Handle success response
            setShowScheduleSession(true); // Move this inside success block
          } catch (error) {
            console.error(error); // Handle error
          }
        } else {
          alert("Please select a therapist.");
        }
      };
  
      assigning();
      setShowScheduleSession(true); // Show the session scheduling screen
    } else {
      alert("Please select a therapist first.");
    }
  };

  return (
    <div className="p-5">
      <Typography variant="h4" gutterBottom>
        Assign Therapist
      </Typography>

      {/* Patient List */}
      <ul className="list-none">
        {patients.length > 0 &&
          patients.map((patient) => (
            <li
              key={patient._id}
              className="flex justify-between items-center p-3 mb-3 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              <span className="text-lg font-medium text-gray-800">
                {patient.name}
              </span>
              <Button
                variant="contained"
                color="primary"
                onClick={() => openModal(patient)}
              >
                Assign Therapist
              </Button>
            </li>
          ))}
      </ul>

      {/* Modal */}
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
            maxWidth: 800,
          }}
        >
          {showScheduleSession ? (
            <ScheduleSessions
              setNextAppointment={setNextAppointment}
              setActive={setActive}
              patientId={selectedPatient?._id}
              adminId={adminId}
              therapistId={selectedTherapist}
            />
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                Assign Therapist to {selectedPatient?.name}
              </Typography>

              {/* Therapist Search Filter */}
              <TherapistSearchFilter
                onTherapistSelect={(therapist) =>
                  setSelectedTherapist(therapist._id)
                }
              />

              {/* Selected Therapist */}
              {selectedTherapist && (
                <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
                  Selected Therapist Handling {25} Cases
                </Typography>
              )}

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <Button variant="outlined" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleAssignClick} // Use handleAssignClick to show the session scheduling screen
                >
                  Assign
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Assign;
