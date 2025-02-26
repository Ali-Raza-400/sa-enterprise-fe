import { Col, FormInstance, Row } from "antd";
import Typography from "../../../../components/UI/Typography";

import FormFieldGroup, {
	FieldProps,
} from "../../../../components/Form/FormFieldGroup";
// import ImageUpload from "../../Shared/ImageUploader";
import {
	COUERSE_DIFFICULTY,
	COURSE_CATEGORIES,
} from "../../../../utils/constants";

const CourseStep1 = ({  }: { form: FormInstance }) => {
	const fielldsConfig: FieldProps[] = [
		{
			type: "input",
			label: "Course Name",
			name: "name",
			placeholder: "Enter Course Name",
			rules: [{ required: true, message: "*Required", whitespace: true }],
		},
		{
			type: "input",
			label: "Course Subtitle",
			name: "courseSubtitle",
			placeholder: "Enter Course Subtitle",
			rules: [{ required: true, message: "*Required", whitespace: true }],
		},
		{
			type: "select",
			label: "Category",
			name: "categories",
			placeholder: "Select",
			options: COURSE_CATEGORIES,
			rules: [{ required: true, message: "*Required", type: "array" }],
			selectMode: "multiple",
		},
		{
			type: "select",
			label: "Difficulty",
			name: "courseDifficulty",
			placeholder: "Select",
			options: COUERSE_DIFFICULTY,
			rules: [{ required: false, message: "*Required" }],
		},
	];

	return (
		<>
			<Row className="flex justify-center items-center">
				<Col span={24} lg={16} xl={11}>
					<Typography variant="headingOneLight">
						Ready to craft a compelling course title and select the ideal
						category?
					</Typography>
					<div className="mt-10">
						<Col span={24}>
							<FormFieldGroup
								fieldsConfig={fielldsConfig}
								fieldsColSpan={24}
								fieldsColBreakPoints={{
									xs: 24,
									sm: 24,
									md: 24,
									lg: 24,
									xl: 24,
									xxl: 24,
								}}
							/>
						</Col>
					</div>
					{/* <Typography variant="bodyXLargeMedium" className="mb-2">
						Course Thumbnail
					</Typography> */}
					{/* <ImageUpload
						form={form}
						name="courseThumbnail"
						supportedFormat=" .jpg, .jpeg, .png"
						guidelines="360 * 280"
					/>
					<Typography variant="bodyXLargeMedium" className="mb-2 mt-5">
						Course Cover
					</Typography>
					<ImageUpload
						form={form}
						name="courseCover"
						supportedFormat=" .jpg, .jpeg, .png"
						guidelines="1200 * 224"
						isBanner={true}
					/> */}
				</Col>
			</Row>
		</>
	);
};

export default CourseStep1;
