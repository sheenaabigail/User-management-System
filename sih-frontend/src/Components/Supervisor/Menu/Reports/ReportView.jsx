import React, { useState } from "react";
import PropTypes from 'prop-types'; // Add PropTypes import
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/Button";
import { Card, CardHeader, CardContent, CardFooter } from "@/Components/ui/card";

// Removed TypeScript interface, will use PropTypes instead
const ReportView = () => {
	// State to manage the modal's open/closed status
	const [isModalOpen, setModalOpen] = useState(false);

	// State to store the generated summary
	const [summary, setSummary] = useState("");

	// Function to toggle the modal's visibility
	const toggleModal = () => setModalOpen(!isModalOpen);

	// Function to generate a summary of the report
	const handleSummarize = () => {
		// In a real application, this would involve more complex summarization logic
		setSummary(
			"Comprehensive analysis of patient progress, highlighting key therapeutic insights and recommendations."
		);
		toggleModal(); // Open the modal after generating summary
	};



	async function getFile() {
		const fileId = document.getElementById('fileId').value;
		if (!fileId) {
			alert('Please enter a file ID');
			return;
		}

		try {
			const response = await fetch(`http://localhost:5000/api/file/${fileId}`);

			if (!response.ok) {
				alert('File not found or error occurred!');
				return;
			}

			const contentType = response.headers.get('Content-Type');

			if (contentType.includes('video')) {
				// If the file is a video, embed it in a video player
				const videoElement = document.createElement('video');
				videoElement.controls = true;
				videoElement.src = URL.createObjectURL(await response.blob());
				document.getElementById('fileViewer').innerHTML = '';
				document.getElementById('fileViewer').appendChild(videoElement);
			} else if (contentType.includes('pdf')) {
				// If the file is a PDF, display it
				const iframe = document.createElement('iframe');
				iframe.src = URL.createObjectURL(await response.blob());
				iframe.width = '100%';
				iframe.height = '500px';
				document.getElementById('fileViewer').innerHTML = '';
				document.getElementById('fileViewer').appendChild(iframe);
			} else {
				alert('Unsupported file type');
			}
		} catch (error) {
			console.error('Error fetching file:', error);
			alert('Error fetching file');
		}
	}

	// Dummy data for demonstration (in a real app, this would come from an API or state management)
	const currentReport = {
		patientName: "John Doe",
		therapistName: "Jane Smith",
		supervisorName: "Dr. Alex Lee",
		status: "Completed",
		mainContent: {
			subheading1: "Initial assessment and treatment plan",
			subheading2: "Progress and therapeutic interventions"
		}
	};

	// Sample past reports for demonstration
	const pastReports = [
		{ id: 1, title: "Quarterly Review", summary: "Comprehensive patient progress report" },
		{ id: 2, title: "Mid-Year Assessment", summary: "Evaluation of treatment effectiveness" },
		{ id: 3, title: "Annual Report", summary: "Comprehensive yearly patient overview" },
		{ id: 4, title: "Follow-up Report", summary: "Continued treatment analysis" }
	];

	return (
		<div className="container mx-auto p-4">
			{/* Grid layout for report sections */}
			<div className="grid grid-cols-2 grid-rows-2 gap-4">
				{/* Report Details Card */}
				<Card className="col-span-1 bg-white rounded-lg shadow-md">
					<CardHeader>
						<h3 className="text-lg font-semibold text-gray-800">Report Details</h3>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<p><strong>Patient:</strong> {currentReport.patientName}</p>
							<p><strong>Therapist:</strong> {currentReport.therapistName}</p>
							<p><strong>Supervisor:</strong> {currentReport.supervisorName}</p>
							<p>
								<strong>Status:</strong>{" "}
								<span className="inline-block px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
									{currentReport.status}
								</span>
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Main Report Card */}

				<div className="col-span-1 row-span-2 bg-white rounded-lg shadow-md p-6 flex flex-col items-center space-y-4">
					<h2 className="text-lg font-semibold text-gray-700">Retrieve File</h2>
					<input
						type="text"
						id="fileId"
						placeholder="Enter File ID to Retrieve"
						className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
					<button
						onClick={() => getFile()}
						className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
					>
						Get File
					</button>
					<div
						id="fileViewer"
						className="w-full mt-4 p-4 bg-gray-100 rounded-md border border-gray-300 text-gray-600 text-center"
					>
						&lt;!-- File will be displayed here --&gt;
					</div>
				</div>


				{/* Past Reports Card */}
				<Card className="col-span-1 bg-white rounded-lg shadow-md overflow-y-auto max-h-64">
					<CardHeader>
						<h3 className="text-lg font-semibold text-gray-800">Past Reports</h3>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							{pastReports.map((report) => (
								<div key={report.id} className="border p-3 rounded-lg shadow-sm">
									<h4 className="font-medium text-gray-700">{report.title}</h4>
									<p className="text-gray-600">{report.summary}</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

// Optional: Add PropTypes for type checking
ReportView.propTypes = {
	// If you receive any props, define their types here
	currentReport: PropTypes.shape({
		patientName: PropTypes.string,
		therapistName: PropTypes.string,
		supervisorName: PropTypes.string,
		status: PropTypes.string,
		mainContent: PropTypes.shape({
			subheading1: PropTypes.string,
			subheading2: PropTypes.string
		})
	})
};

export default ReportView;
