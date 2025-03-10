
import React, { useState, useEffect } from "react";
import {
	TextField,
	Button,
	MenuItem,
	Typography,
	Box,
	FormControl,
	InputLabel,
	Select,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	List,
	ListItem,
	ListItemText,
	Card,
	CardContent,
	Divider,
} from "@mui/material";
import axios from "axios";

const TherapistList = () => {
	const [therapists, setTherapists] = useState([]);
	const [patients, setPatients] = useState([]);
	const [selectedTherapist, setSelectedTherapist] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		specialization: "",
		gender: "",
		year: "",
		languages: "",
	});
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		// Fetch list of therapists
		const fetchTherapists = async () => {
			try {
				const response = await axios.get("http://localhost:5000/api/therapist/allTherapist");
				setTherapists(response.data.data);
				setPatients(therapists.assignedPatients);
			} catch (error) {
				console.error("Error fetching therapists", error);
			}
		};
		fetchTherapists();
	}, []);

	const validateForm = () => {
		const newErrors = {};
		if (!formData.name || !/^[a-zA-Z\s]{3,50}$/.test(formData.name.trim())) {
			newErrors.name =
				"Name must be 3–50 characters long and contain only alphabets and spaces.";
		}
		if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Valid email is required.";
		}
		if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
			newErrors.phone = "Valid 10-digit phone number is required.";
		}
		if (!formData.gender) newErrors.gender = "Gender is required.";
		if (!formData.year) newErrors.year = "Year of study is required.";
		if (!formData.languages) newErrors.languages = "At least one language is required.";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: "", // Clear the error for the current field
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		try {
			setIsSubmitting(true);
			const response = await axios.post(
				"http://localhost:5000/api/therapist/addTherapist",
				formData
			);
			if (response.status === 201) {
				alert("Therapist information added successfully!");
				setFormData({
					name: "",
					email: "",
					phone: "",
					specialization: "",
					gender: "",
					year: "",
					languages: "",
				});
				setOpenModal(false); // Close the modal after submission
			} else {
				alert("Therapist information could not be added.");
			}
		} catch (error) {
			console.error(error);
			alert("An error occurred while adding therapist information.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleTherapistClick = (therapistId) => {
		console.log(therapistId);
		// Fetch patients under the selected therapist
		axios
			.post(`http://localhost:5000/api/therapist/getPatient`, { therapistId: therapistId })
			.then((response) => {
				setPatients(response.data);
				const therapist = therapists.find(t => t._id === therapistId);
				setSelectedTherapist(therapist);
			})
			.catch((error) => {
				console.error("Error fetching patients", error);
			});
	};

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	return (
		<Box
			sx={{
				maxWidth: "80%",
				margin: "auto",
				padding: 4,
				boxShadow: 3,
				borderRadius: 2,
				bgcolor: "background.paper",
			}}
		>
			<div className="flex justify-between mb-5">
				<Typography variant="h4" gutterBottom>
					Therapists
				</Typography>

				<Button
					variant="contained"
					color="primary"
					onClick={handleOpenModal}
					sx={{
						marginTop: 2,
						backgroundColor: "#1976d2",
						"&:hover": {
							backgroundColor: "#1565c0",
						},
					}}
				>
					Add Therapist
				</Button>


			</div>
			<div className="flex gap-10">

				<List sx={{ marginBottom: 3 }} className={`text-xl ${!selectedTherapist ? `w-full` : "w-3/5"}`}>
					{therapists.map((therapist) => {
						return (
							<	div							button
								key={therapist._id}
								onClick={() => handleTherapistClick(therapist._id)}
								className={`${therapist._id === selectedTherapist?._id ? "bg-green-500" : "hover:bg-gray-300 bg-gray-100"} p-2 mb-1 border-r-20 text-xl cursor-pointer`}
								>
								<ListItem>
							{therapist.name}
								</ListItem>
							</div>
						);
					})}
				</List>


				{selectedTherapist && (
					<Box sx={{ marginBottom: 3 }} className="w-2/5">
						<Typography variant="h6" gutterBottom>
							Patients
						</Typography>
						<Card sx={{ marginBottom: 2 }}>
							<CardContent>
								<List>
									{patients.map((patient) => (
										<ListItem key={patient._id}>
											<ListItemText primary={patient.name} />
										</ListItem>
									))}
									{patients.length === 0 && <p>
										No patients assigned to this therapist.
									</p>
									}
								</List>
							</CardContent>
						</Card>
					</Box>
				)}
			</div>
			{/* Modal for Add Therapist */}
			<Dialog open={openModal} onClose={handleCloseModal}>
				<DialogTitle>Add New Therapist</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit}>
						<TextField
							label="Name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							fullWidth
							margin="normal"
							required
							error={!!errors.name}
							helperText={errors.name}
						/>
						<TextField
							label="Email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							fullWidth
							margin="normal"
							required
							error={!!errors.email}
							helperText={errors.email}
						/>
						<TextField
							label="Phone"
							name="phone"
							type="tel"
							value={formData.phone}
							onChange={handleChange}
							fullWidth
							margin="normal"
							required
							error={!!errors.phone}
							helperText={errors.phone}
						/>
						<TextField
							label="Specialization"
							name="specialization"
							value={formData.specialization}
							onChange={handleChange}
							fullWidth
							margin="normal"
						/>
						<FormControl fullWidth margin="normal" error={!!errors.gender}>
							<InputLabel>Gender</InputLabel>
							<Select
								name="gender"
								label="Gender"
								value={formData.gender}
								onChange={handleChange}
								required
							>
								<MenuItem value="">Select</MenuItem>
								<MenuItem value="Male">Male</MenuItem>
								<MenuItem value="Female">Female</MenuItem>
								<MenuItem value="Other">Other</MenuItem>
							</Select>
							{errors.gender && <Typography color="error">{errors.gender}</Typography>}
						</FormControl>
						<FormControl fullWidth margin="normal" error={!!errors.year}>
							<InputLabel>Year of Study</InputLabel>
							<Select
								name="year"
								label="Year of Study"
								value={formData.year}
								onChange={handleChange}
								required
							>
								<MenuItem value="">Select</MenuItem>
								<MenuItem value="1">1</MenuItem>
								<MenuItem value="2">2</MenuItem>
								<MenuItem value="3">3</MenuItem>
							</Select>
							{errors.year && <Typography color="error">{errors.year}</Typography>}
						</FormControl>
						<TextField
							label="Languages"
							name="languages"
							value={formData.languages}
							onChange={handleChange}
							fullWidth
							margin="normal"
							multiline
							rows={2}
							error={!!errors.languages}
							helperText={errors.languages}
						/>
						<DialogActions>
							<Button onClick={handleCloseModal}>Cancel</Button>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Saving..." : "Save"}
							</Button>
						</DialogActions>
					</form>
				</DialogContent>
			</Dialog>
		</Box >
	);
};

export default TherapistList;

