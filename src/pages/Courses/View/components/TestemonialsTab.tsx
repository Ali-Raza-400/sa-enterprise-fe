import { Col, Row } from "antd";
import Typography from "../../../../components/UI/Typography";
import ReviewCard from "../../Shared/ReviewCard";
import IMAGES from "../../../../assets/images";

const TestemonialsTab = () => {
	const reviewCardData = Array.from({ length: 6 }, () => ({
		profileImage: IMAGES.FAULT_IMG,
		name: "John Doe",
		rating: 4.5,
		time: "10 min ago",
		reviewText:
			"I just completed a UI/UX course and loved it! The content was clear and practical, with helpful projects and great instructor feedback. I feel more confident in my design skills now. Highly recommend it!",
	}));
	return (
		<div>
			<Typography variant="bodyXLargeBold" className="mt-6">
				Why People choose ALMS for their career
			</Typography>
			<Row gutter={[24, 24]} className="mt-5">
				{reviewCardData.map((d, index) => (
					<Col key={index} xs={24} sm={12} md={12} lg={12} xl={6}>
						<ReviewCard
							profileImage={d.profileImage}
							name={d.name}
							rating={d.rating}
							time={d.time}
							reviewText={d.reviewText}
						/>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default TestemonialsTab;
