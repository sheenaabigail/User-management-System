
import React, { useState } from "react";
import {
	TextField,
	Button,
	MenuItem,
	Typography,
	Box,
	FormControl,
	InputLabel,
	Select,
} from "@mui/material";
import axios from "axios";

const AddPatient = () => {
	const [formData, setFormData] = useState({
		name: "",
		age: "",
		email: "",
		address: "",
		language: "",
		gender: "",
		phone: "",
		problem: "",
		goals: "",
	});

	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const validateForm = () => {
		const newErrors = {};
		if (
			!formData.name ||
			!/^[a-zA-Z\s]{3,50}$/.test(formData.name.trim())
		) {
			newErrors.name =
				"Name must be 3–50 characters long and contain only alphabets and spaces.";
		}
		if (!formData.age || formData.age <= 0) newErrors.age = "Valid age is required.";
		if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Valid email is required.";
		}
		if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
			newErrors.phone = "Valid 10-digit phone number is required.";
		}
		if (!formData.gender) newErrors.gender = "Gender is required.";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0; // Form is valid if no errors
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: "", // Clear error for the field being edited
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		try {
			setIsSubmitting(true);
			const response = await axios.post("http://localhost:5000/api/patient/addPatient", formData);
			if (response.status === 201) {
				alert("Patient information added successfully!");
				setFormData({
					name: "",
					age: "",
					email: "",
					address: "",
					language: "",
					gender: "",
					phone: "",
					problem: "",
					goals: "",
				});
			} else {
				alert("Failed to add patient information.");
			}
		} catch (error) {
			console.error("Error adding patient:", error);
			alert("An error occurred. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Box
			sx={{
				maxWidth: "600px",
				margin: "auto",
				padding: 4,
				boxShadow: 3,
				borderRadius: 2,
				bgcolor: "background.paper",
			}}
		>
			<Typography variant="h4" gutterBottom>
				Add New Patient
			</Typography>
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
					label="Age"
					name="age"
					type="number"
					value={formData.age}
					onChange={handleChange}
					fullWidth
					margin="normal"
					required
					error={!!errors.age}
					helperText={errors.age}
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
					label="Address"
					name="address"
					value={formData.address}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<FormControl fullWidth margin="normal" error={!!errors.language}>
					<InputLabel>language</InputLabel>
					<Select
						name="language"
						label="Language"
						value={formData.language}
						onChange={handleChange}
						required
					>
						<MenuItem value="">Select</MenuItem>
						<MenuItem value="English">English</MenuItem>
						<MenuItem value="Hindi">Hindi</MenuItem>
						<MenuItem value="Tamil">Tamil</MenuItem>
						<MenuItem value="Telugu">Telugu</MenuItem>
						<MenuItem value="Gujarati">Gujarati</MenuItem>
						<MenuItem value="Punjabi">Punjabi</MenuItem>

					</Select>
					{errors.gender && <Typography color="error">{errors.gender}</Typography>}
				</FormControl>
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
					label="Problem"
					name="problem"
					value={formData.problem}
					onChange={handleChange}
					fullWidth
					margin="normal"
					multiline
					rows={3}
				/>
				<TextField
					label="Goals"
					name="goals"
					value={formData.goals}
					onChange={handleChange}
					fullWidth
					margin="normal"
					multiline
					rows={3}
				/>
				<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
					<Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Saving..." : "Save"}
					</Button>
				</Box>
			</form>
		</Box>
	);
};

export default AddPatient;

