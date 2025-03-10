import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const ReportList = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Sample reports data with date added
  const reports = [
    {
      reportNumber: "RPT-001",
      therapistName: "Dr. Jane Doe",
      patientName: "John Doe",
      reportDetails: "Second Report - Follow-up on speech therapy",
      status: "In Progress",
      date: "2024-11-20",
    },
    {
      reportNumber: "RPT-002",
      therapistName: "John Smith",
      patientName: "Sarah Lee",
      reportDetails: "Third Report - Neurological therapy",
      status: "Approved",
      date: "2024-10-15",
    },
    {
      reportNumber: "RPT-003",
      therapistName: "Emily Johnson",
      patientName: "Michael Brown",
      reportDetails: "Second Report - Update on treatment progress",
      status: "In Progress",
      date: "2024-11-10",
    },
    {
      reportNumber: "RPT-004",
      therapistName: "Dr. Jane Doe",
      patientName: "Anna White",
      reportDetails: "First Report - Initial speech therapy assessment",
      status: "Approved",
      date: "2024-09-25",
    },
    {
      reportNumber: "RPT-005",
      therapistName: "John Smith",
      patientName: "David Wilson",
      reportDetails: "Second Report - Follow-up therapy session",
      status: "Pending",
      date: "2024-11-05",
    },
  ];

  // State for filters and sorting
  const [statusFilter, setStatusFilter] = useState(""); // Filter by status
  const [searchQuery, setSearchQuery] = useState(""); // Search query for report details or names
  const [dateSort, setDateSort] = useState("desc"); // Date sorting: 'asc' or 'desc'

  const handleItemClick = (reportNumber) => {
    navigate(`/report/${reportNumber}`); // Navigate to the specific report details page
  };

  // Filter reports based on status and search query
  const filteredReports = reports.filter((report) => {
    const matchesStatus = statusFilter ? report.status === statusFilter : true;
    const matchesSearchQuery =
      report.reportNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.therapistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportDetails.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearchQuery;
  });

  // Sort reports by date
  const sortedReports = filteredReports.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateSort === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by report number, therapist, patient..."
        className="border border-gray-300 p-2 w-full mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
  <select
    className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-2/3" // Adjust width here to make it consistent with the button
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="">All Statuses</option>
    <option value="In Progress">In Progress</option>
    <option value="Approved">Approved</option>
    <option value="Pending">Pending</option>
  </select>

  <button
    className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3" // Make width of the button consistent with the dropdown
    onClick={() => setDateSort(dateSort === "asc" ? "desc" : "asc")}
  >
    Sort by Date {dateSort === "asc" ? "↓" : "↑"}
  </button>
</div>


      {/* Report List */}
      <ul className="space-y-6">
        {sortedReports.map((report) => (
          <li
            key={report.reportNumber}
            className="bg-white shadow-lg rounded-xl p-4 cursor-pointer hover:shadow-2xl transition-all duration-300"
            onClick={() => handleItemClick(report.reportNumber)}
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-1">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {`Report: ${report.reportNumber}`}
                  </h2>
                  <p className="text-gray-600 text-sm">Therapist: {report.therapistName}</p>
                  <p className="text-gray-600 text-sm">Patient: {report.patientName}</p>
                </div>
              </div>

              <div className="mt-4 text-gray-700">
                <p className="text-sm">{report.reportDetails}</p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">Status:</p>
                <div
                  className={`px-3 py-1 text-xs rounded-full font-semibold text-white ${
                    report.status === "Approved"
                      ? "bg-green-500"
                      : report.status === "In Progress"
                      ? "bg-yellow-500"
                      : report.status === "Pending"
                      ? "bg-gray-500"
                      : "bg-red-500"
                  }`}
                >
                  {report.status}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-400">Date: {new Date(report.date).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportList;
