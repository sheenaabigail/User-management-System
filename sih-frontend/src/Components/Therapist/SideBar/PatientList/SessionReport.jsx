import { useState } from "react";
import { Button } from "@/Components/ui/Button";

function SessionReport() {
  // States for goals, activities, and observations
  const [goals, setGoals] = useState("");
  const [activities, setActivities] = useState("");
  const [observations, setObservations] = useState("");
  
  // State to manage the session records (goal, activity, observation)
  const [sessionData, setSessionData] = useState([]);

  // Handle adding new row to the table
  const addRow = () => {
    if (goals && activities && observations) {
      const newRow = { goals, activities, observations };
      setSessionData([...sessionData, newRow]);
      setGoals("");
      setActivities("");
      setObservations("");
    } else {
      alert("Please fill in all fields before adding a row.");
    }
  };

  // Render Table
  const renderTable = () => {
    return (
      <table className="w-full table-auto border-collapse mt-4">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Goals</th>
            <th className="px-4 py-2 text-left">Activities</th>
            <th className="px-4 py-2 text-left">Observations</th>
          </tr>
        </thead>
        <tbody>
          {sessionData.map((row, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{row.goals}</td>
              <td className="px-4 py-2">{row.activities}</td>
              <td className="px-4 py-2">{row.observations}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Session Report</h2>
      
      {/* Form Inputs */}
      <div className="mt-4">
        <div className="mb-2">
          <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
            Goals
          </label>
          <input
            type="text"
            id="goals"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="Enter goals for the session"
            className="mt-2 p-2 border rounded-md w-full"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="activities" className="block text-sm font-medium text-gray-700">
            Activities
          </label>
          <input
            type="text"
            id="activities"
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
            placeholder="Enter activities for the session"
            className="mt-2 p-2 border rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="observations" className="block text-sm font-medium text-gray-700">
            Observations
          </label>
          <input
            type="text"
            id="observations"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            placeholder="Enter observations for the session"
            className="mt-2 p-2 border rounded-md w-full"
          />
        </div>

        {/* Button to Add Row */}
        <Button onClick={addRow} variant="outline">Add to Report</Button>
      </div>

      {/* Display the Session Report Table */}
      {renderTable()}
    </div>
  );
}

export default SessionReport;
