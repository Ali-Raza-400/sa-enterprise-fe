import { Col, Row } from "antd";
import Typography from "../../../../components/UI/Typography";
import GenericCkEditor from "../../../../components/UI/GenericCkEditor";
const CourseStep4 = ({ form }: any) => {
	return (
		<>
			<Row className="flex justify-center items-center">
				<Col span={24} lg={18} xl={18}>
					<Typography variant="headingOneLight" className="mb-10">
						How about giving an overview of organization along with expected
						learning outcomes for course?
					</Typography>

					<GenericCkEditor
						form={form}
						dynamicField="aboutUs"
						label="About Us"
					/>

					<GenericCkEditor
						form={form}
						dynamicField="outComes"
						label="Out Comes"
					/>
				</Col>
			</Row>
		</>
	);
};

export default CourseStep4;
