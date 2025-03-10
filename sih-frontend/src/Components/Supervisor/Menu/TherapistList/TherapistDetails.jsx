import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Bar } from "react-chartjs-2";

// Improved Therapist Details Component
function TherapistDetails() {
  // Therapist Data with More Comprehensive Information
  const therapist = {
    name: "Dr. Jane Doe",
    specialization: "Speech Therapy Specialist",
    photo: "https://via.placeholder.com/150",
    credentials: {
      registrationNumber: "ST-12345",
      experience: "5+ Years",
      qualifications: ["Master's in Speech Pathology", "Certified Speech Therapist"]
    },
    performanceMetrics: {
      overallGrade: "A",
      successRate: "90%",
      patientSatisfaction: "95%"
    },
    contact: {
      phone: "+1 (555) 123-4567",
      email: "dr.janedoe@therapycenter.com",
      consultationHours: "Mon-Fri, 9 AM - 5 PM"
    },
    specialties: [
      "Pediatric Speech Therapy",
      "Articulation Disorders",
      "Language Development",
      "Cognitive Communication"
    ],
    patients: [
      { 
        name: "John Doe", 
        progress: "Significant Improvement", 
        sessions: 12, 
        treatmentPlan: "Articulation Therapy" 
      },
      { 
        name: "Jane Smith", 
        progress: "Steady Improvement", 
        sessions: 8, 
        treatmentPlan: "Language Development" 
      }
    ]
  };

  // Performance Charts Data
  const performanceChartData = {
    labels: ['Communication Skills', 'Treatment Effectiveness', 'Patient Progress', 'Therapy Engagement'],
    datasets: [{
      label: 'Performance Metrics',
      data: [4.5, 4.7, 4.6, 4.8],
      backgroundColor: ['#3B82F6', '#10B981', '#F43F5E', '#8B5CF6'],
    }]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        title: {
          display: true,
          text: 'Performance Rating (Out of 5)'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.formattedValue}/5`
        }
      }
    }
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-xl w-full">
      {/* Therapist Profile Header */}
      <div className="flex flex-col md:flex-row items-center mb-8 space-x-6">
        <Avatar className="w-40 h-40 border-4 border-blue-500">
          <AvatarImage src={therapist.photo} alt={therapist.name} />
          <AvatarFallback>{therapist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{therapist.name}</h1>
          <p className="text-xl text-gray-600">{therapist.specialization}</p>
          
          <div className="mt-4 flex space-x-3">
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Experience: {therapist.credentials.experience}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Overall Grade: {therapist.performanceMetrics.overallGrade}
            </Badge>
          </div>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="patients">Patient Insights</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Professional Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Credentials</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {therapist.credentials.qualifications.map((qual, index) => (
                    <li key={index}>{qual}</li>
                  ))}
                  <li>Registration Number: {therapist.credentials.registrationNumber}</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700">Specialties</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {therapist.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">{specialty}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle >Performance Metrics</CardTitle>
              <CardDescription>Comprehensive evaluation of therapeutic effectiveness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4 flex justify-center text-xl">Key Performance Indicators</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-600 text-xl flex justify-center">Success Rate</p>
                      <Badge variant="outline" className="bg-green-50 text-green-700 flex justify-center">
                        {therapist.performanceMetrics.successRate}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xl flex justify-center">Patient Satisfaction</p>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 flex justify-center">
                        {therapist.performanceMetrics.patientSatisfaction}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Bar data={performanceChartData} options={chartOptions} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Patients Tab */}
        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <CardTitle>Patient Progress Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {therapist.patients.map((patient, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800">{patient.name}</h4>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div>
                        <p className="text-xs text-gray-600">Progress</p>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {patient.progress}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Sessions</p>
                        <p className="font-medium">{patient.sessions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Treatment Plan</p>
                        <Badge variant="secondary">{patient.treatmentPlan}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Contact Information */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-700">Direct Contact</h3>
            <p className="text-gray-600">Phone: {therapist.contact.phone}</p>
            <p className="text-gray-600">Email: {therapist.contact.email}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Consultation Hours</h3>
            <p className="text-gray-600">{therapist.contact.consultationHours}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TherapistDetails;