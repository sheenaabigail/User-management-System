import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import axios from "axios";

const SupervisorSidebar = ({ isOpen, toggleSidebar, setActive, active, supervisorId, setUnreadCount, unreadCount}) => {
  console.log(active);
  useEffect(() => {
    const fetchNotifications = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/notifications/superviosr/${supervisorId}`
              );
            if (Array.isArray(response.data)) {
                const unread = response.data.filter((notif) => !notif.isRead).length;
                setUnreadCount(unread);
            }
        } catch (error) {
            console.log("hello",error);
        }
    };

    fetchNotifications();
}, [supervisorId, setUnreadCount]);

const handleMarkRead = async()=>{
    setUnreadCount(0);
    try{
        const response = await axios.post("http://localhost:5000/api/sessions/markunread",{
            patientId: null,
            therapistId:null,
            supervisorId:supervisorId,
        });
        console.log(response);
    }catch(error){
        console.log("Error in updating as mark read");
    }
    setActive("Notifications");
}

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className={`supervisor-sidebar transition-all duration-300 ease-in-out fixed top-0 left-0 h-full bg-black text-white w-64 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="supervisor-close-btn absolute top-4 right-4 text-3xl text-white"
          onClick={toggleSidebar}
        >
          ×
        </button>

        {/* Sidebar Menu */}
        <ul className="mt-16 overflow-y-scroll h-[calc(100vh-4rem)] px-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <li
            onClick={() => setActive("Home")}
            className={`supervisor-Menu p-4 cursor-pointer hover:bg-gray-700 ${
              active === "Home" ? "bg-gray-600" : ""
            }`}
          >
            <a>Home</a>
          </li>
       
          <li
            onClick={() => setActive("TherapistList")}
            className={`supervisor-Menu p-4 cursor-pointer hover:bg-gray-700 ${
              active === "TherapistList" ? "bg-gray-600" : ""
            }`}
          >
            <a>Therapist List</a>
          </li>
          <li
            onClick={() => setActive("ReportList")}
            className={`supervisor-Menu p-4 cursor-pointer hover:bg-gray-700 ${
              active === "ReportList" ? "bg-gray-600" : ""
            }`}
          >
            <a>Reports</a>
          </li>
          <li
            onClick={() => handleMarkRead()}
            className={`supervisor-Menu p-4 cursor-pointer hover:bg-gray-700 ${
              active === "Notifications" ? "bg-gray-600" : ""
            }`}          >
            <a >
              Notifications
            </a>
            {unreadCount > 0 && (
              <div className="count animate-bounce ">{unreadCount}</div>
            )}
          </li>
          <li
            onClick={() => setActive("Settings")}
            className={`supervisor-Menu p-4 cursor-pointer hover:bg-gray-700 ${
              active === "Settings" ? "bg-gray-600" : ""
            }`}
          >
            <a>Settings</a>
          </li>
				
          <li
            onClick={() => setActive("TherapistDetails")}
            className={`supervisor-Menu p-4 cursor-pointer hover:bg-gray-700 ${
              active === "TherapistDetails" ? "bg-gray-600" : ""
            }`}
          >
            <a>Therapist Details</a>
          </li>
          <li
            onClick={() => setActive("PatientDetails")}
            className={`supervisor-Menu p-4 cursor-pointer hover:bg-gray-700 ${
              active === "PatientDetails" ? "bg-gray-600" : ""
            }`}
          >
            <a>Patient Details </a>
          </li>
          <li
            onClick={() => setActive("SessionDetails")}
            className={`supervisor-Menu p-4 cursor-pointer hover:bg-gray-700 ${
              active === "SessionDetails" ? "bg-gray-600" : ""
            }`}
          >
            <a>Session Details</a>
          </li>

          <li
            onClick={() => setActive("ReportView")}
            className={`supervisor-Menu p-4 cursor-pointer hover:bg-gray-700 ${
              active === "ReportView" ? "bg-gray-600" : ""
            }`}
          >
            <a>Report View</a>
          </li>
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div
        className="supervisor-hamburger absolute top-4 left-4 cursor-pointer"
        onClick={toggleSidebar}
      >
        <span className="supervisor-bar block w-6 h-1 mb-1 bg-black"></span>
        <span className="supervisor-bar block w-6 h-1 mb-1 bg-black"></span>
        <span className="supervisor-bar block w-6 h-1 bg-black"></span>
      </div>

      {/* Content Area */}
      <div
        className={`content flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Main content goes here */}
      </div>
    </div>
  );
};

SupervisorSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
};

export default SupervisorSidebar;
