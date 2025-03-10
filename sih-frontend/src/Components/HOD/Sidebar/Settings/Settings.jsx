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

const Settings = ({ hodId }) => {
	// Therapist profile state
	const [profile, setProfile] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		degree: "",
		specialization: "",
		department: "",
	});
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/hod/hodProfile/${hodId}`
				);
				setProfile(response.data.hod);
				setLoading(false);
			
			} catch (err) {
				setError("Failed to fetch HOD data");
				setLoading(false);
			}
		};

		fetchProfile();
	}, [hodId]);

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
		console.log(hodId)
		try {
			const response = await axios.put(
				`http://localhost:5000/api/hod/hodProfile/${hodId}`,
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


				<div className="flex flex-col gap-1">
					<Label htmlFor="name" className="pr-3">Supervisor</Label>
					<Select
						onValueChange={handleSupervisorChange}
						disabled={supervisorPresent || !isEditing}
						value={selectedSupervisorId || ''}
					>
						<SelectTrigger className="w-full bg-transparent outline-none">
							<SelectValue placeholder="Select Supervisor" />
						</SelectTrigger>
						<SelectContent>
							{supervisors.map((supervisor) => (
								<SelectItem key={supervisor.id} value={supervisor.id}>
									{supervisor.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
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
				{/* Specialization Field */}
				<div className="flex flex-col gap-1">
					<Label htmlFor="specialization">Course</Label>
					<Input
						id="specialization"
						name="specialization"
						value={profile.course}
						onChange={handleChange}
						disabled={!isEditing}
					/>
				</div>
				{/* Department Field */}
				<div className="flex flex-col gap-1">
					<Label htmlFor="department">Department</Label>
					<Select
						onValueChange={(value) =>
							setProfile((prev) => ({ ...prev, department: value }))
						}
						disabled={!isEditing}
					>
						<SelectTrigger>
							<SelectValue placeholder={profile.department} />
						</SelectTrigger>
						<SelectContent>
							{departments.map((dept, index) => (
								<SelectItem key={index} value={dept}>
									{dept}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
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
