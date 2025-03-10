import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./TodaysAppointment.css"; 
import { Card } from "@mui/material";
import { CardContent, CardHeader ,CardTitle} from "@/Components/ui/card";

const TodaysAppointments = ({therapistId}) => {
  const [appointments, setAppointments] = useState([]);
  
  useEffect(() => {
    const getAppointment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/sessions/patientDetails?therapistId=${therapistId}`
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
        setAppointments(todayAppointments);
      } catch (error) {
        console.error("Unable to get the Appointments,", error);
      }
    };
    getAppointment();
  }, [therapistId]);

  return (
    < ><CardContent>
      <CardHeader className="appointments-heading">
        <CardTitle>Today's Appointments</CardTitle></CardHeader>
      {appointments.length > 0 ? (
        <ul className="appointments-list">
          {appointments.map((appointment, index) => (
            <li key={index} className="appointment-card">
              <p>
                <strong>Name:</strong> {appointment.name}
              </p>
              <p>
                <strong>Age:</strong> {appointment.age}
              </p>
              <p>
                <strong>Next Appointment:</strong>{" "}
                {
                  (() => {
                    const arr = appointment.nextAppointment.split("T");
                    const date = arr[0];  
                    const time = arr[1] ? arr[1].substring(0, 5) : ""; 
                    return `Date:${date}  Time:${time}`; 
                  })()
                }
              </p>
              <hr className="my-4"/>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-appointments">No appointments available for today.</p>
      )}
    </CardContent></>
  );
};

export default TodaysAppointments;
