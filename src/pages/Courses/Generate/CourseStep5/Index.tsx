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
