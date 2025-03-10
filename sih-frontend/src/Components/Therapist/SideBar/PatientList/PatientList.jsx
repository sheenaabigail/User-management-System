import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/Button";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/Components/ui/card";
import PatientDetails from "./PatientDetail";
const PatientList = ({therapistId}) => {
	const [patients, setPatients] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [comp, toggleComp] = useState(true);
	const [patientId, setPatientId] = useState(null);
	useEffect(() => {
		const fetchPatients = async () => {
			setLoading(true);
			setError(null);
			try {
				// Simulate API call
				const therapist="675180fc6bb795d0b0eeff1e";
				console.log(therapist);
				const response = await axios.post("http://localhost:5001/api/therapist/getPatient",{therapistId:therapist});
				const patients = response.data;
				setPatients(patients);
				console.log(patients);
			} catch (err) {
				setError("Unable to fetch patient data.");
			} finally {
				setLoading(false);
			}
		};

		fetchPatients();
	}, []);

	return (
		<div>{comp ?
			(<Card className="shadow-md p-4 m-7">
				<CardHeader className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
					Your Patients
				</CardHeader>
				{error && <p className="text-red-500 mb-4">{error}</p>}
				{loading ? (
					<p className="text-gray-500">Loading...</p>
				) : (
					<ul className="space-y-4">
						{patients.map((patient) => (
							<CardContent
								key={patient.id}
								className="cursor-pointer p-4 border rounded-md hover:shadow-lg transition-shadow"
								onClick={() => toggleComp(!comp)}
							>
								<div className="flex justify-between items-center">
									<div>
										<p className="font-semibold text-gray-800">{patient.name}</p>
										<p className="text-sm text-gray-600">
											Age: {patient.age}, Gender: {patient.gender}
										</p>
									</div>
									<p className="text-sm text-gray-500">{patient.assignedDate}</p>
								</div>
							</CardContent>
						))}
					</ul>
				)}
				{!loading && patients.length === 0 && (
					<p className="text-gray-500 text-center mt-4">No patients assigned.</p>
				)}
			</Card>) :
			<PatientDetails patientId={patientId} toggleComp={toggleComp}/>}
		</div>
	);
}


export default PatientList;
