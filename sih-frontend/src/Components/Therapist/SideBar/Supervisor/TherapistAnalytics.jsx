// import React from "react";
// import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

// export function TherapistAnalytics() {
//   // Sample reports data
//   const reports = [
//     { sessionNumber: 1, diagnosisGrade: 4.2, treatmentGrade: 3.8, sessionGrade: 4.5, progressGrade: 4.0 },
//     { sessionNumber: 2, diagnosisGrade: 4.5, treatmentGrade: 4.0, sessionGrade: 4.8, progressGrade: 4.2 },
//     { sessionNumber: 3, diagnosisGrade: 3.8, treatmentGrade: 3.5, sessionGrade: 4.2, progressGrade: 3.9 },
//     { sessionNumber: 4, diagnosisGrade: 4.0, treatmentGrade: 4.2, sessionGrade: 4.7, progressGrade: 4.3 },
//     { sessionNumber: 5, diagnosisGrade: 4.4, treatmentGrade: 4.1, sessionGrade: 4.6, progressGrade: 4.5 },
//   ];

//   return (
//     <Card className="col-span-3">
//       <CardHeader>
//         <CardTitle>Therapist Analytics</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={reports}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="sessionNumber" label={{ value: "Sessions", position: "insideBottom", offset: -5 }} />
//             <YAxis label={{ value: "Grade", angle: -90, position: "insideLeft" }} domain={[0, 5]} />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="diagnosisGrade" fill="#211951" name="Diagnosis" />
//             <Bar dataKey="treatmentGrade" fill="#836FFF" name="Treatment" />
//             <Bar dataKey="sessionGrade" fill="#D0A3FF" name="Session Management" />
//             <Bar dataKey="progressGrade" fill="#F0F3FF" name="Progress" />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }

// export default TherapistAnalytics;
