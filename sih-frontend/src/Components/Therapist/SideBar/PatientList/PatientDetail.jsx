import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { FiArrowLeft } from "react-icons/fi";
import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from "@/Components/ui/table";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/Button";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import TreatmentPlanForm from "./TreatmentPlanForm";
import { SessionTracker } from "./SessionTracker";
import PreTherapyEvalForm from "./PreTherapyEvalForm";
import SessionReport from "./SessionReport";

const PatientDetails = ({patientId,toggleComp}) => {
  // Hardcoded patient data
  const patient = {
    id: 1,
    caseName: "John Doe",
    age: 32,
    gender: "Male",
    assignedDate: "2024-11-20",
    caseNo: "A001",
    nextAppointment: "2024-11-22",
    details: "Patient exhibits mild speech delay and requires ongoing therapy.",
    assignedTherapist: "Dr. Smith",
    nextTherapist: "Dr. Johnson",
    therapistHistory: [
      {
        date: "2024-11-20",
        therapist: "Dr. Smith",
        notes: "Initial assessment",
      },
      { date: "2024-11-22", therapist: "Dr. Johnson", notes: "Reallocation" },
    ],
  };

  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-6">
      {/* Back navigation */}
      <div className="flex items-center mb-4">
        <FiArrowLeft
          className="text-xl cursor-pointer hover:text-blue-500 transition-colors"
          onClick={() => toggleComp(true)}
        />
        <h2 className="ml-4 text-2xl font-semibold text-gray-800">
          Patient Details
        </h2>
      </div>

      {/* Patient basic details */}
      <Card className="shadow-lg p-6 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <p>
            <strong>Case No:</strong> {patient.caseNo}
          </p>
          <p>
            <strong>Case Name:</strong> {patient.caseName}
          </p>
          <p>
            <strong>Age:</strong> {patient.age}
          </p>
          <p>
            <strong>Gender:</strong> {patient.gender}
          </p>
          <p>
            <strong>Assigned Date:</strong> {patient.assignedDate}
          </p>
          <p>
            <strong>Next Appointment:</strong> {patient.nextAppointment}
          </p>
        </div>
      </Card>

      {/* Patient details card */}
      <Card className="shadow-lg p-6 ">
        <CardHeader>
          <CardTitle className="text-xl">Patient Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{patient.details}</p>
        </CardContent>
      </Card>

      {/* Therapist History */}
      <Card className="shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-xl">Therapist History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="mt-4">
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>Assignment Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Therapist</strong>
                </TableCell>
                <TableCell>
                  <strong>Notes</strong>
                </TableCell>
              </TableRow>

              {patient.therapistHistory.map((history, index) => (
                <TableRow key={index}>
                  <TableCell>{history.date}</TableCell>
                  <TableCell>{history.therapist}</TableCell>
                  <TableCell>{history.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pre-Therapy Evaluation */}
      <PreTherapyEvalForm></PreTherapyEvalForm>

      <Card className="shadow-lg p-6 bg-gray-50">
        <CardHeader>
          <CardTitle className="text-xl">Therapy Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="mt-4">
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Session No</strong>
                </TableCell>
                <TableCell>
                  <strong>Therapist</strong>
                </TableCell>
                
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Supervisor's comments</strong>
                </TableCell>
                <TableCell>
                  <strong>Clinical Rating</strong>
                </TableCell><TableCell>
                  <strong>Plan</strong>
                </TableCell>
              </TableRow>

              {patient.therapistHistory.map((history, index) => (
                <TableRow key={index}>
                  <TableCell>{history.date}</TableCell>
                  <TableCell>{history.therapist}</TableCell>
                  <TableCell>{history.notes}</TableCell>
                  <TableCell>{history.notes}</TableCell>

                  <TableCell>{history.notes}</TableCell>
                  <TableCell>{history.notes}</TableCell>

                  <TableCell>
                    <Button>Open</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="m-5 mb-0">
          <Dialog className="overflow-scroll m-5">
              <DialogTrigger>
                <Button variant="outline" className="mr-5">
                  Add Treatment Plan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <TreatmentPlanForm></TreatmentPlanForm>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="mr-5">
              Upload Image
            </Button>
          </div>
        </CardContent>
      </Card>
{/* <SessionTracker></SessionTracker> */}
      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => navigate("/patients")}>
          Go Back
        </Button>
        <Button variant="solid">Save Report</Button>
      </div><SessionReport></SessionReport>
    </div>
  );
};

export default PatientDetails;
