"use client";

import * as React from "react";
import { Button } from "@/Components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/Components/ui/popover"
const sessionData = [
  {
    id: "session1",
    sessionNumber: 1,
    status: "completed",
    therapist: "Dr. John Doe",
    sessionNotes: "Improved speech clarity.",
    reportStatus: "available",
    reportLink: "#",
  },
  {
    id: "session2",
    sessionNumber: 2,
    status: "in-progress",
    therapist: "Dr. Jane Smith",
    sessionNotes: "Working on pronunciation.",
    reportStatus: "pending",
    reportLink: "#",
  },
  {
    id: "session3",
    sessionNumber: 3,
    status: "scheduled",
    therapist: "Dr. John Doe",
    sessionNotes: "Upcoming session.",
    reportStatus: "not started",
    reportLink: "#",
  },
];

export function SessionTracker() {
  return (
    <Card className="w-full  mx-auto">
      <CardHeader>
        <CardTitle>Session Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-gray-300">
          <table className="w-full border-collapse border border-gray-300 text-sm text-gray-800">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Session ID</th>
                <th className="px-4 py-2 text-left font-medium">Session Number</th>
                <th className="px-4 py-2 text-left font-medium">Status</th>
                <th className="px-4 py-2 text-left font-medium">Therapist</th>
                <th className="px-4 py-2 text-left font-medium">Notes</th>
                <th className="px-4 py-2 text-left font-medium">Report Status</th>
                <th className="px-4 py-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessionData.length ? (
                sessionData.map((session) => (
                  <tr key={session.id} className="border-b border-gray-200">
                    <td className="px-4 py-2">{session.id}</td>
                    <td className="px-4 py-2">{session.sessionNumber}</td>
                    <td className="px-4 py-2 capitalize">{session.status}</td>
                    <td className="px-4 py-2">{session.therapist}</td>
                    <td className="px-4 py-2">
                      
                    </td>
                    <td className="px-4 py-2 capitalize">{session.reportStatus}</td>
                    <td className="px-4 py-2">
                      <button
                        className="rounded border border-gray-400 px-2 py-1 text-gray-700 hover:bg-gray-200"
                        onClick={() => window.open(session.reportLink, "_blank")}
                      >
                        View Report
                      </button>
                      
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No sessions available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="flex gap-5 justify-end">
        <Button>Create Session Report</Button>
        <Button>Upload Session Report</Button>
      </CardFooter>
    </Card>
  );
}
