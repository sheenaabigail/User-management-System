import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/Components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/Components/ui/select";

function Report({ title, description, status }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reportType, setReportType] = useState("");
  const [sessionNumber, setSessionNumber] = useState("");

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  const handleSessionNumberChange = (e) => {
    setSessionNumber(e.target.value);
  };

  const renderReportForm = () => {
    switch (reportType) {
      case "sessionreport":
        return <div>Session Report Form (Session No: {sessionNumber})</div>;
      case "progressreport":
        return <div>Progress Report Form (Session No: {sessionNumber})</div>;
      case "treatmentplan":
        return <div>Treatment Plan Form (Session No: {sessionNumber})</div>;
      case "preassessmenteval":
        return (
          <div>
            Pre-Assessment Evaluation Form (Session No: {sessionNumber})
          </div>
        );
    }
  };

  return (
    <div>
      <Card className="p-4 border rounded-lg shadow-sm hover:bg-gray-50">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="font-semibold text-lg">{title}</CardTitle>
          <span
            className={`inline-block px-3 py-1 text-sm rounded ${
              status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {status}
          </span>
        </CardHeader>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </Card>

     
    </div>
  );
}

export default Report;
