import { Card, Row, Col, Form, FormInstance } from "antd";
import Typography from "../../../../components/UI/Typography";
import IMAGES from "../../../../assets/images";
import FormFieldGroup, {
	FieldProps,
} from "../../../../components/Form/FormFieldGroup";
import { FaCheckCircle } from "react-icons/fa";

const categoryOptions = [
	{ label: "Pkr", value: "pakistani" },
	{ label: "$", value: "dollar" },
];

const fieldsConfig: FieldProps[] = [
	// {
	// 	type: "select",
	// 	label: "Currency",
	// 	placeholder: "PKR",
	// 	name: "currency",
	// 	options: categoryOptions,
	// 	// rules: [{ message: "Please enter Category" }],
	// 	// colSpan: 4,
	// },
	{
		type: "number",
		name: "price",
		label: "Amount",
		placeholder: "Amount",
		options: categoryOptions,
		// dependencies: ["selectedType"],

		rules: [{ required: true, message: "Please enter Number" }],
		// colSpan: 20,
	},
];

const cardData = [
	{
		id: 1,
		title: "Free",
		description: "Allow access to your content free of charge",
		imgSrc: IMAGES.FREE_ICON,
	},
	{
		id: 2,
		title: "Paid",
		description: "Setting up a one time payment for access",
		imgSrc: IMAGES.PAID_ICON,
	},
];

const CourseStep2 = ({ form }: { form: FormInstance }) => {
	Form.useWatch("selectedType");
	const handleCardClick = (title: string) => {
		form.setFieldsValue({ selectedType: title });
	};

	return (
		<>
			<Typography
				variant="headingOneLight"
				className="text-center mb-8 flex justify-center"
			>
				How about setting a price for your Course?
			</Typography>
			<Row gutter={16} justify="center" className="lg:gap-10 !my-14 !mx-0">
				{cardData.map((card) => (
					<Col span={24} key={card.id} xs={24} sm={12} md={12} lg={8}>
						<Form.Item
							name="selectedType"
							rules={[
								{ required: true, message: "Please select a pricing option" },
							]}
						>
							<Card
								hoverable
								className={`w-full border-[2px] ${
									form.getFieldValue("selectedType") === card?.title
										? "border-[#8970D6]"
										: ""
								} hover:border-[#8970D6]`}
								onClick={() => handleCardClick(card?.title)}
							>
								<div className="gap-4 flex justify-center items-center">
									<div className="bg-[#D7CFEA] rounded-[0.5rem]">
										<img
											alt={card.title}
											src={card.imgSrc}
											className="h-full"
										/>
									</div>
									<div>
										<div className="flex items-center gap-2">
											<Typography
												variant="headingFour"
												className="text-[#1C1C1C]"
											>
												{card.title}
											</Typography>
											{form.getFieldValue("selectedType") === card?.title && (
												<FaCheckCircle color="#22C55E" size={25} />
											)}
										</div>
										{/* <Typography variant="headingFour" className="text-[#1C1C1C]">{card.title}</Typography> */}
										<Typography
											variant="bodyLargeRegular"
											className="text-[#999999]"
										>
											{card.description}
										</Typography>
									</div>
								</div>
							</Card>
						</Form.Item>
					</Col>
				))}
			</Row>
			{form.getFieldValue("selectedType") === "Paid" && (
				<Row className="flex justify-center items-center">
					<Col span={24} lg={14} xl={10}>
						{/* <GenericCard> */}
						<div className="">
							<FormFieldGroup fieldsConfig={fieldsConfig} fieldsColSpan={24} />
						</div>
						{/* </GenericCard> */}
					</Col>
				</Row>
			)}
		</>
	);
};

export default CourseStep2;
