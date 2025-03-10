import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/Input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/Button";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/Components/ui/select";
import { FaEdit } from "react-icons/fa";

const Settings = ({ therapistId }) => {
	// Therapist profile state
	const [supervisors, setSupervisors] = useState([]);
	const [selectedSupervisorId, setSelectedSupervisorId] = useState(null);
	const [supervisorPresent, setSupervisorPresent] = useState(false);
	const [profile, setProfile] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		year: "",
		specialization: "",
	});
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/therapist/therapistProfile/${therapistId}`
				)
				console.log(response.data.therapist);
				const profile1 = { ...profile };
				profile1.name=response.data.therapist.name;
				profile1.email=response.data.therapist.email;
				profile1.phone=response.data.therapist.phone;
				profile1.password=response.data.therapist.password;
				profile1.year=response.data.therapist.year;
				profile1.specialization=response.data.therapist.specialization[0];
				setProfile(profile1)
				console.log("djsh",profile1);
				console.log(profile)
				setLoading(false);
				
			} catch (err) {
				setError("Failed to fetch therapist data");
				setLoading(false);
			}
		};

		fetchProfile();
	}, [therapistId]);

	const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	const handleSupervisorChange = (e) => {
		setSelectedSupervisorId(e); // Update state with selected ID
		console.log('Selected Supervisor ID:', e);
	};


	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState("");


	const [loading, setLoading] = useState(true);
	const departments = ["Pediatrics", "Neurology", "Geriatrics", "Orthopedics"];

	// Enable editing
	const handleEditClick = () => {
		setIsEditing(true);
	};

	// Save changes
	const handleSave = async () => {
		console.log(therapistId)
		try {
			const response = await axios.put(
				`http://localhost:5000/api/therapist/therapistProfile/${therapistId}`,
				profile
			);
			setProfile(response.data.therapist);
			setIsEditing(false);
			alert("Profile updated successfully!");
		} catch (error) {
			console.error("Error updating profile:", error);
			alert("Failed to update profile. Please try again.");
		}
	};


	// Update field values
	const handleChange = (e) => {
		const { name, value } = e.target;
		setProfile((prevProfile) => ({
			...prevProfile,
			[name]: value,
		}));
	};
	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;
	return (
		<Card className="w-full max-w-lg shadow-lg  m-auto mt-[15%]">
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					Profile Settings
					<FaEdit
						onClick={handleEditClick}
						className="text-blue-600 cursor-pointer text-xl"
					/>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Email Field */}
				<div className="flex flex-col gap-1">
					<Label htmlFor="email">Email : {profile.email}</Label>

				</div>


	


				{/* Name Field */}
				<div className="flex flex-col gap-1">
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						name="name"
						value={profile.name}
						onChange={handleChange}
						disabled={!isEditing}
					/>
				</div>
				{/* Phone Field */}
				<div className="flex flex-col gap-1">
					<Label htmlFor="phone">Phone Number</Label>
					<Input
						id="phone"
						name="phone"
						value={profile.phone}
						onChange={handleChange}
						disabled={!isEditing}
					/>
				</div>
				{/* Password Field */}
				<div className="flex flex-col gap-1">
					<Label htmlFor="password">New Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						value={profile.password}
						onChange={handleChange}
						placeholder="Enter new password"
						disabled={!isEditing}
					/>
				</div>
		
				<div className="flex flex-col gap-1">
					<Label htmlFor="year">Year</Label>
					<Input
						id="year"
						name="year"
						value={profile.year}
						onChange={handleChange}
						disabled={!isEditing}
					/>
				</div>
			</CardContent>
			<CardFooter className="flex justify-end">
				<Button
					onClick={isEditing ? handleSave : handleEditClick}
					className={isEditing ? "bg-green-600" : "bg-blue-600"}
				>
					{isEditing ? "Save Changes" : "Edit Profile"}
				</Button>
			</CardFooter>
		</Card>
	);
};

export default Settings;
