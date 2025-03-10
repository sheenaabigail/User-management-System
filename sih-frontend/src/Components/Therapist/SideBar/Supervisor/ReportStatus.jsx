import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Separator } from "@/Components/ui/separator";

function ReportStatus() {
  const reports = [
    {
      patientName: "John Doe",
      status: "Approved",
    },
    {
      patientName: "Jane Smith",
      status: "Pending",
    },
    {
      patientName: "Alice Johnson",
      status: "Pending",
    },
    {
      patientName: "Mark Taylor",
      status: "Approved",
    },
    {
      patientName: "Emily Davis",
      status: "Pending",
    },
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Report Status</CardTitle>
      </CardHeader>
      <Separator />

      <CardContent className="h-64 overflow-y-scroll">
        <div className="space-y-3">
          {reports.map((report, index) => {
            const badgeColor =
              report.status === "Approved"
                ? "bg-green-500 text-white"
                : "bg-yellow-500 text-white";

            return (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-white opacity-90 hover:opacity-50 transition duration-300 ease-in-out"
              >
                <p className="font-medium">{report.patientName}</p>
                <Badge className={`${badgeColor} opacity-80 hover:opacity-100 transition duration-300 ease-in-out`}>
                  {report.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default ReportStatus;
