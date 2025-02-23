import { Row, Col } from "antd";
import CourseCard from "../../../Courses/Shared/CourseCard";
import Typography from "../../../../components/UI/Typography";
import { courseData } from "../../../Courses/View/components/RecommendationsTab";

const OngoingCourses = () => {
	return (
		<>
			<Typography variant="headingThreeLight" className="mb-5 mt-8">
				Completed Courses (04)
			</Typography>
			<Row gutter={[16, 16]}>
				{courseData.map((course: any, index) => (
					<Col key={index} xs={24} sm={24} md={24} lg={12} xl={12}>
						<CourseCard courseData={course} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default OngoingCourses;
