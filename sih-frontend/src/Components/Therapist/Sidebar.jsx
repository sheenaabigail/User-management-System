import PropTypes from "prop-types";
import { useEffect } from "react";
import axios from "axios";

const Sidebar = ({
	isOpen,
	toggleSidebar,
	setActive,
	active,
	therapistId,
	unreadCount,
	setUnreadCount,
}) => {
	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/notifications/therapist/${therapistId}`
				);
				if (Array.isArray(response.data)) {
					const unread = response.data.filter((notif) => !notif.isRead).length;
					setUnreadCount(unread);
				}
			} catch (error) {
				console.log("hello", error);
			}
		};

		fetchNotifications();
	}, [therapistId, setUnreadCount]);

	const handleMarkRead = async () => {
		setUnreadCount(0);
		try {
			const response = axios.post(
				"http://localhost:5000/api/sessions/markunread",
				{
					patientId: null,
					therapistId: therapistId,
					supervisorId:null,
				}
			);
			console.log(response);
		} catch (error) {
			console.log("Error in updating as mark read");
		}
		setActive("Notifications");
	};
	return (
		<div className="t-sidebar-container">
			<div className="t-hamburger" onClick={toggleSidebar}>
				<span className="bar"></span>
				<span className="bar"></span>
				<span className="bar"></span>
			</div>

			<div className={`t-sidebar ${isOpen ? "open" : ""}`}>
				<button className="t-sidebar-close-btn" onClick={toggleSidebar}>
					×
				</button>

				<ul className="t-sidebar-tabs">
					<li
						onClick={() => setActive("Home")}
						className={`Menu${active === "Home" ? "active" : ""}`}
					>
						<a className="block  hover:bg-gray-200 hover:text-blue-500 cursor-pointer">
							Home
						</a>
					</li>

					<li
						onClick={() => setActive("PatientList")}
						className={`Menu${active === "PatientList" ? "active" : ""}`}
					>
						<a className="block  hover:bg-gray-200 hover:text-blue-500 cursor-pointer">
							Patient List
						</a>
					</li>
					<li
						onClick={() => setActive("Patientview")}
						className={`Menu${active === "Patientview" ? "active" : ""}`}
					>
						<a className="block  hover:bg-gray-200 hover:text-blue-500 cursor-pointer">
							Patientview (temp)
						</a>
					</li>

					{/* <li
						onClick={() => setActive("Supervisor")}
						className={`Menu${active === "Supervisor" ? "active" : ""}`}
					>
						<a className="block  hover:bg-gray-200 hover:text-blue-500 cursor-pointer">
							Supervisor
						</a>
					</li> */}

          <li
            onClick={() => handleMarkRead()}
            className={`Menu${active === "Notifications" ? "active" : ""}`}
          >
            <a className="block  hover:bg-gray-200 hover:text-blue-500 cursor-pointer">
              Notifications
            </a>
            {unreadCount > 0 && (
              <div className="count animate-bounce ">{unreadCount}</div>
            )}
          </li>

					<li
						onClick={() => setActive("Calendar")}
						className={`Menu${active === "Calendar" ? "active" : ""}`}
					>
						<a className="block  hover:bg-gray-200 hover:text-blue-500 cursor-pointer">
							Calendar
						</a>
					</li>

					{/* <li
						onClick={() => setActive("TherapyPlans")}
						className={`Menu${active === "TherapyPlans" ? "active" : ""}`}
					>
						<a className="block  hover:bg-gray-200 hover:text-blue-500 cursor-pointer">
							Therapy Plans
						</a>
					</li> */}
					<li
						onClick={() => setActive("Reports")}
						className={`Menu${active === "Reports" ? "active" : ""}`}
					>
						<a className="block  hover:bg-gray-200 hover:text-blue-500 cursor-pointer">
							Reports
						</a>
					</li>
					<li
						onClick={() => setActive("Settings")}
						className={`Menu${active === "Settings" ? "active" : ""}`}
					>
						<a className="block  hover:bg-gray-200 hover:text-blue-500 cursor-pointer">
							Settings
						</a>
					</li>
					{/* <li
						onClick={() => setActive("EditReport")}
						className={`Menu${active === "EditReport" ? "active" : ""}`}
					>
						<a className="block  hover:bg-gray-200 hover:text-blue-500 cursor-pointer">
							Edit Report (temporary)
						</a>
					</li> */}
				</ul>
			</div>
		</div>
	);
};

Sidebar.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
