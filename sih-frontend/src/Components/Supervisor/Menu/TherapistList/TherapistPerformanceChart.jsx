import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const TherapistPerformanceChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const chartInstance = echarts.init(chartRef.current);

    // Extract criteria and scores for the chart
    const allDates = Array.from(new Set(data.flatMap((d) => d.dates)));
    const series = Object.keys(data[0]?.criteriaScores || {}).map((criteria) => ({
      name: criteria,
      type: "line",
      data: data.map((patient) => {
        const { criteriaScores } = patient;
        return criteriaScores[criteria]?.reduce((acc, curr, idx) => {
          acc[allDates.indexOf(patient.dates[idx])] = curr;
          return acc;
        }, Array(allDates.length).fill(0)) || [];
      }).flat(),
    }));

    const option = {
      title: {
        // text: "Therapist Performance",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: series.map((s) => s.name),
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: allDates,
      },
      yAxis: {
        type: "value",
      },
      series: series,
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [data]);

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }}></div>;
};

export default TherapistPerformanceChart;
