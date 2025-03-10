import React, { useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import moment from "moment-timezone";

const ScheduleSessions = ({ setNextAppointment, setActive, patientId, adminId, therapistId }) => {
  const [step, setStep] = useState("date");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isPreConfirmModalOpen, setIsPreConfirmModalOpen] = useState(false);
  const [isFinalConfirmModalOpen, setIsFinalConfirmModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 6);

  const fetchAvailableSlots = async (date) => {
    try {
      const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
      const response = await axios.get(
        `http://localhost:5000/api/patient/${patientId}/availableSlots?day1=${day}`
      );
      console.log(response.data);
      console.log(response);
      setAvailableSlots(response.data.response);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching available slots.");
    }
  };
  console.log(availableSlots);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAvailableSlots(date);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const openPreConfirmModal = () => {
    setIsPreConfirmModalOpen(true);
  };

  const closePreConfirmModal = () => {
    setIsPreConfirmModalOpen(false);
  };

  const confirmBooking = async () => {
    setLoading(true);
    setError("");

    try {
      const startTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(":");
      startTime.setHours(hours, minutes);

      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + 60);

      const formattedStartTime = moment(startTime).tz("Asia/Kolkata", true).format("YYYY-MM-DDTHH:mm:ss");
      const formattedEndTime = moment(endTime).tz("Asia/Kolkata", true).format("YYYY-MM-DDTHH:mm:ss");
      console.log()
      await axios.post("http://localhost:5000/api/patient/schedule", {
        patientId,
        adminId:adminId,
        startTime: formattedStartTime + "Z",
        endTime: formattedEndTime + "Z",
        mood: null,
        notes: null,
      });

      setNextAppointment(`${selectedDate.toDateString()} at ${selectedTime}`);
      setIsPreConfirmModalOpen(false);
      setIsFinalConfirmModalOpen(true);
      
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeFinalConfirmModal = () => {
    setIsFinalConfirmModalOpen(false);
    setActive("Home");
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 text-center bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Schedule a Session</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {step === "date" && (
        <div>
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
            <Calendar
              minDate={today}
              maxDate={maxDate}
              onClickDay={handleDateChange}
            />
          </div>
          {selectedDate && (
            <div>
              <p className="text-gray-700">Selected Date: {selectedDate.toDateString()}</p>
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => setStep("time")}
                >
                  Select Date
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {step === "time" && (
        <div>
          <div className="mb-6">
            <h2 className="text-lg text-gray-700">Available Time Slots for {selectedDate.toDateString()}</h2>
            {availableSlots.length ? (
              <div className="flex flex-wrap justify-center mt-4 space-x-2">
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded border transition-colors ${
                      selectedTime === slot.startTime
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => handleTimeSelection(slot.startTime)}
                  >
                    {slot.startTime} - {slot.endTime}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No available slots for this date.</p>
            )}
          </div>
          {selectedTime && (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={openPreConfirmModal}
              disabled={loading}
            >
              {loading ? "Booking..." : "Book Session"}
            </button>
          )}
          <button
            className="px-4 py-2 mt-4 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => {
              setStep("date");
              setSelectedDate(null);
            }}
          >
            Back to Date Selection
          </button>
        </div>
      )}

      <Modal open={isPreConfirmModalOpen} onClose={closePreConfirmModal}>
        <Box className="p-6 bg-white rounded shadow-md w-96 mx-auto mt-20">
          <h2 className="text-xl font-semibold mb-4">Confirm Your Selection</h2>
          <p className="text-gray-700 mb-6">
            Are you sure you want to book the session on <strong>{selectedDate?.toDateString()}</strong> at <strong>{selectedTime}</strong>?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={confirmBooking}
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm"}
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={closePreConfirmModal}
            >
              Cancel
            </button>
          </div>
        </Box>
      </Modal>

      <Modal open={isFinalConfirmModalOpen} onClose={closeFinalConfirmModal}>
        <Box className="p-6 bg-white rounded shadow-md w-96 mx-auto mt-20">
          <h2 className="text-xl font-semibold mb-4">Booking Confirmation</h2>
          <p className="text-gray-700 mb-6">
            Your session is booked on {selectedDate?.toDateString()} at {selectedTime}.
          </p>
          <button
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={closeFinalConfirmModal}
          >
            Close
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default ScheduleSessions;
