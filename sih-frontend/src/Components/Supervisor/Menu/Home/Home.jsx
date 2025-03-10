import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import ReactEcharts from 'echarts-for-react';
import { TrendingUp } from 'lucide-react';

// UI Components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { ChartContainer } from "@/Components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/Components/ui/chart";
import { Bar, BarChart, Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartLegend, ChartLegendContent } from "@/Components/ui/chart";

// Chart Configuration
const CHART_CONFIGS = {
  therapistPerformance: {
    label: "Average Grade",
    color: "#2563eb",
  },
  patientCount: {
    label: "Patients",
    color: "hsl(var(--chart-1))",
  },
};

// Sample Data Sets
const THERAPIST_PERFORMANCE_DATA = [
  { month: "January", averageGrade: 4.5 },
  { month: "February", averageGrade: 4.3 },
  { month: "March", averageGrade: 4.7 },
  { month: "April", averageGrade: 4.2 },
  { month: "May", averageGrade: 4.6 },
  { month: "June", averageGrade: 4.8 },
];

const PATIENT_COUNT_DATA = [
  { month: "January", patients: 100 },
  { month: "February", patients: 150 },
  { month: "March", patients: 200 },
  { month: "April", patients: 250 },
  { month: "May", patients: 300 },
  { month: "June", patients: 400 },
];

// Session Analysis Chart Configuration
const SESSION_ANALYSIS_OPTIONS = {
  title: {
    text: "Session Analysis",
    left: "center",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
  },
  legend: {
    data: [
      "Sessions Booked",
      "Sessions Cancelled",
      "Sessions Conducted",
      "Sessions Conducted Online",
      "Sessions Conducted Offline",
    ],
    top: "10%",
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
    name: "Sessions",
  },
  series: [
    {
      name: "Sessions Booked",
      type: "bar",
      stack: "Total",
      data: [300, 280, 320, 290, 350, 400, 420],
      itemStyle: { color: "#2563eb" },
    },
    {
      name: "Sessions Cancelled",
      type: "bar",
      stack: "Total",
      data: [50, 40, 60, 30, 70, 80, 90],
      itemStyle: { color: "#f87171" },
    },
    {
      name: "Sessions Conducted",
      type: "line",
      data: [250, 240, 260, 260, 280, 320, 330],
      itemStyle: { color: "#22c55e" },
      areaStyle: { opacity: 0.3 },
    },
    {
      name: "Sessions Conducted Online",
      type: "bar",
      stack: "Conducted",
      data: [150, 130, 170, 160, 180, 200, 210],
      itemStyle: { color: "#4ade80" },
    },
    {
      name: "Sessions Conducted Offline",
      type: "bar",
      stack: "Conducted",
      data: [100, 110, 90, 100, 100, 120, 120],
      itemStyle: { color: "#1d4ed8" },
    },
  ],
};

const Home = () => {
  return (
    <div className="healthcare-dashboard p-5">
      {/* Key Performance Indicators */}
      <div className="performance-overview flex space-x-4 mb-4">
        <div className="kpi-column flex flex-col space-y-4 w-1/3">
          <Card className="bg-white shadow-lg rounded-lg">
            <CardContent className="p-4 flex justify-between items-center">
              <p className="text-gray-600 text-sm font-semibold uppercase">
                Total Patients (Current)
              </p>
              <p className="text-blue-600 text-2xl font-bold">250</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg rounded-lg">
            <CardContent className="p-4 flex justify-between items-center">
              <p className="text-gray-600 text-sm font-semibold uppercase">
                Total Therapists
              </p>
              <p className="text-blue-600 text-2xl font-bold">25</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg rounded-lg">
            <CardContent className="p-4 flex justify-between items-center">
              <p className="text-gray-600 text-sm font-semibold uppercase">
                Total Sessions Conducted
              </p>
              <p className="text-blue-600 text-2xl font-bold">2,500</p>
            </CardContent>
          </Card>
        </div>

        {/* Therapist Performance Chart */}
        <Card className="bg-white shadow-lg rounded-lg flex-1">
          <CardHeader className="bg-gray-100 p-4">
            <CardTitle className="text-xl font-semibold">
              Therapists Performance
            </CardTitle>
          </CardHeader>
          <ChartContainer
            config={CHART_CONFIGS.therapistPerformance}
            className="min-h-[200px] w-full"
          >
            <BarChart data={THERAPIST_PERFORMANCE_DATA}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="averageGrade"
                fill={CHART_CONFIGS.therapistPerformance.color}
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </Card>

        {/* Patient Count Analysis */}
        <Card className="bg-white shadow-lg rounded-lg flex-1">
          <CardHeader className="bg-gray-100 p-4">
            <CardTitle className="text-xl font-semibold">
              Patient Count Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={CHART_CONFIGS.patientCount}>
              <AreaChart
                accessibilityLayer
                data={PATIENT_COUNT_DATA}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="patients"
                  type="natural"
                  fill="var(--color-patients)"
                  fillOpacity={0.4}
                  stroke="var(--color-patients)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Increased by 12% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Detailed Session Analysis */}
      <Card className="p-5">
        <ReactEcharts option={SESSION_ANALYSIS_OPTIONS} />
      </Card>
    </div>
  );
};

export default Home;
