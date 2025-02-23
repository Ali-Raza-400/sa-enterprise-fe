import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Select } from "antd";
import Typography from "../../../../components/UI/Typography";

const TeacherVideoLectureCountChart: React.FC = () => {
  // Example data for video lectures by month
  const teacherVideoLectureData = [
    { month: "January", count: 10 },
    { month: "February", count: 15 },
    { month: "March", count: 8 },
    { month: "April", count: 20 },
    { month: "May", count: 12 },
    { month: "June", count: 18 },
    { month: "July", count: 25 },
    { month: "August", count: 30 },
    { month: "September", count: 22 },
    { month: "October", count: 28 },
    { month: "November", count: 35 },
    { month: "December", count: 40 },
  ];

  // Example data for video lectures by year
  const teacherVideoLectureYearData = [
    { year: "2022", count: 150 },
    { year: "2023", count: 200 },
    { year: "2024", count: 250 },
  ];

  // State to manage the selected option
  const [viewType, setViewType] = useState<"month" | "year">("month");

  // Chart options configuration
  const options = {
    chart: {
      type: "bar" as const, // Explicitly typing as 'bar'
      height: 350,
    },
    xaxis: {
      categories:
        viewType === "month"
          ? teacherVideoLectureData.map((data) => data.month)
          : teacherVideoLectureYearData.map((data) => data.year),
      title: {
        text: viewType === "month" ? "Month" : "Year",
      },
    },
    yaxis: {
      title: {
        text: "Number of Video Lectures",
      },
      min: 0, // Set minimum value for y-axis
    },
    colors: ["#008FFB"],
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "flat",
      },
    },
  };

  // Series data for the chart
  const series = [
    {
      name: "Video Lectures",
      data:
        viewType === "month"
          ? teacherVideoLectureData.map((data) => data.count)
          : teacherVideoLectureYearData.map((data) => data.count),
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between mb-4">
        <Typography variant="headingThreeLight" className="text-[#2F3237]">
          Video Lectures by Teachers
        </Typography>
        <Select
          defaultValue="month"
          className="w-[120px]"
          onChange={(value) => setViewType(value as "month" | "year")}
        >
          <Select.Option value="month">Month</Select.Option>
          <Select.Option value="year">Year</Select.Option>
        </Select>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default TeacherVideoLectureCountChart;
