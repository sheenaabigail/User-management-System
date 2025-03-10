import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/Components/ui/table";

function ReportFeedback({ feedback }) {
  // Sample feedback based on the reports data
  const sampleFeedback = [
    {
      date: "2024-11-20",
      patientName: "John Doe",
      diagnosis: "Accurate diagnosis, minor adjustments needed in treatment plan.",
      patientOutcomes: "Improvement observed in speech clarity, but requires more frequent sessions.",
    },
    {
      date: "2024-11-21",
      patientName: "Jane Smith",
      diagnosis: "Effective diagnosis, well-targeted treatment plan.",
      patientOutcomes: "Significant progress in speech therapy, good session management.",
    },
    {
      date: "2024-11-22",
      patientName: "Sam Wilson",
      diagnosis: "Diagnosis requires revision, treatment needs to be more personalized.",
      patientOutcomes: "No significant improvement, further analysis is needed.",
    },
    {
      date: "2024-11-23",
      patientName: "Linda Harris",
      diagnosis: "Accurate diagnosis, treatment is working as expected.",
      patientOutcomes: "Progressing well, no changes needed in treatment.",
    },
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Supervisor Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        {sampleFeedback.length > 0 ? (
          <div className="overflow-y-auto max-h-[200px]">
            <Table>
              <TableBody>
                {sampleFeedback.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.date}</TableCell>
                    <TableCell>{item.patientName}</TableCell>
                    <TableCell>{item.diagnosis}</TableCell>
                    <TableCell>{item.patientOutcomes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No feedback available yet.</p>
        )}
      </CardContent>
    </Card>
  );
}

export default ReportFeedback;
