import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const NextAppointment = ({ therapistId }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5001/api/sessions/patientDetails?therapistId=${therapistId}`
        );
        const formattedData = response.data.map((session, index) => ({
          id: index + 1, // unique ID for DataGrid
          date: session.nextAppointment.split("T")[0],
          time: session.nextAppointment.split("T")[1]?.substring(0, 5),
          patientName: session.name,
          sessionNumber: session.sessionNumber,
          caseDetails: session, // to pass detailed session data
        }));
        setSessions(formattedData);
      } catch (err) {
        console.error("Error fetching sessions:", err);
        setError("Unable to load session data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [therapistId]);

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
    { field: "patientName", headerName: "Patient Name", flex: 2 },
    { field: "sessionNumber", headerName: "Session Number", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <button
          className="bg-blue-500 text-white py-1 px-4 rounded transition-all hover:bg-blue-600"
          onClick={() => showCaseDetails(params.row.caseDetails)}
        >
          Show Case Details
        </button>
      ),
    },
  ];

  const showCaseDetails = (details) => {
    // Replace with your modal/dialog implementation
    alert(`Patient Name: ${details.name}\nSession Number: ${details.sessionNumber}`);
  };

  return (
    <div className="w-full h-96">
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <DataGrid
          rows={sessions}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          className="bg-white border shadow-md"
          sortModel={[
            { field: "date", sort: "asc" }, // Sort by date ascending
            { field: "time", sort: "asc" }, // Sort by time ascending
          ]}
        />
      )}
    </div>
  );
};

export default NextAppointment;
