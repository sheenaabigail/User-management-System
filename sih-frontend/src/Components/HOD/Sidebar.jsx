
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({
	isOpen,
	toggleSidebar,
	setActive,
	active,
}) => {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.clear();
		navigate("/login");
	}

	return (
		<div>
			<div className="flex flex-col space-y-2 cursor-pointer w-8 h-6 fixed z-20 top-2 left-2" onClick={toggleSidebar}>
				<span className="block h-1 w-full bg-black rounded-sm transition duration-300"></span>
				<span className="block h-1 w-full bg-black rounded-sm transition duration-300"></span>
				<span className="block h-1 w-full bg-black rounded-sm transition duration-300"></span>
			</div>

			<div className={`fixed top-0  w-[250px] h-full bg-black text-white pt-16   ${isOpen ? 'left-0' : 'left-[-250px]'}`}>
				<button className="absolute top-2 right-2 bg-transparent border-none text-2xl text-white cursor-pointer transition duration-300 hover:text-gray-200" onClick={toggleSidebar}>
					x
				</button>

				<ul className="list-none p-0 m-0">
					<li onClick={() => setActive("Home")} className={`py-3 hover:bg-gray-500 px-5 cursor-pointer ${active === "Home" ? 'bg-gray-700' : ''}`}>
						<a className="text-white text-lg">Home</a>
					</li>
					<li onClick={() => setActive("Advanced Monitoring")} className={`py-3 hover:bg-gray-500 px-5 cursor-pointer ${active === "Advanced Monitoring" ? 'bg-gray-700' : ''}`}>
						<a className="text-white text-lg">Advanced Monitoring</a>
					</li>
					<li onClick={() => setActive("Evaluation")} className={`py-3 hover:bg-gray-500 px-5 cursor-pointer ${active === "Evaluation" ? 'bg-gray-700' : ''}`}>
						<a className="text-white text-lg">Evaluation</a>
					</li>
					<li onClick={() => setActive("Feedback")} className={`py-3 hover:bg-gray-500 px-5 cursor-pointer ${active === "Feedback" ? 'bg-gray-700' : ''}`}>
						<a className="text-white text-lg">Feedback</a>
					</li>
					<li onClick={() => setActive("Settings")} className={`py-3 hover:bg-gray-500 px-5 cursor-pointer ${active === "Settings" ? 'bg-gray-700' : ''}`}>
						<a className="text-white text-lg">Settings</a>
					</li>
					<li onClick={() => logout()} className="py-3 hover:bg-gray-500 px-5 cursor-pointer">
						<a className="text-white text-lg">Logout</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Sidebar;

