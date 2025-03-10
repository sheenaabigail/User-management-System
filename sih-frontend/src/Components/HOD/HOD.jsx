import React from 'react'
import { useState } from 'react';
import Sidebar from './Sidebar';
import Home from './Home';
import AdvancedMonitoring from './Sidebar/AdvancedMonitoring/AdvancedMonitoring';
import Evaluation from './Sidebar/Evaluation/Evaluation';
import Feedback from './Sidebar/Feedback/Feedback';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Settings from './Sidebar/Settings/Settings';

const HOD = () => {

 const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [active, setActive] = useState("Home");
	const navigate = useNavigate();
	const [hodId, setHODId] = useState(null);
	useLayoutEffect(() => {
		const data = JSON.parse(localStorage.getItem("data"));
		console.log("first", window.location.href);
		if (
			data?.user === "HOD" &&
			window.location.href === `http://localhost:5173/HOD/${data?.id}`
		) {
			setHODId(data.id);
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
				/>
			</div>

			{/* Main Content */}
			<div className="flex-1 p-6 overflow-y-auto">


				{/* Active Content */}
				<div>
					{active === "Home" && (
						<Home setActive={setActive} />
					)}
					{active === "Advanced Monitoring" && <AdvancedMonitoring/>}
					{active === "Evaluation" && <Evaluation/>}
					{active === "Feedback" && <Feedback/>}
					{active === "Settings" && <Settings hodId={hodId}></Settings>}
				</div>
			</div>
		</div>
	);
}

export default HOD
