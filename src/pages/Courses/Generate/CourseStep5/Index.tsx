// import { Col, Form, Row } from "antd";
// import CkEditor from "../../../../components/UI/GenericCkEditor";
// import Typography from "../../../../components/UI/Typography";
// import DateField from "../../../../components/Form/DateField";
// const CourseStep5 = ({ form }: any) => {
// 	const a = Form.useWatch("description", form);
// 	console.log(form.getFieldsValue(), a);

// 	return (
// 		<>
// 			<Row className="flex justify-center items-center">
// 				<Col span={24} lg={18} xl={18}>
// 					<Typography variant="headingOneLight" className="mb-10">
// 						What do you think is the best date and description for your course?
// 					</Typography>
// 					<DateField
// 						label="Date"
// 						name="date"
// 						rules={[{ required: true, message: "Please select a date!" }]}
// 						dateMode="date"
// 						fieldClassName="my-custom-class !w-6/12"
// 						margin="medium"
// 					/>

// 					<CkEditor
// 						form={form}
// 						dynamicField="description"
// 						label="Description"
// 					/>
// 				</Col>
// 			</Row>
// 		</>
// 	);
// };

// export default CourseStep5;
import { Col, Form, Row, Checkbox, FormInstance } from "antd";
import CkEditor from "../../../../components/UI/GenericCkEditor";
import Typography from "../../../../components/UI/Typography";

const CourseStep5 = ({ form }: { form: FormInstance }) => {
	const isMendatory = Form.useWatch("isMendatory", form);

	return (
		<>
			<Row className="flex justify-center items-center">
				<Col span={24} lg={18} xl={18}>
					<Typography variant="headingOneLight" className="mb-10">
						{isMendatory
							? "Provide a description for this mandatory course"
							: "Provide a description for your course"}
					</Typography>

					<Form.Item name="isMendatory" valuePropName="checked">
						<Checkbox className="font-medium text-lg">
							Is the course mandatory?
						</Checkbox>
					</Form.Item>

					<CkEditor
						form={form}
						dynamicField="description"
						label="Description"
					/>
				</Col>
			</Row>
		</>
	);
};

export default CourseStep5;
