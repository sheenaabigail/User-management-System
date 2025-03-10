import React, { useState, useEffect, useLayoutEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
	Users,
	UserPlus,
	UserCheck,
	ClipboardList,
	BarChart2,
	PieChart,
	Settings,
	RefreshCw
} from 'lucide-react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	PieChart as RechartPieChart,
	Pie,
	Cell,
	ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




// Modal Component for Adding/Editing Entities
const ManagementModal = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
			<div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold">{title}</h2>
					<button
						onClick={onClose}
						className="text-gray-600 hover:text-gray-900"
					>
						<Settings className="w-6 h-6" />
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};

// Admin Dashboard Component
const Home = ({ setActive }) => {
	const navigate = useNavigate();
	const handleClick = (route) => {
		// alert(`Navigating to details of ${action.label}`);
		setActive(route); // Change the route as needed
		console.log(route);
	};
	// State for managing different aspects of the dashboard
	const [stats, setStats] = useState({
	});

	// Modal states
	const [isTherapistModalOpen, setIsTherapistModalOpen] = useState(false);
	const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
	const [isSupervisorModalOpen, setIsSupervisorModalOpen] = useState(false);

	// Fetch dummy data to populate the stats
	useLayoutEffect(() => {
		// Fetch the stats data from the backend
		console.log('Fetching stats');
		const fetchStats = async () => {
			try {
				console.log('Fetching stats');
				const response = await axios.get('http://localhost:5000/api/admin/stats');
				setStats(response.data.data);  // Store the 'data' object from the response
				// setLoading(false);
				console.log(stats);
			} catch (err) {
				console.error('Error fetching stats:', err);
				// setError('Error fetching stats');
				// setLoading(false);
			}
		};

		fetchStats();
	}, []);

	// Check if stats are loaded to prevent undefined errors
	if (!stats.therapists || !stats.patients || !stats.supervisors || !stats.sessions) {
		return <div>Loading...</div>;
	}

	// Therapist distribution data for pie chart
	const therapistData = [
		{ name: 'Available', value: stats.therapists-3 },
		{ name: 'Assigned', value: 3 }
	];

	const COLORS = ['#0088FE', '#00C49F'];

	// Session trends data for bar chart
	const sessionTrendsData = [
		{ month: 'Jan', sessions: 40 },
		{ month: 'Feb', sessions: 55 },
		{ month: 'Mar', sessions: 45 },
		{ month: 'Apr', sessions: 65 },
		{ month: 'May', sessions: 50 },
		{ month: 'Jun', sessions: 70 }
	];

	// Management Action Buttons
	// Management Action Buttons
	const ManagementActions = [
		{
			label: "Therapists",
			icon: UserPlus,
			color: "bg-blue-500",
			onClick: () => setIsTherapistModalOpen(true),
			stats: `${stats.therapists} Total`,
			weeklyStats: [
				{ label: "New Therapists", value: stats.therapists },
				{ label: "Training Hours", value: "24hrs" },
			]
		},
		{
			label: "Patients",
			icon: Users,
			color: "bg-green-500",
			onClick: () => setIsPatientModalOpen(true),
			stats: `${stats.patients} Active`,
			weeklyStats: [
				{ label: "New Admissions", value: stats.patientsCreatedToday },
				{ label: "Reassigned", value: stats.reassignedPatients },
			]
		},
		{
			label: "Supervisors",
			icon: UserCheck,
			color: "bg-purple-500",
			onClick: () => setIsSupervisorModalOpen(true),
			stats: `${stats.supervisors} Total`,
			weeklyStats: [
				{ label: "Reviews Completed", value: stats.reviewsCompleted ||0 },
				{ label: "Yet to review", value: 0 },
			]
		},
		{
			label: "Session",
			icon: ClipboardList,
			color: "bg-yellow-500",
			onClick: () => {/* Add session management logic */ },
			stats: `${stats.sessions} Scheduled`,
			weeklyStats: [
				{ label: "Sessions Booked", value: stats.sessions },
				{ label: "Cancelations", value: stats.cancelled || 0 },
			]
		}
	];

	return (
		<div>{stats !== null &&
			<div className="min-h-screen bg-gray-100 p-6">
				<div className="container mx-auto">
					<div className="flex justify-between items-center mb-8">
						<h1 className="text-3xl font-bold text-gray-800">Admin Management Dashboard</h1>
						<button
							className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
							onClick={() => window.location.reload()}
						>
							<RefreshCw className="mr-2 w-5 h-5" /> Refresh Data
						</button>
					</div>

					{/* Management Actions Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						{ManagementActions.map((action, index) => (
							<div
								key={index}
								className={`${action.color} text-white rounded-lg p-6 shadow-md hover:opacity-90 transition cursor-pointer`}

							>
								<div className="flex justify-between items-center">
									<div>
										<action.icon className="w-10 h-10 mb-4" />
										<h3 className="text-xl font-semibold">{action.label}</h3>
										<p className="text-sm opacity-75">{action.stats}</p>
										{/* Additional Stats */}
										<ul className="mt-2 text-sm opacity-75">
											{action.weeklyStats.map((stat, i) => (
												<li key={i}>
													<span className="font-semibold">{stat.label}: </span>
													{stat.value}
												</li>
											))}
										</ul>
									</div>
								</div>
								<button
									className="mt-4 bg-white text-gray-900 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition"
									onClick={() => { handleClick(action.label) }}


								>
									View Details
								</button>
							</div>
						))}


						{/* Data Visualization Section */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{/* Therapist Distribution Pie Chart */}
							<div className="bg-white rounded-lg shadow-md p-6 w-[740px]">
								<h2 className="text-xl font-bold mb-4 flex items-center">
									<PieChart className="mr-2" /> Therapist Distribution
								</h2>
								<div style={{ width: '100%', height: 350 }}>
									<ResponsiveContainer>
										<RechartPieChart>
											<Pie
												data={therapistData}
												cx="50%"
												cy="50%"
												labelLine={false}
												outerRadius={100}
												fill="#8884d8"
												dataKey="value"
											>
												{therapistData.map((entry, index) => (
													<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
												))}
											</Pie>
											<Tooltip />
											<Legend />
										</RechartPieChart>
									</ResponsiveContainer>
								</div>
							</div>

							{/* Session Trends Bar Chart */}
							<div className="bg-white rounded-lg shadow-md p-6 w-[740px] ml-[568px]">
								<h2 className="text-xl font-bold mb-4 flex items-center">
									<BarChart2 className="mr-2" /> Monthly Session Trends
								</h2>
								<div style={{ width: '100%', height: 350 }}>
									<ResponsiveContainer>
										<BarChart data={sessionTrendsData}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="month" />
											<YAxis />
											<Tooltip />
											<Legend />
											<Bar dataKey="sessions" fill="#8884d8" />
										</BarChart>
									</ResponsiveContainer>
								</div>
							</div>

							{/* Management Modals */}
							<ManagementModal
								isOpen={isTherapistModalOpen}
								onClose={() => setIsTherapistModalOpen(false)}
								title="Manage Therapists"
							>
								{/* Therapist Management Form/Content */}
								<div>
									<p>Add, edit, or remove therapists here.</p>
									{/* Add form fields, list of therapists, etc. */}
								</div>
							</ManagementModal>

							<ManagementModal
								isOpen={isPatientModalOpen}
								onClose={() => setIsPatientModalOpen(false)}
								title="Add Patients"
							>
								{/* Patient Management Form/Content */}
								<div>
									<p>Add, edit, or manage patient records here.</p>
									{/* Add form fields, list of patients, etc. */}
								</div>
							</ManagementModal>

							<ManagementModal
								isOpen={isSupervisorModalOpen}
								onClose={() => setIsSupervisorModalOpen(false)}
								title="Manage Supervisors"
							>
								{/* Supervisor Management Form/Content */}
								<div>
									<p>Add, edit, or manage supervisor roles here.</p>
									{/* Add form fields, list of supervisors, etc. */}
								</div>
							</ManagementModal>
						</div>
					</div>
				</div>
			</div>
	}
		</div>
	);
};


export default Home;
