import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Supervisor = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching supervisor data from the backend
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/supervisor/all');
        setSupervisors(response.data); // Assuming the response contains the list of supervisors
        setLoading(false);
      } catch (err) {
        setError('Error fetching supervisors');
        setLoading(false);
      }
    };

    fetchSupervisors();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl">
        {loading ? (
          <div className="text-xl font-semibold text-gray-700">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          supervisors.map((supervisor) => (
            <div
              key={supervisor._id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4"
            >
              <div className="text-lg font-semibold text-indigo-600">{supervisor.name}</div>
              <div className="text-sm text-gray-500">{supervisor.email}</div>
              <div className="flex justify-center items-center space-x-2">
                <button className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition">
                  View Profile
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Supervisor;
