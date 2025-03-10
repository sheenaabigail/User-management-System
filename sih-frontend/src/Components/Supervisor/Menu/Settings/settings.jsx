import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/Input";
import { Button } from "@/Components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useEffect } from "react";
import axios from "axios";

const Settings = ({supervisorId}) => {
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "",
    phone: "987-654-3210",
    department: "Speech Therapy",
    qualification: "Master's Degree",
    image: "https://via.placeholder.com/150",
  });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);


  const [isEditing, setIsEditing] = useState(false);
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/sessions/supervisorProfile/${supervisorId}`
				);
				setProfile(response.data.supervisor);
				console.log(response.data)
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch supervisor data");
				console.error("Error fetching supervisor data:", err);
				setLoading(false);
			}
		};

		fetchProfile();
	}, [supervisorId]);

  const departments = [
    "Speech Therapy",
    "Occupational Therapy",
    "Physical Therapy",
    "Pediatric Therapy",
  ];

  const qualifications = [
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate",
    "Diploma",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated!");
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Profile Settings
            <FaEdit
              onClick={handleEditClick}
              className="text-blue-600 cursor-pointer text-xl"
            />
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Profile Image */}
          <div className="flex items-center">
            <img
              src={profile.image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mr-4 border border-gray-200 shadow"
            />
            <div>
              <p className="text-lg font-semibold text-gray-800">{profile.name}</p>
              <p className="text-sm text-gray-600">{profile.email}</p>
            </div>
          </div>

					<label className="block text-md font-medium text-gray-700">Email: {profile.email}</label>
          {/* Editable Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              {isEditing ? (
                <Input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              ) : (
                <p className="text-gray-700">{profile.name}</p>
              )}
            </div>

         

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              {isEditing ? (
                <Input
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              ) : (
                <p className="text-gray-700">{profile.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              {isEditing ? (
                <Select
                  onValueChange={(value) =>
                    setProfile((prev) => ({ ...prev, department: value }))
                  }
                  defaultValue={profile.department}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept, index) => (
                      <SelectItem key={index} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-700">{profile.department}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Qualification</label>
              {isEditing ? (
                <Select
                  onValueChange={(value) =>
                    setProfile((prev) => ({ ...prev, qualification: value }))
                  }
                  defaultValue={profile.qualification}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualifications.map((qual, index) => (
                      <SelectItem key={index} value={qual}>
                        {qual}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-700">{profile.qualification}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              {isEditing ? (
                <Input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
              ) : (
                <p className="text-gray-700">**********</p>
              )}
            </div>
          </div>

          {/* Save Changes Button */}
          {isEditing && (
            <Button className="w-full" onClick={handleSave}>
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
