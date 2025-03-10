
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

const AddSupervisor = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		department: "",
		experience: "",
		qualification: "",
		gender: "",
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
		if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Valid email is required.";
		}
		if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
			newErrors.phone = "Valid 10-digit phone number is required.";
		}
		if (!formData.gender) newErrors.gender = "Gender is required.";
		if (formData.experience && (formData.experience < 0 || isNaN(formData.experience))) {
			newErrors.experience = "Experience must be a positive number.";
		}
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
				"http://localhost:5000/api/supervisor/addSupervisor",
				formData
			);
			if (response.status === 201) {
				alert("Supervisor information added successfully!");
				setFormData({
					name: "",
					email: "",
					phone: "",
					department: "",
					experience: "",
					qualification: "",
					gender: "",
				});
			} else {
				alert("Supervisor information could not be added.");
			}
		} catch (error) {
			console.error(error);
			alert("An error occurred while adding supervisor information.");
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
				Add New Supervisor
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
					label="Department"
					name="department"
					value={formData.department}
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
				<TextField
					label="Experience (Years)"
					name="experience"
					type="number"
					value={formData.experience}
					onChange={handleChange}
					fullWidth
					margin="normal"
					error={!!errors.experience}
					helperText={errors.experience}
				/>
				<TextField
					label="Qualification"
					name="qualification"
					value={formData.qualification}
					onChange={handleChange}
					fullWidth
					margin="normal"
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

export default AddSupervisor;

