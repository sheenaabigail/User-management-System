// import React, { useState } from "react";
// import "../../css/navbar.css";

import NextAppointment from "./SideBar/Home/NextAppointment";
// import TherapistCalendar from "./SideBar/Home/TherapistCalendar";
// import TodaysAppointments from "./SideBar/Home/TodaysAppointments";
import ToDoList from "./SideBar/Home/ToDoList";
import TopPatients from "./SideBar/Home/ReportStatus";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/Button";
import { FaClipboardList, FaUser, FaVideo } from "react-icons/fa";
import Therapist from "./Therapist";
import { useState, useEffect } from "react";
import axios from "axios";
import ReportStatus from "./SideBar/Home/ReportStatus";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MainComponent = ({ therapistId }) => {
  console.log(therapistId);
  const [no, setNo] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    let timeOutId;
    const getNoPatients = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sessions/assignedPatients?therapistId=${therapistId}`
        );
        console.log(response.data.length);
        setNo(response.data.length);
      } catch (error) {
        console.log("Unable to fetch the number of patients:", error);
      }
    };
    getNoPatients();
  }, [therapistId]);
  useEffect(() => {
    const getAppointment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sessions/patientDetails?therapistId=${therapistId}`
        );
        const today = new Date();
        const todayAppointments = response.data.filter((appointment) => {
          const appointmentDate = new Date(appointment.nextAppointment);
          return (
            appointmentDate.getDate() === today.getDate() &&
            appointmentDate.getMonth() === today.getMonth() &&
            appointmentDate.getFullYear() === today.getFullYear()
          );
        });
        console.log(todayAppointments);
        setAppointments(todayAppointments.length);
      } catch (error) {
        console.error("Unable to get the Appointments,", error);
      }
    };
    getAppointment();
  }, [therapistId]);
  // Sample data for the chart
  const chartData = {
    labels: ["Report 1", "Report 2", "Report 3", "Report 4", "Report 5"],
    datasets: [
      {
        label: "Ratings",
        data: [8, 7, 9, 6, 8],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-3 mt-10">
        {/* Quick Access Box */}
        <Card className="col-span-2 md:col-span-2 flex items-center justify-between p-4">
          <div className="flex gap-4">
            <Button
              variant="outline p-3"
              className="flex flex-col items-center"
            >
              <FaClipboardList size={24} />
              <span className="text-sm">Pending Reports</span>
            </Button>
            <Button
              variant="outline p-3"
              className="flex flex-col items-center"
            >
              <FaUser size={24} />
              <span className="text-sm">Patient Data</span>
            </Button>
          </div>
        </Card>
        {/* Statistic Numbers */}
        <Card className="col-span-1 flex flex-col items-center justify-center text-center p-6">
          <h3 className="text-lg font-semibold text-gray-600">
            Total Patients
          </h3>
          <p className="text-4xl font-bold text-gray-900">{no}</p>
        </Card>

        <Card className="col-span-1 flex flex-col items-center justify-center text-center p-6">
          <h3 className="text-lg font-semibold text-gray-600">
            Sessions Today
          </h3>
          <p className="text-4xl font-bold text-gray-900">{appointments}</p>
        </Card>
<div className="col-span-4">
  <Card><CardHeader><CardTitle>Next Appointment</CardTitle></CardHeader><CardContent><NextAppointment therapistId={therapistId}></NextAppointment></CardContent></Card>
</div>
        {/* Other Components */}

        <ReportStatus></ReportStatus>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Performance Ratings</CardTitle>
            <CardDescription>Ratings for recent reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Line data={chartData} options={chartOptions} />
          </CardContent>
        </Card>

        {/* To-Do List */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          {/* <ToDoList /> */}
        </div>
      </div>
    </>
  );
};

export default MainComponent;
