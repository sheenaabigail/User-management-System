import React from 'react';

const HODDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">HOD Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Monitoring Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Monitoring</h2>
          <p className="text-gray-600">List of therapists and supervisors.</p>
        </div>
        
        {/* Performance Evaluation Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Performance Evaluation</h2>
          <p className="text-gray-600">Evaluate performance metrics here.</p>
        </div>
        
        {/* Feedback Section */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
          <p className="text-gray-600">Provide feedback to therapists and supervisors.</p>
        </div>
      </div>
    </div>
  );
}

export default HODDashboard;
