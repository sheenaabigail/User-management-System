import React, { useEffect, useLayoutEffect, useState } from "react";
import { Modal, Box, Button, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";

const TherapistSearchFilter = ({ onTherapistSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [selectedTherapistId, setSelectedTherapistId] = useState([]);

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
    
    console.log(therapists);
    const filteredTherapists = therapists.filter((therapist) => {
      const matchesQuery = String(therapist.casesHandled).includes(searchQuery);
      const matchesAge = ageFilter ? String(therapist.age) === ageFilter : true;
      const matchesGender = genderFilter ? therapist.gender === genderFilter : true;
      const matchesLanguage = languageFilter ? therapist.language === languageFilter : true;
      return matchesQuery && matchesAge && matchesGender && matchesLanguage;
    });

  const handleTherapistSelect = (therapistId) => {
    setSelectedTherapistId(therapistId);
    const therapist = therapists.find((t) => t._id === therapistId);
    onTherapistSelect(therapist);
  };

  return (
    <div>
      <TextField
        label="Search Cases Handled"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="flex gap-3 mb-4">
        <FormControl fullWidth margin="normal">
          <InputLabel>Filter by Year</InputLabel>
          <Select
						label="Filter by Year"
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Filter by Gender</InputLabel>
          <Select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
						label="Filter by Gender"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Filter by Language</InputLabel>
          <Select
						label="Filter by Gender"
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-96  overflow-scroll p-5 gap-4">
        {filteredTherapists.map((therapist) => (
          <div
            key={therapist._id}
            onClick={() => handleTherapistSelect(therapist._id)}
            className={`p-4 border rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${
              selectedTherapistId === therapist._id ? "border-green-700 bg-green-100" : ""
            }`}
          >
            <Typography variant="body1" fontWeight="bold">
								Name: {therapist.name}
            </Typography>
						<Typography variant="body2">Cases Handled: 25</Typography>
            <Typography variant="body2">Gender: {therapist.gender}</Typography>
            <Typography variant="body2">Language: {therapist.languages[0]}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TherapistSearchFilter;
