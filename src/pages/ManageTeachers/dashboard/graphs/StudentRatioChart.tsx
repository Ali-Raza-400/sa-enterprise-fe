import ReactApexChart from "react-apexcharts";
import {  Col } from "antd";
import { ApexOptions } from "apexcharts";

// Define the StarStudent interface


const StudentRatioChart: React.FC = () => {
  // Example dummy data for the last four years
  const data: { year: number; taught: number; passed: number; failed: number; }[] = [
    { year: 2021, taught: 120, passed: 100, failed: 20 },
    { year: 2022, taught: 140, passed: 120, failed: 20 },
    { year: 2023, taught: 160, passed: 140, failed: 20 },
    { year: 2024, taught: 180, passed: 160, failed: 20 },
  ];



  const studentRatioChartData: { series: ApexAxisChartSeries; options: ApexOptions } = {
    series: [
      {
        name: "Students Taught",
        data: data.map((item) => item.taught),
      },
      {
        name: "Students Passed",
        data: data.map((item) => item.passed),
      },
      {
        name: "Students Failed",
        data: data.map((item) => item.failed),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
 
        },
      },
      xaxis: {
        categories: data.map((item) => `${item.year}`),
        title: {
          text: "Year",
        },
      },
      yaxis: {
        title: {
          text: "Number of Students",
        },
        min: 0,
      },
      title: {
        text: "Total Student Ratio",
        align: "center",
      },
      colors: ["#008FFB", "#00E396", "#FF4560"],
      dataLabels: {
        enabled: true,
      },
    },
  };

  return (

      <Col span={24} sm={12} md={12} lg={12}>
        <div className="bg-white shadow-md rounded-lg p-6">
          <ReactApexChart
            options={studentRatioChartData.options}
            series={studentRatioChartData.series}
            type="bar"
            height={350}
          />
        </div>
      </Col>


  );
};

export default StudentRatioChart;
