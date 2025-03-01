/* eslint-disable @typescript-eslint/no-unused-vars */
import { Row } from "antd";
import DataOverviewCards from "./graphs/DataOverviewCards";
import TeacherVideoLectureCountChart from "./graphs/TeacherVideoLectureCountChart";
import CourseStatusChart from "./graphs/CourseStatusChart ";
import TruckOperationsChart from "./graphs/StudentRatioChart";
import TopDrivers from "./graphs/StartStudent";

const TeacherDashboard = () => {
  return (
    <div>
      <DataOverviewCards />
      <Row justify="center" gutter={[16, 16]} className="py-4">
        <TruckOperationsChart />
        <TopDrivers />
      </Row>
      <Row justify="center" gutter={[16, 16]} className="py-4">
        <CourseStatusChart />
        <CourseStatusChart />
      </Row>
      <TeacherVideoLectureCountChart />
    </div>
  );
};

export default TeacherDashboard;
