
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Assign from './Assign';
import Reassign from './Reassign';
import AddPatient from './AddPatient';
import Home from './Home';
import AddTherapist from './AddTherapist';
import AddSupervisor from './AddSupervisor';
import { useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Supervisor from './Supervisor';
import Notification from './Notification';
import SessionDetails from './SessionDetails';
import axios from 'axios';


const Admin = () => {
	const navigate = useNavigate();
	const [patientId, setPatientId] = useState(null);
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [active, setActive] = useState("Home");
	const [nextAppointment, setNextAppointment] = useState({});
	const [unreadCount, setUnreadCount] = useState(0);
	const [adminId, setAdminId] = useState(null);
	const [stats, setStats] = useState(null);  // Store the stats data
	useLayoutEffect(() => {
		const data = JSON.parse(localStorage.getItem("data"));
		console.log("first", window.location.href);
		if (
			data?.user === "Admin" &&
			window.location.href === `http://localhost:5173/Admin/${data?.id}`
		) {
			setAdminId(data.id);
		} else {
			navigate("/Auth");
			window.location.reload();
		}
	}, []);



	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	return (
				<div className="flex h-screen bg-gray-100">
					{/* Sidebar */}
					<div
						className={`transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0 w-[250px]' : '-translate-x-full w-0'
							} bg-white `}
					>
						<Sidebar
							isOpen={isSidebarOpen}
							toggleSidebar={toggleSidebar}
							setActive={setActive}
							active={active}
							patientId={patientId}
							nextAppointment={nextAppointment}
							unreadCount={unreadCount}
							setUnreadCount={setUnreadCount}
						/>
					</div>

					{/* Main Content */}
					<div className="flex-1 p-6 overflow-y-auto">


						{/* Active Content */}
						<div>
							{active === "Home" && (
								<Home setActive={setActive} />
							)}
							{active === "Patients" && <AddPatient />}
							{active === "Therapists" && <AddTherapist />}
							{active === "Supervisors" && <Supervisor />}
							{active === "Reassign" && <Reassign />}
							{active === "Assign" && <Assign adminId={adminId} />}
							{active === "notifications" && <Notification adminId={adminId} />}
							{active === "Session Details" && <SessionDetails />}
						</div>
					</div>
				</div>
	);
};

export default Admin;

