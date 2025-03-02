import ReactApexChart from "react-apexcharts";
import { Col } from "antd";
import { ApexOptions } from "apexcharts";

const TruckOperationsChart: React.FC = () => {
  // Example data for waste collection operations
  const data: { 
    month: string; 
    totalCollections: number; 
    onTimePickups: number; 
    missedPickups: number; 
  }[] = [
    { month: "Jan", totalCollections: 850, onTimePickups: 800, missedPickups: 550 },
    { month: "Feb", totalCollections: 920, onTimePickups: 880, missedPickups: 440 },
    { month: "Mar", totalCollections: 880, onTimePickups: 850, missedPickups: 130 },
    { month: "Apr", totalCollections: 960, onTimePickups: 920, missedPickups: 240 },
  ];

  const operationsChartData: { series: ApexAxisChartSeries; options: ApexOptions } = {
    series: [
      {
        name: "Total Collections",
        data: data.map((item) => item.totalCollections),
      },
      {
        name: "On-Time Pickups",
        data: data.map((item) => item.onTimePickups),
      },
      {
        name: "Missed Pickups",
        data: data.map((item) => item.missedPickups),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: true
        },
        background: '#fff'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 4
        },
      },
      xaxis: {
        categories: data.map((item) => item.month),
        title: {
          text: "Month",
        },
      },
      yaxis: {
        title: {
          text: "Number of Collections",
        },
        min: 0,
      },
      title: {
        text: "Waste Collection Performance",
        align: "center",
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#2F3237'
        }
      },
      colors: ["#8970d6", "#70d6bc", "#E53E3E"], // Green colors for eco theme
      dataLabels: {
        enabled: true,
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " collections"
          }
        }
      }
    },
  };

  return (
    <Col span={24} sm={12} md={12} lg={12}>
      <div className="bg-white shadow-md rounded-lg p-6">
        <ReactApexChart
          options={operationsChartData.options}
          series={operationsChartData.series}
          type="bar"
          height={350}
        />
      </div>
    </Col>
  );
};

export default TruckOperationsChart;