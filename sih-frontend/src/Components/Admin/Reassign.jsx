
import React, { useState,useEffect } from "react";
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
import axios from "axios";

const Reassign = () => {
	const [viewMode, setViewMode] = useState("patient"); // "patient" or "therapist"
	const [selectedEntity, setSelectedEntity] = useState(null);
	const [isModalOpen, setModalOpen] = useState(false);
	const [patients,setPatients] = useState([]);
	const [selectedTherapist,setSelectedTherapist] = useState(null);
	const [patientId,setPatientId] = useState(null);
	const [therapists,setTherapists] = useState([]);
	useEffect(()=>{
	  const fetchAllTherapists = async () => {
		try {
		  const response = await axios.get("http://localhost:5000/api/therapist/allTherapist");
		  console.log(response.data);
		  setTherapists(response.data.data);
		} catch (error) {
		  console.error("Error fetching therapists:", error);
		}
	  };
	  fetchAllTherapists();
	},[])
	useEffect(()=>{
		const getAllPatients = async()=>{
		try{
			const response = await axios.get(`http://localhost:5000/api/patient/allPatients`);
			setPatients(response.data);
			console.log(response);
		}catch(error){
			console.error("Error in fetching the patient details");
		}
		}
		getAllPatients();
	},[])
	console.log("hello", selectedEntity);
	const openModal = (entity) => {
		setSelectedEntity(entity);
		setModalOpen(true);
	};
	const summa = (patient)=>{
		setPatientId(patient._id);
		setModalOpen(patient);
	}
	const closeModal = () => {
		setSelectedEntity(null);
		setModalOpen(false);
	};
	console.log(patientId);
	console.log(selectedTherapist)
	const reassignEntity = async () => {
		if (selectedTherapist != null) {
		  try {
			console.log(selectedTherapist);
	  
			// API call to reassign therapist
			const response = await axios.post(
			  'http://localhost:5000/api/admin/reallocatePatient',
			  {
				patientId: patientId,
				toTherapistId: selectedTherapist,
			  }
			);
	  
			if (response.status === 200) {
			  console.log(response); // Log the success response
			  alert("Reassignment completed successfully!");
			  window.location.reload(); 
			}
		  } catch (error) {
			console.error("Error during reassignment:", error);
			alert("Failed to reassign. Please try again later."); // Show error message to user
		  }
		} else {
		  alert("Please select a therapist."); // Validation for empty selection
		}
	  
		closeModal(); // Close the modal regardless of success or failure
	  };
	  

	return (
		<Box sx={{ p: 4 }}>
			<Typography variant="h4" gutterBottom>
				Reassign
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

			{viewMode === "patient" && (
				<List>
					{patients.map((patient) => (
						<div key={patient.id}>
							<ListItem>
								<ListItemText
									primary={patient.name}
									secondary={`Assigned to: ${patient.therapistId}`}
								/>
								<Button
									variant="contained"
									color="primary"
									onClick={() => summa(patient)}
								>
									Reassign
								</Button>
							</ListItem>
							<Divider />
						</div>
					))}
				</List>
			)}

			{viewMode === "therapist" && (
				<Box sx={{ display: "flex", gap: 2 }}>
					<List sx={{ flex: 1, maxWidth: 300 }}>
						{therapists.map((therapist) => (
							<div key={therapist.id}>
								<ListItem
									button
									onClick={() => setSelectedEntity(therapist)}
									sx={{
										marginBottom: 1,
										borderRadius: 2,

										backgroundColor:
											selectedEntity?.id === therapist.id
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

					{selectedEntity && selectedEntity.assignedPatients && (
						<Box sx={{ flex: 2, p: 2, boxShadow: 2, borderRadius: 2 }}>
							<Typography variant="h6" gutterBottom>
								{selectedEntity.name}
							</Typography>
							<Typography variant="body1" gutterBottom>
								Patients:
							</Typography>
							<List>
								{selectedEntity.assignedPatients.map((patient, index) => (
									<ListItem key={index}>
										<ListItemText primary={patient} />
										<Button
											variant="contained"
											color="primary"
											onClick={() => openModal(patient)}
										>
											Reassign
										</Button>
									</ListItem>
								))}
							</List>
						</Box>
					)}
					</Box>
			)}


					{/* Modal for Reassignment */}
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
								Reassign {viewMode === "patient" ? selectedEntity?.name : "Patient"}
							</Typography>
							<TherapistSearchFilter onTherapistSelect={(therapist) => setSelectedTherapist(therapist._id)} />
							<Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
								<Button variant="outlined" onClick={closeModal}>
									Cancel
								</Button>
								<Button
									variant="contained"
									color="success"
									onClick={reassignEntity}
								>
									Reassign
								</Button>
							</Box>
						</Box>
					</Modal>
				</Box>
			);
};

			export default Reassign;

