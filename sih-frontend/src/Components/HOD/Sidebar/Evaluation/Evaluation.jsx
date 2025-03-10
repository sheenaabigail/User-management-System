import React, { useState } from "react";

const PerformanceEvaluation = () => {
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  // Mock data for therapists, patients, and their assignments
  const therapists = [
    {
      name: "John Doe",
      supervisor: "Dr. Smith",
      patientsHandled: 15,
      sessionCompletionRate: 90,
      rating: 4.5,
      patientImprovement: 80,
      approvalRating: 95,
      assignedPatients: ["Patient A", "Patient E", "Patient G"],
      sessionStatus: {
        "Patient A": "Completed",
        "Patient E": "Not Completed",
        "Patient G": "Completed",
      },
    },
    {
      name: "Jane Smith",
      supervisor: "Dr. Brown",
      patientsHandled: 18,
      sessionCompletionRate: 85,
      rating: 4.2,
      patientImprovement: 85,
      approvalRating: 92,
      assignedPatients: ["Patient B", "Patient F"],
      sessionStatus: {
        "Patient B": "Completed",
        "Patient F": "Not Completed",
      },
    },
    {
      name: "Mark Taylor",
      supervisor: "Dr. Clark",
      patientsHandled: 12,
      sessionCompletionRate: 92,
      rating: 4.7,
      patientImprovement: 88,
      approvalRating: 96,
      assignedPatients: ["Patient C", "Patient D", "Patient G"],
      sessionStatus: {
        "Patient C": "Completed",
        "Patient D": "Not Completed",
        "Patient G": "Completed",
      },
    },
    {
      name: "Emily Johnson",
      supervisor: "Dr. Wilson",
      patientsHandled: 20,
      sessionCompletionRate: 93,
      rating: 4.8,
      patientImprovement: 90,
      approvalRating: 98,
      assignedPatients: ["Patient D", "Patient G", "Patient E"],
      sessionStatus: {
        "Patient D": "Not Completed",
        "Patient G": "Completed",
        "Patient E": "Completed",
      },
    },
    {
      name: "Chris Lee",
      supervisor: "Dr. Taylor",
      patientsHandled: 14,
      sessionCompletionRate: 87,
      rating: 4.3,
      patientImprovement: 82,
      approvalRating: 91,
      assignedPatients: ["Patient A", "Patient C", "Patient F"],
      sessionStatus: {
        "Patient A": "Not Completed",
        "Patient C": "Completed",
        "Patient F": "Not Completed",
      },
    },
  ];

  // Handle therapist selection
  const handleTherapistSelection = (therapist) => {
    setSelectedTherapist(therapist);
  };

  // Color map for session status
  const completedColor = "bg-green-200"; // Completed status color
  const notCompletedColor = "bg-red-200"; // Not completed status color
  const notAssignedColor = "bg-gray-200"; // Not assigned color

  // Patients array for the rows
  const patients = [
    "Patient A",
    "Patient B",
    "Patient C",
    "Patient D",
    "Patient E",
    "Patient F",
    "Patient G",
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-extrabold text-indigo-600 mb-6">
        Performance Evaluation
      </h2>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Therapist and Patient Completion Status
        </h3>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto text-gray-700">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="px-6 py-3 text-left font-semibold">Therapist Name</th>
                {patients.map((patient) => (
                  <th key={patient} className="px-6 py-3 text-left font-semibold">
                    {patient}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {therapists.map((therapist) => (
                <tr
                  key={therapist.name}
                  className={`cursor-pointer hover:bg-indigo-100 transition duration-200 border-b ${
                    selectedTherapist &&
                    selectedTherapist.name === therapist.name
                      ? "bg-indigo-100"
                      : ""
                  }`}
                  onClick={() => handleTherapistSelection(therapist)}
                >
                  <td className="px-6 py-3 font-semibold">{therapist.name}</td>
                  {patients.map((patient) => (
                    <td
                      key={patient}
                      className={`px-6 py-3 text-center ${
                        therapist.assignedPatients.includes(patient)
                          ? therapist.sessionStatus[patient] === "Completed"
                            ? completedColor
                            : notCompletedColor
                          : ""
                      }`}
                    >
                      {therapist.assignedPatients.includes(patient)
                        ? therapist.sessionStatus[patient] // Show "Completed" or "Not Completed"
                        : ""} 
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Tooltip/Legend */}
        <div className="mt-4 text-sm text-gray-600">
          <span className="inline-block mr-4">
            <span className="inline-block w-3 h-3 bg-green-200 rounded-full mr-2"></span>
            Completed
          </span>
          <span className="inline-block mr-4">
            <span className="inline-block w-3 h-3 bg-red-200 rounded-full mr-2"></span>
            Not Completed
          </span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceEvaluation;
