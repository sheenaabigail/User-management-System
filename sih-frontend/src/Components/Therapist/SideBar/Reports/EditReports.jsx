import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/Button";
import {
	ResizablePanelGroup,
	ResizablePanel,
	ResizableHandle,
} from "@/Components/ui/resizable";
import { IoIosArrowBack } from "react-icons/io";
import ReportForm from "./ReportForm";
import axios from "axios";

function EditReports({ setSidebarOpen }) {
	const inputRef = useRef(null);

	const [chatOpen, setChatOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const location = useLocation();
	const report = location.state?.report;

	// Conditionally render ReportForm
	const renderReportForm = () => {
		return report ? (
		  <ReportForm
			title={report.title}
			description={report.description}
			notes={report.notes}
			// onSubmit={handleGeneratePDF}
		  />
		) : (
		  <ReportForm
			title="Report 1"
			description="description of the report/content"
			notes="notes about report"
			// onSubmit={handleGeneratePDF}
		  />
		);
	  };
	

	const [showNotes, setShowNotes] = useState(true);

	const hardcodedNotes = `
    - Session 1: Discussed preliminary findings.
    - Session 2: Reviewed progress and addressed concerns.
    - Session 3: Concluded with recommendations.
  `;


	const sendMessage = async () => {
		if (input.trim() !== "") {
			// Add user's message to the chat immediately
			setMessages([...messages, { sender: "user", text: input }]);
			setIsLoading(true);

			let result = "Error generating response"; // Default message if something goes wrong
			let data = { query: input+" in speech therapy" };

			try {
				const response = await axios.post("http://localhost:8000/generate-response", data, {
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json",
						"Origin": "http://localhost:5173",
					},
				});

				// Use the response data to update the result
				result = response.data.response || "Error generating response";
			} catch (error) {
				console.error(error);
				result = "Error connecting to the server";
			}

			// Clear the input field
			setInput("");

			// Update the messages after the API response is received
			setMessages((prevMessages) => [
				...prevMessages,
				{ sender: "bot", text: result },
			]);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!isLoading && chatOpen) {
			inputRef.current?.focus();
		}
	}, [isLoading, chatOpen]);

	const handleFormSubmit = async (formData) => {
		try {
			const response = await axios.post("http://localhost:8000/reports/generate-report/", formData, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				responseType: "blob", // To handle the PDF response
			});
	
			// Create a Blob from the PDF response
			const pdfBlob = new Blob([response.data], { type: "application/pdf" });
	
			// Download the PDF
			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(pdfBlob);
			link.download = "therapy_report.pdf";
			link.click();
		} catch (error) {
			console.error("Error generating report:", error);
		}
	};
	


	return (
		<div className="h-screen flex flex-col md:flex-row bg-gray-100">
		  <ResizablePanelGroup direction="horizontal" className="h-full flex-1 p-6">
			{/* Conditionally Render Session Notes Panel */}
			{showNotes && (
			  <ResizablePanel
				defaultSize={33}
				minSize={20}
				maxSize={50}
				className="p-4 bg-white border-r border-gray-300 shadow-lg rounded-lg"
			  >
				<Card className="h-full flex flex-col border-none shadow-md rounded-lg">
				  <CardHeader className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 to-violet-400 text-white rounded-t-lg">
					<CardTitle className="text-lg font-semibold">Session Notes</CardTitle>
					<Button
					  onClick={() => setShowNotes(false)}
					  variant="ghost"
					  size="sm"
					  className="text-white hover:bg-gray-200 rounded-full"
					>
					  <IoIosArrowBack />
					</Button>
				  </CardHeader>
	
				  <CardContent className="text-gray-700 p-4 whitespace-pre-wrap">
					{hardcodedNotes}
				  </CardContent>
				</Card>
			  </ResizablePanel>
			)}
	
			{/* Handle for resizing */}
			{showNotes && (
			  <ResizableHandle className="bg-gray-300 w-1 cursor-col-resize" />
			)}
	
			{/* Report Description Panel */}
			<ResizablePanel
			  defaultSize={showNotes ? 67 : 100}
			  minSize={50}
			  maxSize={100}
			  className="p-4"
			>
			  <Card className="h-full flex flex-col border rounded-lg shadow-lg">
				{/* Render the Report Form */}
				<CardContent className="flex-1 overflow-y-auto text-gray-700 p-4">
				  {renderReportForm()}
				</CardContent>
			  </Card>
			</ResizablePanel>
		  </ResizablePanelGroup>
	
		  {/* Chat UI Section */}
		  <div className="transition-all duration-300 ease-in-out ">
				{chatOpen ? (
					<div className="w-96 h-full relative bg-gray-200 text-white flex border-gray-400 border flex-col pt-10 shadow-xl rounded-md animate-slide-in">
						<button
							className=" bg-red-600 shadow-xl rounded-sm h-8 w-8 fixed top-0 right-0  transition-all duration-300"
							onClick={() => setChatOpen(false)}
						>
							X
						</button>

						<div className="flex-1 overflow-y-auto p-4 space-y-2">
							{messages.map((message, index) => (
								<div
									key={index}
									className={`p-2 rounded-md ${message.sender === "user"
										? "bg-green-500 text-right"
										: "bg-gray-600 text-left"
										}`}
								>
									{message.text}
								</div>
							))}
							{isLoading && (
								<div className="text-center text-gray-400 animate-pulse">
									<span>Generating response...</span>
								</div>
							)}
						</div>

						<div className="p-2 flex items-center gap-2">
							<input
								ref={inputRef}
								type="text"
								className="flex-1 p-2 bg-white text-gray-600 rounded-md border  focus:outline-none focus:ring focus:ring-white"
								placeholder="Type a message..."
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && !isLoading && sendMessage()}
								disabled={isLoading}
								autoFocus={!isLoading}
							/>
							<button
								className={`px-4 py-2 rounded-md transition-all duration-300 ${isLoading
									? "bg-gray-500 cursor-not-allowed"
									: "bg-green-500 hover:bg-green-600"
									}`}
								onClick={sendMessage}
								disabled={isLoading}
							>
								Send
							</button>
						</div>
					</div>
				) : (
					<button
						className="fixed bottom-2 right-2 bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-700 transition-all duration-30000 "
						onClick={() => { setChatOpen(true); setSidebarOpen(false) }}
					>
						<MessageCircle size={24} />
					</button>
				)}
			</div>




		</div>

	);
}

export default EditReports;
