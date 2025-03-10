import React, { useState, useEffect } from "react";
import axios from "axios";

const Requests = ({ supervisorId }) => {
  const [therapistList, setTherapistList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sessions/therapistsRequests?supervisorId=${supervisorId}`
        );
        console.log(response.data);
        setTherapistList(response.data);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTherapists();
  }, [supervisorId]);

  const handleAccept = async (requestId,supervisorId,therapistId) => {
    try {
      console.log(requestId);
      console.log(supervisorId);
      console.log(therapistId)
      const response = await axios.put(
        "http://localhost:5000/api/sessions/assignmentRequest/accept",
        { requestId,supervisorId,therapistId }
      );
      console.log(response.data);
      setTherapistList((prevState) =>
        prevState.filter((therapist) => therapist._id !== requestId)
      );
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleReject = async (requestId, supervisorId,therapistId) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/sessions/assignmentRequest/reject",
        { requestId, supervisorId, therapistId }
      );
      console.log(response.data);
      setTherapistList((prevState) =>
        prevState.filter((therapist) => therapist._id !== requestId)
      );
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="w-full h-full p-10">
      <div className="flex justify-center items-center h-full">
        {loading ? (
          <div className="text-2xl">Loading...</div>
        ) : (
          <div className="w-full">
            <h1 className="text-2xl font-bold text-center mb-14">
              Therapist Requests
            </h1>
							{therapistList.length !== 0 ? (
            <div className="flex flex-col gap-4">
              {therapistList.map((request) => (
                <div
                  key={request._id}
                  className="flex justify-between items-center border border-gray-300 p-6 rounded-md m-4"
                >
                  <div>
                    <h2 className="text-lg font-bold mb-2">
                      {request.message}
                    </h2>
                    <p>{request.therapistId.email}</p>
                  </div>
                  <div>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md m-4 hover:scale-105 ease-in-out duration-100"
                      onClick={() => handleAccept(request._id,supervisorId,request.therapistId._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md m-4 hover:scale-105 ease-in-out duration-100"
                      onClick={() => handleReject(request._id,supervisorId,request.therapistId._id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
						) : (
							<div className="text-2xl text-center">No requests</div>
						)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
