import { useState } from "react";
import "./therapist.css";
import Sidebar from "./Sidebar.jsx";
import MainComponent from "./MainComponent.jsx";
import Notifications from "../Therapist/SideBar/Notifications/Notifications.jsx";
import PatientList from "./SideBar/PatientList/PatientList.jsx";
import Settings from "./SideBar/Settings/settings.jsx";
import Supervisor from "./SideBar/Supervisor/Supervisor.jsx";
import Calendar from "./SideBar/Calender/Calendar.jsx";
import TherapyPlans from "./SideBar/TherapyPlans/TherapyPlan";
import Reports from "./SideBar/Reports/ReportsList";
import EditReports from "./SideBar/Reports/EditReports";
import PatientDetails from "./SideBar/PatientList/PatientDetail";
import { useLayoutEffect } from "react";
function Therapist() {
	const [unreadCount, setUnreadCount] = useState(0);
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [therapistId, setTherapistId] = useState(null);  // Example therapistId as a placeholder
	const [active, setActive] = useState("Home");
	console.log(therapistId);
	useLayoutEffect(() => {
		const data = JSON.parse(localStorage.getItem("data"));
		console.log("first", window.location.href);
		if (
			data?.user === "Therapist" &&
			window.location.href === `http://localhost:5173/Therapist/${data?.id}`
		) {
			setTherapistId(data.id);
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
			{therapistId && (
				<div className={`t-dash-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
					{/* Sidebar component */}
					<Sidebar
						setActive={setActive}
						active={active}
						isOpen={isSidebarOpen}
						toggleSidebar={toggleSidebar}
						therapistId={therapistId}
						unreadCount={unreadCount}
						setUnreadCount={setUnreadCount}
					/>

					{/* Main content display */}
					<div className="t-content">
						{active === 'Home' && <MainComponent therapistId={therapistId} />}
						{active === 'Settings' && <Settings therapistId={therapistId} />}
						{active === 'PatientList' && <PatientList therapistId={therapistId} />}
						{active === 'Supervisor' && <Supervisor therapistId={therapistId} />}
						{active === 'Notifications' && <Notifications therapistId={therapistId} />}
						{active === 'Calendar' && <Calendar therapistId={therapistId} />}
						{active === 'TherapyPlans' && <TherapyPlans therapistId={therapistId} />}
						{active === 'Reports' && <Reports />}
						{active === 'EditReport' && <EditReports setSidebarOpen={setSidebarOpen} />}
						{active === 'Patientview' && <PatientDetails></PatientDetails>}
					</div>
				</div>
			)}
		</>
	);
}

export default Therapist;
