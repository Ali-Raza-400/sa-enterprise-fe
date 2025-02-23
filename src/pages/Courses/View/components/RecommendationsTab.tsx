import { Col, Row } from "antd";
import CourseCard from "../../Shared/CourseCard";

const RecommendationsTab = () => {
	return (
		<Row gutter={[24, 24]} className="mt-7">
			{courseData.map((course: any, index) => (
				<Col key={index} xs={24} sm={12} md={12} lg={12} xl={6}>
					<CourseCard courseData={course} />
				</Col>
			))}
		</Row>
	);
};

export default RecommendationsTab;

export const courseData = [
	{
		id: "835788ec-4534-449a-b90e-08b1f35cc81c",
		createdAt: "2024-11-06T10:37:26.811Z",
		updatedAt: "2024-11-06T10:37:26.811Z",
		deletedAt: null,
		name: "new course ABCD",
		courseSubtitle: null,
		categories: ["Programming"],
		courseThumbnail:
			"https://almsbe.xeventechnologies.com/api/s3/file/screencapture-coursera-org-account-profile-2024-10-10-17_07_16.png",
		courseCover:
			"https://almsbe.xeventechnologies.com/api/s3/file/sign-in-bg1.png",
		isFree: true,
		price: null,
		aboutUs: "<p>sadqdqweq</p>",
		outComes: "<p>qweqewqe</p>",
		isPublished: true,
		courseCreatedAt: "2024-11-06T10:37:26.811Z",
		description: "<p>wqeqweqw</p>",
		usedSeats: null,
		totalSeats: "50",
		isMendatory: null,
	},
];
