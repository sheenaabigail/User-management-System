import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ReactPaginate from 'react-paginate';
import { saveAs } from 'file-saver';

const AdvancedMonitoring = () => {
    const [sessions, setSessions] = useState([]);
    const [filteredSessions, setFilteredSessions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSession, setSelectedSession] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
		const [id, setId] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const sessionsPerPage = 5;

    // Colors for the pie chart
    const COLORS = ['#0088FE', '#FFBB28', '#FF8042', '#FF1234'];

    useEffect(() => {
        // Mock data for an entire week's worth of sessions
        const mockData = [
            {
                id: 1,
                role: 'Therapist',
                name: 'Sheena Abigail',
                sessionDate: '2024-12-07',
                status: 'Completed',
                feedback: 'Great session, on track.',
                evaluatedBySupervisor: true,
                feedbackHistory: ['Initial session feedback.'],
            },
            {
                id: 2,
                role: 'Supervisor',
                name: 'Tanushri',
                sessionDate: '2024-12-08',
                status: 'Pending',
                feedback: 'Needs more time for assessment.',
                evaluatedReports: 2,
                feedbackHistory: [],
            },
            {
                id: 3,
                role: 'Therapist',
                name: 'Sri Ram Kumar',
                sessionDate: '2024-12-09',
                status: 'Cancelled',
                feedback: 'Session was cancelled due to personal reasons.',
                evaluatedBySupervisor: false,
                feedbackHistory: [],
            },
            {
                id: 4,
                role: 'Supervisor',
                name: 'Arivarasan',
                sessionDate: '2024-12-10',
                status: 'Completed',
                feedback: 'Good progress, session successful.',
                evaluatedReports: 1,
                feedbackHistory: ['First feedback.'],
            },
            {
                id: 5,
                role: 'Therapist',
                name: 'Bhuvanesh',
                sessionDate: '2024-12-11',
                status: 'Pending',
                feedback: 'Waiting for supervisor review.',
                evaluatedBySupervisor: false,
                feedbackHistory: [],
            },
            {
                id: 6,
                role: 'Supervisor',
                name: 'Ramesh',
                sessionDate: '2024-12-12',
                status: 'Completed',
                feedback: 'Session successful, progress noted.',
                evaluatedReports: 3,
                feedbackHistory: ['Review done.'],
            },
            {
                id: 7,
                role: 'Therapist',
                name: 'Suresh',
                sessionDate: '2024-12-13',
                status: 'Completed',
                feedback: 'Excellent session.',
                evaluatedBySupervisor: true,
                feedbackHistory: [],
            },
        ];
        setSessions(mockData);
        setFilteredSessions(mockData);
    }, []);

    useEffect(() => {
        let filtered = [...sessions];

        // Apply all filters
        if (roleFilter) {
            filtered = filtered.filter(
                (session) => session.role.toLowerCase() === roleFilter.toLowerCase()
            );
        }
        if (statusFilter) {
            filtered = filtered.filter(
                (session) => session.status.toLowerCase() === statusFilter.toLowerCase()
            );
        }
        if (dateRange.start) {
            filtered = filtered.filter(
                (session) => new Date(session.sessionDate) >= new Date(dateRange.start)
            );
        }
        if (dateRange.end) {
            filtered = filtered.filter(
                (session) => new Date(session.sessionDate) <= new Date(dateRange.end)
            );
        }
        if (searchTerm) {
            filtered = filtered.filter(
                (session) =>
                    session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    session.role.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredSessions(filtered);
        setCurrentPage(0);
    }, [roleFilter, statusFilter, dateRange, searchTerm, sessions]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSessionClick = (session) => {
        setSelectedSession(session);
        setFeedback(session.feedback);
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSaveFeedback = () => {
        if (selectedSession) {
            const updatedSessions = sessions.map((session) =>
                session.id === selectedSession.id
                    ? {
                        ...session,
                        feedback,
                        feedbackHistory: session.feedbackHistory
                            ? [...session.feedbackHistory, feedback]
                            : [feedback],
                    }
                    : session
            );
            setSessions(updatedSessions);
            setSelectedSession({ ...selectedSession, feedback });
            alert('Feedback saved successfully!');
        }
    };

    const pageCount = Math.ceil(filteredSessions.length / sessionsPerPage);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    const offset = currentPage * sessionsPerPage;
    const currentSessions = filteredSessions.slice(offset, offset + sessionsPerPage);

    const totalSessions = filteredSessions.length;
    const completedSessions = filteredSessions.filter((s) => s.status === 'Completed').length;
    const pendingSessions = filteredSessions.filter((s) => s.status === 'Pending').length;
    const cancelledSessions = filteredSessions.filter((s) => s.status === 'Cancelled').length;

    const supervisorReportsEvaluated = filteredSessions
        .filter((session) => session.role === 'Supervisor' && session.evaluatedReports)
        .reduce((total, session) => total + session.evaluatedReports, 0);

    const pieData = [
        { name: 'Completed', value: completedSessions },
        { name: 'Pending', value: pendingSessions },
        { name: 'Cancelled', value: cancelledSessions },
    ];

    if (roleFilter === 'Supervisor') {
        pieData.push({ name: 'Reports Evaluated', value: supervisorReportsEvaluated });
    }

    const exportToCSV = () => {
        const headers = ['ID', 'Role', 'Name', 'Session Date', 'Status', 'Feedback'];
        const rows = sessions.map((s) => [
            s.id,
            s.role,
            s.name,
            s.sessionDate,
            s.status,
            `"${s.feedback.replace(/"/g, '""')}"`,
        ]);

        let csvContent =
            'data:text/csv;charset=utf-8,' +
            [headers, ...rows].map((e) => e.join(',')).join('\n');

        const encodedUri = encodeURI(csvContent);
        saveAs(encodedUri, 'sessions.csv');
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-extrabold text-indigo-600 mb-6">HOD Dashboard - Clinical Monitoring</h2>

            {/* Filters Section */}
            <div className="bg-white p-4 mb-6 shadow rounded-lg">
                <div className="flex flex-wrap gap-4">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search by name or role"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="p-2 border border-gray-300 rounded-md w-full sm:w-64"
                    />
                    {/* Role Filter */}
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md w-full sm:w-64"
                    >
                        <option value="">Filter by Role</option>
                        <option value="Therapist">Therapist</option>
                        <option value="Supervisor">Supervisor</option>
                    </select>
                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md w-full sm:w-64"
                    >
                        <option value="">Filter by Status</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    {/* Date Range Filter */}
                    <div className="flex gap-4 w-full sm:w-128">
                        <input
                            type="date"
                            value={dateRange.start}
                            onChange={(e) =>
                                setDateRange((prev) => ({ ...prev, start: e.target.value }))
                            }
                            className="p-2 border border-gray-300 rounded-md w-full"
                        />
                        <input
                            type="date"
                            value={dateRange.end}
                            onChange={(e) =>
                                setDateRange((prev) => ({ ...prev, end: e.target.value }))
                            }
                            className="p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Summary Statistics & Pie Chart Side-by-Side */}
            <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Total Sessions Overview */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700">Total Sessions</h3>
                    <p className="text-3xl font-bold text-indigo-600">{totalSessions}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                        {/* Completed Sessions */}
                        <div className="bg-gray-100 p-4 shadow rounded-lg">
                            <h4 className="text-md font-medium text-gray-600">Completed</h4>
                            <p className="text-xl font-bold text-green-600">{completedSessions}</p>
                        </div>

                        {/* Pending Sessions */}
                        <div className="bg-gray-100 p-4 shadow rounded-lg">
                            <h4 className="text-md font-medium text-gray-600">Pending</h4>
                            <p className="text-xl font-bold text-yellow-600">{pendingSessions}</p>
                        </div>

                        {/* Cancelled Sessions */}
                        <div className="bg-gray-100 p-4 shadow rounded-lg">
                            <h4 className="text-md font-medium text-gray-600">Cancelled</h4>
                            <p className="text-xl font-bold text-red-600">{cancelledSessions}</p>
                        </div>
                    </div>
                </div>

                {/* Pie Chart Section */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Session Status Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                label
                                labelLine={false}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>



            <div className="flex flex-column gap-4 bg-white shadow-lg rounded-lg overflow-x-auto p-5 transition-all ease-in-out duration-300">
                {/* Table Section */}
                <div className={`w-full ${selectedSession?"lg:w-1/2":""} bg-white shadow-lg rounded-lg overflow-x-auto transition-all ease-in-out duration-300`}>
                    <table className="min-w-full table-auto border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-indigo-600 text-white">
                                <th className="px-6 py-3 text-left font-semibold cursor-pointer">Session ID</th>
                                <th className="px-6 py-3 text-left font-semibold cursor-pointer">Name</th>
                                <th className="px-6 py-3 text-left font-semibold cursor-pointer">Role</th>
                                <th className="px-6 py-3 text-left font-semibold cursor-pointer">Session Date</th>
                                <th className="px-6 py-3 text-left font-semibold cursor-pointer">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentSessions.map((session) => (
                                <tr
                                    key={session.id}
                                    className={` transition duration-200 border-b cursor-pointer ${id === session.id ? 'bg-green-300 w-[1000px]' : 'hover:bg-gray-100'}`}
                                    onClick={() => {handleSessionClick(session); setId(session.id);} }
                                >
                                    <td className="px-6 py-3">{session.id}</td>
                                    <td className="px-6 py-3">{session.name}</td>
                                    <td className="px-6 py-3">{session.role}</td>
                                    <td className="px-6 py-3">{session.sessionDate}</td>
                                    <td
                                        className={`px-6 py-3 ${session.status === 'Completed'
                                            ? 'text-green-600'
                                            : session.status === 'Pending'
                                                ? 'text-yellow-600'
                                                : 'text-red-600'
                                            }`}
                                    >
                                        {session.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Session Details & Feedback Form */}
                {selectedSession && (
                    <div className="w-full lg:w-1/2 bg-white shadow-lg  rounded-lg p-6">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Session Details</h3>
                        <p className="text-gray-700"><strong>Role:</strong> {selectedSession.role}</p>
                        <p className="text-gray-700"><strong>Name:</strong> {selectedSession.name}</p>
                        <p className="text-gray-700"><strong>Session Date:</strong> {selectedSession.sessionDate}</p>
                        <p className={`text-gray-700 ${selectedSession.status === 'Cancelled' ? 'text-red-500' : ''}`}>
                            <strong>Status:</strong> {selectedSession.status}
                        </p>

                        {/* Feedback Form */}
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2 mt-6">Provide Feedback</h3>
                        <textarea
                            className="w-full p-4 border border-gray-300 rounded-md"
                            value={feedback}
                            onChange={handleFeedbackChange}
                            placeholder="Enter feedback for the session..."
                            rows="4"
                        ></textarea>
                        <button
                            onClick={handleSaveFeedback}
                            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                        >
                            Save Feedback
                        </button>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="mt-6">
                <ReactPaginate
                    pageCount={pageCount}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName="pagination flex justify-center space-x-4"
                    previousLabel={
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
                            Prev
                        </button>
                    }
                    nextLabel={
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
                            Next
                        </button>
                    }
                    activeClassName="active"
                    breakLabel={<span className="text-gray-500">...</span>}
                    pageClassName="px-4 py-2 border border-gray-300 rounded-lg text-indigo-600 hover:bg-indigo-100 transition duration-200"
                    previousClassName="disabled:opacity-50"
                    nextClassName="disabled:opacity-50"
                    disabledClassName="opacity-50 cursor-not-allowed"
                />
            </div>


            {/* Export Button */}
            <div className="mt-6 text-right">
                <button
                    onClick={exportToCSV}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                >
                    Export to CSV
                </button>
            </div>
        </div>
    );
};

export default AdvancedMonitoring;
