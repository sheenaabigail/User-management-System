import ReportFeedback from "./ReportFeedback";
import ReportStatus from "./ReportStatus";
import SupervisorDetails from "./SupervisorDetails";
// import TherapistAnalytics from "./TherapistAnalytics";

function Supervisor({therapistId}) {
  const feedback = [
    {
      id: 1,
      patientName: "John Doe",
      sessionDate: "2024-12-01",
      comments: "The session was very helpful. The exercises were clear and easy to follow.",
      rating: 4.5,
    },
    {
      id: 2,
      patientName: "Jane Smith",
      sessionDate: "2024-11-28",
      comments: "Great insights and practical advice. I feel more confident now.",
      rating: 5.0,
    },
    {
      id: 3,
      patientName: "Alice Johnson",
      sessionDate: "2024-11-25",
      comments: "The session was good, but I struggled with one of the exercises.",
      rating: 3.8,
    },
  ];
  
  const reports = [
    {
      sessionNumber: 1,
      diagnosisGrade: 4.0,
      treatmentGrade: 3.8,
      sessionGrade: 4.2,
      progressGrade: 3.9,
    },
    {
      sessionNumber: 2,
      diagnosisGrade: 4.5,
      treatmentGrade: 4.0,
      sessionGrade: 4.8,
      progressGrade: 4.2,
    },
    {
      sessionNumber: 3,
      diagnosisGrade: 4.3,
      treatmentGrade: 4.1,
      sessionGrade: 4.5,
      progressGrade: 4.0,
    },
    {
      sessionNumber: 4,
      diagnosisGrade: 4.8,
      treatmentGrade: 4.4,
      sessionGrade: 4.9,
      progressGrade: 4.6,
    },
  ];
  

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid  gap-6">
        <SupervisorDetails therapistId={therapistId}/>
			{/*  <TherapistAnalytics  reports={reports} />*/}
        
      </div>
      <div className="grid grid-cols-4 gap-4">
      <ReportFeedback feedback={feedback} />
      <ReportStatus /></div>
    </div>
  );
}

export default Supervisor;
