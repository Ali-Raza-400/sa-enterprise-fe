import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Col, Select } from "antd";

const CourseStatusChart: React.FC = () => {
  const [viewType, setViewType] = useState<"month" | "year">("month");
  console.log("viewType", viewType);
  // Type for the series data
  interface SeriesData {
    name: string;
    data: number[];
  }

  // Chart options
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false, // Hide the default download toolbar
      },
    },
    plotOptions: {
      bar: {
        horizontal: true, // Display horizontal bars
        barHeight: "70%", // Adjust the height of the bars
      },
    },
    colors: ["#4CAF50", "#F44336"], // Green for Published, Red for Unpublished
    dataLabels: {
      enabled: false, // Disable data labels on the bars
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Published", "Unpublished"], // Two categories: Published and Unpublished
    },
    yaxis: {
      title: {
        text: "Courses Status", // Title for y-axis
      },
    },
    fill: {
      opacity: 1, // Bar fill opacity
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} courses`, // Tooltip format for showing course count
      },
    },
  };

  // Example data: total number of published and unpublished courses
  const series: SeriesData[] = [
    {
      name: "Courses",
      data: [100, 30], // Total number of published and unpublished courses
    },
  ];

  return (
    <Col
      span={24}
      sm={12}
      md={12}
      lg={12}
      //   className="bg-white shadow-md rounded-lg p-6"
    >
      {" "}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Courses: Published vs. Unpublished
          </h3>
          {/* Custom dropdown for Month/Year selection */}
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
          height={150}
        />{" "}
      </div>
    </Col>
  );
};

export default CourseStatusChart;
