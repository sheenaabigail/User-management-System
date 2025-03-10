import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/Components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { FaArrowRight } from "react-icons/fa"; // Import the right arrow icon

const therapistsData = [
  {
    id: 1,
    name: "Dr. Jane Doe",
    photo: "https://via.placeholder.com/80",
    specialization: "Speech Therapist",
    registrationNumber: "ST-12345",
    department: "Speech Therapy",
    patients: [
      { name: "John Doe", photo: "https://via.placeholder.com/50" },
      { name: "Jane Smith", photo: "https://via.placeholder.com/50" },
    ],
  },
  {
    id: 2,
    name: "John Smith",
    photo: "https://via.placeholder.com/80",
    specialization: "Language Specialist",
    registrationNumber: "LS-67890",
    department: "Language Therapy",
    patients: [
      { name: "Sarah Lee", photo: "https://via.placeholder.com/50" },
      { name: "Michael Brown", photo: "https://via.placeholder.com/50" },
    ],
  },
  {
    id: 3,
    name: "Emily Johnson",
    photo: "https://via.placeholder.com/80",
    specialization: "Neurological Speech Therapy",
    registrationNumber: "NST-11223",
    department: "Neurology",
    patients: [
      { name: "Anna White", photo: "https://via.placeholder.com/50" },
      { name: "David Wilson", photo: "https://via.placeholder.com/50" },
    ],
  },
];

function TherapistList() {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = selectedTherapist
    ? selectedTherapist.patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col md:flex-row gap-4 m-5">
      {/* Therapist List Section */}
      <div
        className={`transition-all duration-300 ${
          selectedTherapist ? "w-1/3" : "w-full"
        }`}
      >
        <Breadcrumb className="p-3">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Supervisor</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Therapists</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-4 mb-4">
            <input
              type="text"
              placeholder="Search therapists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        <div className="space-y-4">
          {therapistsData.map((therapist) => (
            <Card
              key={therapist.id}
              onClick={() => setSelectedTherapist(therapist)}
              className="cursor-pointer hover:shadow-lg transition-shadow relative"
            >
              <CardContent className="flex items-center gap-4 p-5">
                <img
                  src={therapist.photo}
                  alt={therapist.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-lg">{therapist.name}</h3>
                  <p className="text-sm text-gray-500">{therapist.specialization}</p>
                  <p className="text-sm text-gray-400">
                    Reg#: {therapist.registrationNumber}
                  </p>
                </div>
                
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Patient Section */}
      {selectedTherapist && (
        <div className="w-full md:w-2/3 p-4 border rounded-lg shadow-lg">
          <button
            onClick={() => setSelectedTherapist(null)}
            className="mb-4 text-blue-600 underline"
          >
            Back to list
          </button>

          

<Card className="relative flex items-center p-3 gap-4 hover:shadow-lg transition-shadow cursor-pointer">
  <img
    src={selectedTherapist.photo}
    alt={selectedTherapist.name}
    className="w-20 h-20 rounded-full"
  />
  <FaArrowRight className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
  <div>
    <h2 className="text-xl font-bold">{selectedTherapist.name}</h2>
    <p className="text-sm text-gray-500">{selectedTherapist.department}</p>
  </div>
</Card>


          {/* Patient Search Bar */}
          <div className="mt-4 mb-4">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <h3 className="mt-6 text-lg font-semibold">Patients</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {filteredPatients.map((patient, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex items-center gap-3 p-4">
                  <img
                    src={patient.photo}
                    alt={patient.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <span>{patient.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TherapistList;
