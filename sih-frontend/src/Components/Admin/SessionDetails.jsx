import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import {
	MicIcon,
	ClockIcon,
	UserIcon,
	FileTextIcon,
	CheckCircle2Icon,
	TrendingUpIcon,
	ChevronDownIcon,
	ChevronUpIcon
} from "lucide-react";

// Mock data for sessions
const sessionsData = [
	{
		id: 12,
		patientName: "John Doe",
		therapist: "Dr. Jane Smith",
		date: "2024-12-01",
		duration: "35 minutes",
		performanceData: {
			labels: ["Prosody", "Voice Quality", "Pitch/Loudness", "Rate/Fluency"],
			scores: [4, 3, 5, 4]
		},
		notes: "Significant progress in prosody and pitch control.",
		activities: [
			"Practice daily pitch control exercises",
			"Record and review speech",
			"Schedule follow-up session"
		]
	},
	{
		id: 11,
		patientName: "Emily Johnson",
		therapist: "Dr. Michael Brown",
		date: "2024-11-15",
		duration: "30 minutes",
		performanceData: {
			labels: ["Prosody", "Voice Quality", "Pitch/Loudness", "Rate/Fluency"],
			scores: [3, 4, 3, 5]
		},
		notes: "Improved fluency, working on voice modulation.",
		activities: [
			"Breathing exercises",
			"Articulation practice",
			"Vocal cord relaxation techniques"
		]
	},
	{
		id: 10,
		patientName: "Alex Rodriguez",
		therapist: "Dr. Sarah Lee",
		date: "2024-10-30",
		duration: "25 minutes",
		performanceData: {
			labels: ["Prosody", "Voice Quality", "Pitch/Loudness", "Rate/Fluency"],
			scores: [5, 3, 4, 4]
		},
		notes: "Consistent improvement in overall speech patterns.",
		activities: [
			"Advanced pitch control",
			"Complex sentence structure practice",
			"Confidence-building exercises"
		]
	}
];

function SessionDetails() {
	const [expandedSession, setExpandedSession] = useState(null);

	const renderDetailCard = (session) => {
		const performanceData = {
			labels: session.performanceData.labels,
			datasets: [
				{
					label: "Performance Rating",
					data: session.performanceData.scores,
					backgroundColor: [
						"rgba(96, 165, 250, 0.7)",
						"rgba(52, 211, 153, 0.7)",
						"rgba(249, 115, 22, 0.7)",
						"rgba(234, 88, 12, 0.7)"
					],
					borderRadius: 10,
				},
			],
		};

		const chartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					max: 5,
					min: 0,
					ticks: {
						stepSize: 1,
					},
					title: {
						display: true,
						text: 'Performance Level'
					}
				},
			},
			plugins: {
				legend: { display: false },
				title: {
					display: true,
					text: 'Performance Metrics',
				}
			}
		};

		return (
			<div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg w-full">
				<div className="flex justify-center gap-8">
					{/* Patient & Session Details */}
					<div className="bg-white p-4 rounded-xl shadow-md w-1/3">
						<div className="flex items-center mb-6">
							<UserIcon className="w-6 h-6 text-blue-600 mr-6" />
							<h2 className="text-lg font-semibold text-blue-800">Session Details</h2>
						</div>
						<div className="space-y-2">
							<div className="flex gap-10">
								<span className="font-medium w-40 text-blue-700">Patient</span>
								<span className="text-gray-700">{session.patientName}</span>
							</div>
							<div className="flex gap-10">
								<span className="font-medium w-40 text-blue-700">Therapist</span>
								<span className="text-gray-700">{session.therapist}</span>
							</div>
							<div className="flex gap-10">
								<span className="font-medium w-40 text-blue-700">Date</span>
								<span className="text-gray-700">{session.date}</span>
							</div>
							<div className="flex gap-10">
								<span className="font-medium w-40 text-blue-700">Duration</span>
								<span className="text-gray-700">{session.duration}</span>
							</div>
						</div>
					</div>

				</div>
			</div>
		);
	};

	return (
		<div className="bg-full min-h-screen p-8 w-auto w-full">
			<div className="mx-auto bg-white shadow-xl rounded-2xl overflow-hidden w-1000px">
				{/* Header */}
				<div className="bg-blue-600 text-white p-6 flex justify-between items-center">
					<div>
						<h1 className="text-2xl font-bold">Speech Therapy Session Tracker</h1>
						<p className="text-blue-100">Comprehensive Session History</p>
					</div>
				</div>

				{/* Sessions Table */}
				<div className="p-6">
					<table className="w-full border-collapse">
						<thead>
							<tr className="bg-blue-50 text-blue-800">
								<th className="p-3 text-left">Session </th>
								<th className="p-3 text-left">Patient Name</th>
								<th className="p-3 text-left">Date</th>
								<th className="p-3 text-left">Duration</th>
								<th className="p-3 text-left">Details</th>
							</tr>
						</thead>
						<tbody>
							{sessionsData.map((session) => (
								<React.Fragment key={session.id}>
									<tr
										className={`border-b hover:bg-blue-50 cursor-pointer ${expandedSession === session.id ? 'bg-blue-50' : ''
											}`}
										onClick={() =>
											setExpandedSession(expandedSession === session.id ? null : session.id)
										}
									>
										<td className="p-3">{session.id}</td>
										<td className="p-3">{session.patientName}</td>
										<td className="p-3">{session.date}</td>
										<td className="p-3">{session.duration}</td>
										<td className="p-3">
											{expandedSession === session.id ? (
												<span className="cursor-pointer text-blue-600 hover:underline">Show Less</span>
											) : (
												<span className="cursor-pointer text-blue-600 hover:underline">Show More</span>
											)}
										</td>
									</tr>
									{expandedSession === session.id && (
										<tr>
											<td colSpan="5" className="p-4">
												{renderDetailCard(session)}
											</td>
										</tr>
									)}
								</React.Fragment>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default SessionDetails;
