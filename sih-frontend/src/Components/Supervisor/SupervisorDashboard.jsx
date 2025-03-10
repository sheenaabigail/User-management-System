import { useState, useLayoutEffect } from "react"; // Added useLayoutEffect import
import { useNavigate } from "react-router-dom"; // Added useNavigate import
import SupervisorSidebar from "./SupervisorSidebar";
import Notifications from "./Menu/Notifications/Notifications";
import Home from "./Menu/Home/Home";
import Settings from "./Menu/Settings/settings";
import "./supervisormain.css";
import PatientList from "../Therapist/SideBar/PatientList/PatientList";
import TherapistList from "./Menu/TherapistList/TherapistList";
import ReportList from "./Menu/Reports/ReportList";
import TodoList from "./Menu/Tasks/ToDoList";
import TherapistDetails from "./Menu/TherapistList/TherapistDetails";
import PatientDetails from "./Menu/TherapistList/PatientDetails";
import SessionDetails from "./Menu/TherapistList/SessionDetails";
import ReportView from "./Menu/Reports/ReportView";
import Requests from "./Menu/Requests/Requests";


const SupervisorDashboard = () => {
  const navigate = useNavigate(); // Now properly imported
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [active, setActive] = useState("Home");
  const [supervisorId, setSupervisorId] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);


  useLayoutEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    console.log("first", window.location.href);
    if (
      data?.user === "Supervisor" &&
      window.location.href === `http://localhost:5173/Supervisor/${data?.id}`
    ) {
      setSupervisorId(data.id);
    } else {
      navigate("/Auth");
      window.location.reload();
    }
  }, []);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {supervisorId !== null && (
        <div className="flex">
          <SupervisorSidebar 
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            setActive={setActive}
            active={active}
            supervisorId={supervisorId}
            setUnreadCount={setUnreadCount}
            unreadCount={unreadCount}
          />

          {/* Content Area */}
          <div
            className={`supervisor-content transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "ml-3" : "ml-0"
            } w-full`}
          >
            {active === "Home" && <Home />}
            {active === "ToDoList" && <TodoList></TodoList>}
            {active === "TherapistList" && <TherapistList></TherapistList>}
            {active === "ReportList" && <ReportList></ReportList>}
            {active === "Settings" && <Settings supervisorId={supervisorId}></Settings>}
            {active === "Notifications" && <Notifications supervisorId={supervisorId}></Notifications>}
            {active === "TherapistDetails" && <TherapistDetails></TherapistDetails>}
            {active === "PatientDetails" && <PatientDetails></PatientDetails>}
            {active === "SessionDetails" && <SessionDetails></SessionDetails>}
            {active === "Requests" && <Requests supervisorId={supervisorId}/>}
            {active === "ReportView" && <ReportView></ReportView>}
          </div>
        </div>
      )}
    </>
  );
};

export default SupervisorDashboard;
