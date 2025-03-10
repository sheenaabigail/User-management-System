import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
function SupervisorDetails({ therapistId }) {
  const [supervisorId, setSupervisorId] = useState(null);
  const [therapist, setTherapist] = useState(null);
  const [supervisor, setSupervisor] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sessions/therapist/${therapistId}`
        );
        console.log(response.data.therapist.supervisorIds);
        setTherapist(response.data.therapist);
      } catch (err) {
        console.log("Error in fetching the therapist details ", err);
      }
    };
    fetchProfile();
  }, [therapistId]);

  useEffect(() => {
    if (
      therapist &&
      therapist.supervisorIds &&
      therapist.supervisorIds.length > 0
    ) {
      setSupervisorId(therapist.supervisorIds[0]);
    }
  }, [therapist]);

  useEffect(() => {
    if (supervisorId) {
      const fetchSupervisorProfile = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/sessions/supervisorProfile/${supervisorId}`
          );
          setSupervisor(response.data.supervisor);
          console.log(response.data);
        } catch (err) {
          console.error("Error fetching supervisor data:", err);
        }
      };

      fetchSupervisorProfile();
    }
  }, [supervisorId]);

  return (
    <div>
      {supervisor && (
        <Card className="col-span-1 flex items-center  flex-col gap-2">
          <CardHeader className="flex items-center space-x-4">
            <img
              src={supervisor.image}
              className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow"
            />
            <div>
              <CardTitle>{supervisor.name}</CardTitle>
              <CardDescription>
                Specialization: {supervisor.specialization}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              Email: <span className="font-medium">{supervisor.email}</span>
            </p>
            <p>
              Phone: <span className="font-medium">{supervisor.phone}</span>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default SupervisorDetails;
