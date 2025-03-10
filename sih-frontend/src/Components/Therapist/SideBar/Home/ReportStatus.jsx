import { Card, CardHeader, CardTitle ,CardContent} from "@/Components/ui/card";
import React from "react";

const ReportStatus = () => {
  const reports = [
    {
      id: 1,
      reportType: "Pretherapy Evaluation",
      submissionDate: "2023-06-16",
      status: "Approved",
    },
    {
      id: 2,
      reportType: "Progress Report",
      submissionDate: "2023-06-20",
      status: "Pending",
    },
    {
      id: 3,
      reportType: "Session Report",
      submissionDate: "2023-06-25",
      status: "Modify and Submit",
    },
  ];

  return (
    <Card className="col-span-2 size-full m-auto">
      <table className="min-w-full border-collapse border border-gray-300 overflow-y-scroll">
        <thead className="sticky">
          <tr className="bg-gray-200">
          <th className="border  px-4 py-2 text-left">Report ID</th>
            <th className="border  px-4 py-2 text-left">Report Type</th>
            <th className="border  px-4 py-2 text-left">Submission Date</th>
            <th className="border  px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr
              key={report.reportid}
              className="hover:bg-gray-100 transition-colors"
            >
              <td className="border border-gray-300 px-4 py-2">
                {report.reportid}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {report.reportType}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {report.submissionDate}
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 ${
                  report.status === "Approved"
                    ? "text-green-600"
                    : report.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {report.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default ReportStatus;
