/* eslint-disable @typescript-eslint/no-unused-vars */
import { Row } from "antd";
import StudentRatioChart from "./graphs/StudentRatioChart";
import DataOverviewCards from "./graphs/DataOverviewCards";
import StartStudent from "./graphs/StartStudent";
import TeacherVideoLectureCountChart from "./graphs/TeacherVideoLectureCountChart";
import CourseStatusChart from "./graphs/CourseStatusChart ";

const TeacherDashboard = () => {
  return (
    <div>
      <DataOverviewCards />
      <Row justify="center" gutter={[16, 16]} className="py-4">
        <StudentRatioChart />
        <StartStudent />
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
