import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Progress } from "@/Components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/Button";
import { Textarea } from "@/Components/ui/textarea";
import { IoLogOutOutline } from "react-icons/io5";
import { FaFileUpload, FaDownload } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/Input";

function TherapyPlans({ therapistId }) {
  const [sessionNumber, setSessionNumber] = useState("1");
  const [modalOpen, setModalOpen] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [patientList, setPatientList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [isDialogOpen,setIsDialogOpen] = useState(false);  
  const [sessionId, setSessionId] = useState('');
  const [supervisorId, setSupervisorId] = useState(null);
  const [therapist, setTherapist] = useState(null);
  const [supervisor, setSupervisor] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/sessions/therapist/${therapistId}`
        );
        setTherapist(response.data.therapist);
      } catch (err) {
        console.log("Error in fetching the therapist details ", err);
      }
    };
    fetchProfile();
  }, [therapistId]);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/sessions/patientProfile/${selectedPatient}`);
        setSessionId(response.data.patient.sessionLogs[response.data.patient.sessionLogs.length-1].sessionId);
      } catch (err) {
        console.error("Error",err);
      } 
    };

    fetchPatientData();
  }, [selectedPatient]);

  useEffect(() => {
    if (
      therapist &&
      therapist.supervisorIds &&
      therapist.supervisorIds.length > 0
    ) {
      setSupervisorId(therapist.supervisorIds[0]);
    }
  }, [therapist]);

  useEffect(() => {
    if (supervisorId) {
      const fetchSupervisorProfile = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5001/api/sessions/supervisorProfile/${supervisorId}`
          );
          setSupervisor(response.data.supervisor);
        } catch (err) {
          console.error("Error fetching supervisor data:", err);
        }
      };

      fetchSupervisorProfile();
    }
  }, [supervisorId]);  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/sessions/patientName?therapistId=${therapistId}`
        );
        const patientData = response.data.patientData.map((patient) => ({
          name: patient.name,
          id: patient.id,
        }));
        setPatientList(patientData);
      } catch (error) {
        console.error("Error fetching patients");
      }
    };
    fetchPatients();
  }, []);
  const handleUpload = async () => {
    console.log("Patient ID",selectedPatient)
    console.log("Document Type",documentType)
    console.log("Therapist ID",therapistId)
    console.log("Supervisor ID",supervisorId)
    console.log("File",file)
    console.log("SessionID",sessionId)

    if (!file || !documentType || !therapistId || !supervisorId || !selectedPatient || !sessionId) {
      alert('Please select the patient');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    formData.append('therapistId', therapistId);
    formData.append('supervisorId', supervisorId);
    formData.append('patientId', selectedPatient);
    formData.append('sessionId', sessionId);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
    setIsDialogOpen(false);
      if(response.status==201){
        alert("You already uploaded for the specific document");
      }
    } catch (err) {
      
    setIsDialogOpen(false);
      console.error('Upload failed:', err.status);
    }
    
  };
  const sessionNotes = {
    1: "Patient demonstrated improved clarity in articulation exercises.",
    2: "Focused on conversational fluency. Slight improvement noted.",
    3: "Practiced stuttering management techniques. Encouraging progress.",
  };

  const handleAddTask = async () => {
    if (!selectedPatient || !taskInput.trim()) {
      alert("Please select a patient and enter a task.");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/sessions/assignTask", {
        patientId: selectedPatient,
        task: taskInput,
      });

      setTasks((prevTasks) => [...prevTasks, taskInput]);
      setTaskInput("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const handleAssignTasks = () => {
    setTasks([]);
    setModalOpen(false);
  };
  return (
    <>
      <Card className="size-full h-auto">
        <CardHeader>
          <CardTitle className="flex justify-between">
            Therapy Plan
            <Select onValueChange={(value) => setSelectedPatient(value)}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Patient Name" />
              </SelectTrigger>
              <SelectContent>
                {patientList.length > 0 ? (
                  patientList.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name} {/* Display the patient's name */}
                    </SelectItem>
                  ))
                ) : (
                  <p className="text-gray-500">No patient found</p>
                )}
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-6 gap-4 place-items-stretch">
            {/* First Row */}
            <div className="col-span-2">
              <Card className="size-full">
                <CardHeader>
                  <CardTitle>Short-term goal</CardTitle>
                  <CardDescription>
                    Achieve clear articulation of frequently used words in daily
                    communication.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={50} />
                </CardContent>
              </Card>
            </div>
            <div className="col-span-2">
              <Card className="size-full">
                <CardHeader>
                  <CardTitle>Mid-term goal</CardTitle>
                  <CardDescription>
                    Enhance conversational fluency and reduce stuttering by
                    practicing structured speech exercises.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={33} />
                </CardContent>
              </Card>
            </div>
            <div className="col-span-2">
              <Card className="size-full">
                <CardHeader>
                  <CardTitle>Long-term goal</CardTitle>
                  <CardDescription>
                    Maintain consistent fluency in speech across various
                    contexts, including public speaking.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={10} />
                </CardContent>
              </Card>
            </div>
            {/* Second Row */}
            <div className="col-span-3">
              <Card className="size-full">
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    Session notes
                    <Select onValueChange={(value) => setSessionNumber(value)}>
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Session No." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Session 1</SelectItem>
                        <SelectItem value="2">Session 2</SelectItem>
                        <SelectItem value="3">Session 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="h-40 overflow-auto text-wrap"
                    placeholder="Type your notes here..."
                    value={sessionNotes[sessionNumber]}
                    readOnly={!isEditing} // Dynamically toggle readOnly based on isEditing
                    onChange={(e) => {
                      if (isEditing) {
                        // Update the notes dynamically when editing
                        const updatedNotes = { ...sessionNotes };
                        updatedNotes[sessionNumber] = e.target.value;
                        setSessionNotes(updatedNotes);
                      }
                    }}
                  />
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    className="bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => {
                      // Save changes and disable editing
                      setIsEditing(false);
                      console.log("Session notes saved:", sessionNotes);
                    }}
                    disabled={!isEditing} // Disable Save button if not editing
                  >
                    Save Changes
                  </Button>
                  <Button
                    className="bg-green-500 text-white hover:bg-green-600"
                    onClick={() => {
                      // Enable editing mode
                      setIsEditing(true);
                    }}
                  >
                    Edit Note
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="col-span-3">
              <Card className="size-full">
                <CardHeader>
                  <CardTitle>Quick Access</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 grid-rows-2 gap-4">
                  <Card
                    className="flex flex-col items-center justify-center cursor-pointer hover:shadow-lg"
                    onClick={() => navigate("/sessions")}
                  >
                    <CardHeader>
                      <IoLogOutOutline size={35} />
                    </CardHeader>
                    <CardFooter className="text-center">
                      Open Sessions
                    </CardFooter>
                  </Card>
                  <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogTrigger asChild>
                      <Card className="flex flex-col items-center justify-center cursor-pointer hover:shadow-lg">
                        <CardHeader>
                          <MdAssignmentAdd size={35} />
                        </CardHeader>
                        <CardFooter className="text-center">
                          Assign Exercises
                        </CardFooter>
                      </Card>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Assign Exercises</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Enter tasks or exercises..."
                          value={taskInput}
                          onChange={(e) => setTaskInput(e.target.value)}
                        />
                        <Button
                          className="w-full bg-green-500 hover:bg-green-600 text-white"
                          onClick={handleAddTask}
                        >
                          Add Task
                        </Button>
                        <ul className="space-y-1 list-disc list-inside">
                          {tasks.length > 0 ? (
                            tasks.map((task, index) => (
                              <li key={index} className="text-gray-700">
                                {task}
                              </li>
                            ))
                          ) : (
                            <p className="text-gray-500">No tasks added yet.</p>
                          )}
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Card
                        onClick={() => setIsDialogOpen(true)}
                        className="flex flex-col items-center justify-center cursor-pointer hover:shadow-lg p-4"
                      >
                        <CardHeader>
                          <FaFileUpload size={35} className="text-gray-600" />
                        </CardHeader>
                        <CardFooter className="text-center font-medium text-gray-800">
                          Upload Documents
                        </CardFooter>
                      </Card>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-800">
                          Upload Documents
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 mt-4">
                        {/* Dropdown for selecting document category */}
                        <div>
                          <label
                            htmlFor="document-type"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Select Document Type
                          </label>
                          <select
                            id="document-type"
                            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                            value={documentType}
                            onChange={(e) => setDocumentType(e.target.value)}
                          >
                            <option value="">Select a type</option>
                            <option value="preTherapyEvaluations">
                              Pre-Therapy Evaluations
                            </option>
                            <option value="therapyPlans">Therapy Plans</option>
                            <option value="videoRecords">Video Records</option>
                            <option value="sessionReports">
                              Session Reports
                            </option>
                          </select>
                        </div>

                        {/* File input */}
                        <div>
                          <label
                            htmlFor="file-upload"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Upload File
                          </label>
                          <Input
                            id="file-upload"
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.png"
                            className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                          <p className="text-sm text-gray-500 mt-2">
                            Supported file formats: PDF, DOC, DOCX, JPG, PNG
                          </p>
                        </div>
                      </div>
                      <DialogFooter className="mt-6">
                        <Button
                          className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
                          onClick={handleUpload}
                        >
                          Upload
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Card
                    className="flex flex-col items-center justify-center cursor-pointer hover:shadow-lg"
                    onClick={() => navigate("/generate-report")}
                  >
                    <CardHeader>
                      <FaDownload size={35} />
                    </CardHeader>
                    <CardFooter className="text-center">
                      Generate Report
                    </CardFooter>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default TherapyPlans;
