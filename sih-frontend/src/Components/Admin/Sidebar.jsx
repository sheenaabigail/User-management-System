import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({
  isOpen,
  toggleSidebar,
  setActive,
  active,
}) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(0); // Example: 3 unread notifications

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <div className="flex flex-col space-y-2 cursor-pointer w-8 h-6 fixed z-20 top-2 left-2" onClick={toggleSidebar}>
        <span className="block h-1 w-full bg-black rounded-sm transition duration-300"></span>
        <span className="block h-1 w-full bg-black rounded-sm transition duration-300"></span>
        <span className="block h-1 w-full bg-black rounded-sm transition duration-300"></span>
      </div>

      <div className={`fixed top-0 w-[250px] h-full bg-black text-white pt-16 ${isOpen ? 'left-0' : 'left-[-250px]'}`}>
        <button className="absolute top-2 right-2 bg-transparent border-none text-2xl text-white cursor-pointer transition duration-300 hover:text-gray-200" onClick={toggleSidebar}>
          x
        </button>

        <ul className="list-none p-0 m-0">
          <li onClick={() => setActive("Home")} className={`py-3 hover:bg-gray-500 px-5 cursor-pointer ${active === "Home" ? 'bg-gray-700' : ''}`}>
            <a className="text-white text-lg">Home</a>
          </li>
          <li onClick={() => setActive("Patients")} className={`py-3 hover:bg-gray-500 px-5 cursor-pointer ${active === "Patients" ? 'bg-gray-700' : ''}`}>
            <a className="text-white text-lg">Patients</a>
          </li>
          <li onClick={() => setActive("Therapists")} className={`py-3 hover:bg-gray-500 px-5 cursor-pointer ${active === "Therapists" ? 'bg-gray-700' : ''}`}>
            <a className="text-white text-lg">Therapists</a>
          </li>
          <li onClick={() => setActive("Supervisors")} className={`py-3 hover:bg-gray-500 px-5 cursor-pointer ${active === "Supervisors" ? 'bg-gray-700' : ''}`}>
            <a className="text-white text-lg">Supervisors</a>
          </li>
          <li onClick={() => setActive("Reassign")} className={`py-3 hover:bg-gray-500 px-5 cursor-pointer ${active === "Reassign" ? 'bg-gray-700' : ''}`}>
            <a className="text-white text-lg">Reassign</a>
          </li>
          <li onClick={() => setActive("Assign")} className={`py-3 hover:bg-gray-500 px-5 cursor-pointer ${active === "Assign" ? 'bg-gray-700' : ''}`}>
            <a className="text-white text-lg">Assign</a>
          </li> 
					<li onClick={() => setActive("Session Details")} className={`py-3 hover:bg-gray-500 px-5 cursor-pointer ${active === "Session Details" ? 'bg-gray-700' : ''}`}>
            <a className="text-white text-lg">Session Details</a>
          </li>
          <li
              onClick={() => {
                setActive("notifications");
              }}
              className={`py-3 hover:bg-gray-500 px-5 cursor-pointer ${active === "Notifications" ? 'bg-gray-700' : ''}`}
            >
              <a className="text-white text-lg flex items-center">
                Notifications
                {notifications > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                    {notifications}
                  </span>
                )}
              </a>
            </li>

          <li onClick={() => logout()} className="py-3 hover:bg-gray-500 px-5 cursor-pointer">
            <a className="text-white text-lg">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
