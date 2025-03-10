import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Info, Search, Filter, RefreshCw } from 'lucide-react';
// Expanded Mock Data Structure 
const therapyCases = [
  {
    id: 1,
    patientName: "Sheena Abigail",
    condition: "Aphasia",
    therapist: "Emily Davis",
    status: "In Progress",
    sessionCount: 12,
    age: 20,
    gender: "FeMale",
    referralSource: "Neurologist",
    progressPercentage: 65,
    progressReports: [
      {
        id: 101,
        date: "2024-06-15",
        therapistNotes: "Patient shows improvement in verbal comprehension.",
        therapistGoals: "Enhance sentence construction skills",
        supervisorFeedback: null
      },
      {
        id: 102,
        date: "2024-06-30",
        therapistNotes: "Working on complex communication strategies.",
        therapistGoals: "Improve pragmatic language skills",
        supervisorFeedback: null
      }
    ]
  },
  {
    id: 2,
    patientName: "Tanushri",
    condition: "Stuttering",
    therapist: "Michael Brown",
    status: "Evaluation",
    sessionCount: 8,
    age: 22,
    gender: "Female",
    referralSource: "School Counselor",
    progressPercentage: 40,
    progressReports: [
      {
        id: 201,
        date: "2024-06-20",
        therapistNotes: "Implementing fluency shaping techniques.",
        therapistGoals: "Reduce speech block frequency",
        supervisorFeedback: null
      }
    ]
  },
  {
    id: 3,
    patientName: "Sri Ram Kumar",
    condition: "Voice Disorder",
    therapist: "Lisa Chen",
    status: "In Progress",
    sessionCount: 15,
    age: 35,
    gender: "Male",
    referralSource: "ENT Specialist",
    progressPercentage: 75,
    progressReports: [
      {
        id: 301,
        date: "2024-06-10",
        therapistNotes: "Vocal cord rehabilitation exercises showing promise.",
        therapistGoals: "Restore vocal cord functionality",
        supervisorFeedback: null
      },
      {
        id: 302,
        date: "2024-06-25",
        therapistNotes: "Patient demonstrating improved vocal control.",
        therapistGoals: "Maintain consistent voice projection",
        supervisorFeedback: null
      }
    ]
  },
  {
    id: 4,
    patientName: "Arivarasan",
    condition: "Cognitive Communication Disorder",
    therapist: "Robert Kim",
    status: "Evaluation",
    sessionCount: 5,
    age: 62,
    gender: "Female",
    referralSource: "Geriatric Clinic",
    progressPercentage: 30,
    progressReports: [
      {
        id: 401,
        date: "2024-06-18",
        therapistNotes: "Initial cognitive assessment completed.",
        therapistGoals: "Develop personalized cognitive communication strategies",
        supervisorFeedback: null
      }
    ]
  }
];

const therapistPerformanceData = [
  {
    name: 'Communication Skills',
    rating: 4.5,
    fullMark: 5,
    description: "Ability to effectively communicate with patients and colleagues"
  },
  {
    name: 'Patient Management',
    rating: 4.2,
    fullMark: 5,
    description: "Handling patient care, empathy, and individualized approach"
  },
  {
    name: 'Documentation',
    rating: 3.8,
    fullMark: 5,
    description: "Accuracy and completeness of clinical documentation"
  },
  {
    name: 'Treatment Planning',
    rating: 4.0,
    fullMark: 5,
    description: "Developing comprehensive and effective treatment strategies"
  }
];

function PatientDetails() {
  const [activeTab, setActiveTab] = useState('cases');
  const [selectedCase, setSelectedCase] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [filteredCases, setFilteredCases] = useState(therapyCases);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Search and Filter Function
  useEffect(() => {
    let result = therapyCases;

    // Search Filter
    if (searchTerm) {
      result = result.filter(
        caseItem =>
          caseItem.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          caseItem.condition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status Filter
    if (statusFilter !== 'All') {
      result = result.filter(caseItem => caseItem.status === statusFilter);
    }

    setFilteredCases(result);
  }, [searchTerm, statusFilter]);

  const handleReviewReport = (caseItem) => {
    setSelectedCase(caseItem);
    setFeedbackText('');
  };

  const handleFeedbackSubmit = () => {
    if (selectedCase && feedbackText.trim()) {
      alert('Feedback submitted successfully!');

      const updatedCase = {
        ...selectedCase,
        progressReports: selectedCase.progressReports.map(report => ({
          ...report,
          supervisorFeedback: feedbackText
        }))
      };

      setSelectedCase(null);
    } else {
      alert('Please provide feedback before submitting.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 max-w-6xl mx-auto">
      {/* Header */}
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Clinical Supervision Dashboard</h1>
          <p className="text-gray-600">Monitor therapy cases and therapist performance</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition"
            title="Refresh Dashboard"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setActiveTab('cases')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${activeTab === 'cases'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
        >
          <span>Therapy Cases</span>
        </button>
        <button
          onClick={() => setActiveTab('therapists')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${activeTab === 'therapists'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
        >
          {/* <span>Therapist Performance</span> */}
        </button>
      </div>

      {/* Therapy Cases Tab */}
      {activeTab === 'cases' && (
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Search and Filter Section */}
          <div className="mb-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              </div>
              <select
                className="px-4 py-2 border rounded-lg"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="In Progress">In Progress</option>
                <option value="Evaluation">Evaluation</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Info size={16} />
              <span className="text-sm">Click 'Review' to view case details</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border-b bg-blue-100">Patient Name</th>
                  <th className="p-3 border-b">Condition</th>
                  <th className="p-3 border-b">Therapist</th>
                  <th className="p-3 border-b">Sessions</th>
                  <th className="p-3 border-b">Progress</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseItem) => (
                  <tr key={caseItem.id} className="hover:bg-gray-50 transition">
                    <td className="p-3 border-b bg-violet-50">{caseItem.patientName}</td>
                    <td className="p-3 border-b">{caseItem.condition}</td>
                    <td className="p-3 border-b">{caseItem.therapist}</td>
                    <td className="p-3 border-b">{caseItem.sessionCount}</td>
                    <td className="p-3 border-b">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{width: `${caseItem.progressPercentage}%`}}
                        ></div>
                      </div>
                    </td>
                    <td className="p-3 border-b">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        caseItem.status === 'In Progress' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="p-3 border-b">
                      <button 
                        onClick={() => handleReviewReport(caseItem)} 
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        </div>
  )
}

{/* Therapist Performance Tab */ }
{
  activeTab === 'therapists' && (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Therapist Performance Radar</h2>
      <RadarChart
        width={500}
        height={400}
        data={therapistPerformanceData}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis angle={30} domain={[0, 5]} />
        <Radar
          name="Therapist Rating"
          dataKey="rating"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
      <ul className="mt-4 text-sm text-gray-600 space-y-2">
        {therapistPerformanceData.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="font-semibold text-gray-800">{item.name}:</span>
            <span>{item.description}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

{/* Feedback Modal */ }
{
  selectedCase && (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-3/4 max-w-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Case Feedback: {selectedCase.patientName}</h3>
        <div className="mb-4">
          <h4 className="text-gray-600 text-sm mb-2">Progress Reports:</h4>
          <ul className="text-sm text-gray-800 space-y-2">
            {selectedCase.progressReports.map((report) => (
              <li key={report.id} className="p-2 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{report.date}</span>
                  <span className="text-xs italic text-gray-500">{report.therapistGoals}</span>
                </div>
                <p className="text-gray-700 mt-1">{report.therapistNotes}</p>
              </li>
            ))}
          </ul>
        </div>
        <textarea
          rows="4"
          placeholder="Enter your feedback here..."
          className="w-full p-2 border rounded-lg mb-4"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setSelectedCase(null)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleFeedbackSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  )
}
    </div >
  );
}

export default PatientDetails;
