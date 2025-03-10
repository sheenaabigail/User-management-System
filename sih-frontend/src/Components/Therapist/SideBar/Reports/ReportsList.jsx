import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import Report from "./Report";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
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

const reportsData = [
  {
    id: 1,
    title: "Report 1",
    description: "Details of report 1",
    status: "completed",
  },
  {
    id: 2,
    title: "Report 2",
    description: "Details of report 2",
    status: "draft",
  },
  {
    id: 3,
    title: "Report 3",
    description: "Details of report 3",
    status: "completed",
  },
  {
    id: 4,
    title: "Report 4",
    description: "Details of report 4",
    status: "draft",
  },
  {
    id: 5,
    title: "Report 5",
    description: "Details of report 5",
    status: "all",
  },
];

function ReportsList() {
  const [selectedReport, setSelectedReport] = useState(null);
  const navigate = useNavigate(); 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sessionNumber, setSessionNumber] = useState("");
  const [reportType, setReportType] = useState("");
  const [patientName, setPatientName] = useState("");
  const [formError, setFormError] = useState("");
  
  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  const handleSessionNumberChange = (e) => {
    setSessionNumber(e.target.value);
  };

  const handlePatientNameChange = (e) => {
    setPatientName(e.target.value);
  };

  const handleSubmit = () => {
    if (!sessionNumber || !patientName || !reportType) {
      setFormError("Please fill all fields before submitting.");
      return;
    }

    // Simulate report creation
    setFormError("");
    setIsDialogOpen(false);
    alert("Report created successfully!");
  };

  const renderReportForm = () => {
    switch (reportType) {
      case "sessionReport":
        return <div>Session Report Form (Session No: {sessionNumber})</div>;
      case "progressReport":
        return <div>Progress Report Form (Session No: {sessionNumber})</div>;
      case "treatmentPlan":
        return <div>Treatment Plan Form (Session No: {sessionNumber})</div>;
      case "preAssessmentEval":
        return (
          <div>
            Pre-Assessment Evaluation Form (Session No: {sessionNumber})
          </div>
        );
      default:
        return <div>Please select a report type</div>;
    }
  };

  const renderReports = (status) => {
    return reportsData
      .filter((report) => status === "all" || report.status === status)
      .map((report) => (
        <div
          key={report.id}
          onClick={() => setSelectedReport(report)}
          className="cursor-pointer"
        >
          <Report
            title={report.title}
            description={report.description}
            status={report.status}
          />
        </div>
      ));
  };

  return (
    <div className="flex space-x-4 h-full">
      <div
        className={`transition-all duration-300  ${selectedReport ? "w-1/3" : "w-full"}`}
      >
        <Card className="h-full">
          <CardHeader>
            <Tabs defaultValue="all-reports" className="w-full">
              <TabsList>
                <TabsTrigger value="all-reports">All Reports</TabsTrigger>
                <TabsTrigger value="completed-reports">Completed</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>
              <TabsContent value="all-reports" className="space-y-4 h-[70vh] overflow-y-auto">
                {renderReports("all")}
              </TabsContent>
              <TabsContent value="completed-reports" className="space-y-4 h-[60vh] overflow-y-auto">
                {renderReports("completed")}
              </TabsContent>
              <TabsContent value="drafts" className="space-y-4 h-[60vh] overflow-y-auto">
                {renderReports("draft")}
              </TabsContent>
            </Tabs>
          </CardHeader>
          <CardFooter>
            <div className="mt-4 flex justify-end">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger>
                  <Button variant="outline">Create New Report</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Create New Report</DialogTitle>

                  {/* Report Type Dropdown */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Select Report Type
                    </label>
                    <Select value={reportType} onValueChange={handleReportTypeChange}>
                      <SelectTrigger>
                        <button>Select Report Type</button>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sessionReport">Session Report</SelectItem>
                        <SelectItem value="progressReport">Progress Report</SelectItem>
                        <SelectItem value="treatmentPlan">Treatment Plan</SelectItem>
                        <SelectItem value="preAssessmentEval">Pre-Assessment EVSL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Patient Name Dropdown */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Select Patient Name
                    </label>
                    <Select value={patientName} onValueChange={handlePatientNameChange}>
                      <SelectTrigger>
                        <button>Select Patient Name</button>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="patient1">Patient 1</SelectItem>
                        <SelectItem value="patient2">Patient 2</SelectItem>
                        <SelectItem value="patient3">Patient 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Session Number */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Session Number
                    </label>
                    <input
                      type="text"
                      value={sessionNumber}
                      onChange={handleSessionNumberChange}
                      placeholder="Enter Session Number"
                      className="mt-2 p-2 border rounded-md w-full"
                    />
                  </div>

                  {/* Error Message */}
                  {formError && (
                    <div className="text-red-500 mt-2">{formError}</div>
                  )}

                  {/* Render the corresponding form based on report type */}
                  <div className="mt-4">{renderReportForm()}</div>

                  {/* Close and Submit Button */}
                  <div className="mt-6 flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                      Edit Report
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Full Content Section */}
      {selectedReport && (
        <div className="w-2/3 p-4 border rounded-lg shadow-lg">
          <button
            onClick={() => setSelectedReport(null)}
            className="mb-4 text-blue-600 underline"
          >
            Back to list
          </button>

          <div className="flex flex-row justify-between items-center">
            <h2 className="text-xl font-bold">{selectedReport.title}</h2>
            <div className="flex flex-row items-center gap-4">
              <span
                className={`text-sm px-3 py-1 rounded ${
                  selectedReport.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {selectedReport.status}
              </span>

              {/* Redirect to EditReports for Drafts */}
              {selectedReport.status === "draft" && (
                <Button
                  onClick={() =>
                    navigate("/edit-report", {
                      state: { report: selectedReport },
                    })
                  }
                  variant="default"
                >
                  Edit Report
                </Button>
              )}
            </div>
          </div>

          {selectedReport.status === "completed" && (
            <p className="mt-4 text-sm text-gray-600">This report is view-only.</p>
          )}
          <p className="mt-2 text-gray-600">{selectedReport.description}</p>
        </div>
      )}
    </div>
  );
}

export default ReportsList;
