import { Card, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const CertificationCard = () => {
	const requirements = [
		"Complete all required course modules",
		"Pass the necessary assessments",
		"Submit all mandatory assignments",
	];

	return (
		<div className="w-full">
			<Card
				title={
					<Title
						level={4}
						style={{ textAlign: "center", color: "#6B46C1", margin: 0 }}
					>
						Certification Status
					</Title>
				}
				className="w-full p-4"
			>
				<div className="flex flex-col gap-6 mt-5">
					<Text>
						Your certificates will appear here once you complete all course
						requirements. Each certificate will be available for download after
						you:
					</Text>

					<ul
						style={{
							listStyle: "none",
							padding: 0,
							display: "flex",
							flexDirection: "column",
							gap: "12px",
						}}
					>
						{requirements?.map((requirement, index) => (
							<li
								key={index}
								style={{
									display: "flex",
									alignItems: "flex-start",
									gap: "12px",
								}}
							>
								<CheckCircleOutlined
									style={{ color: "#6B46C1", marginTop: "4px" }}
								/>
								<Text>{requirement}</Text>
							</li>
						))}
					</ul>

					<Text strong style={{ textAlign: "center", color: "#6B46C1" }}>
						Keep up the great work on your learning journey!
					</Text>
				</div>
			</Card>
		</div>
	);
};

export default CertificationCard;
