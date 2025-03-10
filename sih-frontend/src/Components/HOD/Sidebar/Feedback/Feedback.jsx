import React from 'react';

const Feedback = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-extrabold text-indigo-600 mb-6">Feedback</h2>
            <p className="text-gray-700 mb-8">Provide feedback to therapists and supervisors in an easy and structured way.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Feedback Form */}
                <div className="bg-white p-6 shadow-lg rounded-lg transition duration-300 hover:shadow-2xl">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Provide Feedback</h3>
                    <form>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Select Therapist</label>
                        <select className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 mb-6">
                            <option value="therapist1">John Doe</option>
                            <option value="therapist2">Jane Smith</option>
                            {/* Add more therapists */}
                        </select>

                        <label className="block text-lg font-medium text-gray-700 mb-2">Feedback</label>
                        <textarea
                            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
                            rows="4"
                            placeholder="Provide your feedback here..."
                        ></textarea>

                        <button
                            type="submit"
                            className="mt-6 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 w-full"
                        >
                            Submit Feedback
                        </button>
                    </form>
                </div>

                {/* Recent Feedback */}
                <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Recent Feedback</h3>
                    <div className="bg-white p-6 shadow-lg rounded-lg transition duration-300 hover:shadow-2xl mb-4">
                        <p className="font-bold text-indigo-600 mb-2">To: John Doe</p>
                        <p className="text-gray-700 mb-4">"Great job maintaining consistency in your sessions. Keep it up!"</p>
                        <p className="text-sm text-gray-500">Submitted on: 2024-12-10</p>
                    </div>
                    {/* Add more feedback blocks */}
                </div>
            </div>
        </div>
    );
};

export default Feedback;
