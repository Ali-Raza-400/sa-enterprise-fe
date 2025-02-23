import { Col, Form, Row } from "antd";
import FormFieldGroup, {
  FieldProps,
} from "../../../components/Form/FormFieldGroup";
import GenericCard from "../../../components/UI/GenericCard";
import GenericButton from "../../../components/UI/GenericButton";

const CreateUpdate = () => {
  const fielldsConfig: FieldProps[] = [
    {
      type: "input",
      label: "Coupon Name",
      name: "couponName",
      // rules: [{ required: true, message: "Please enter Coupon Name" }],
    },
    {
      type: "number",
      label: "Percentage",
      name: "percentage",
      // rules: [{ required: true, message: "Please enter Percentage" }],
    },
    {
      type: "datepicker",
      label: "Due Date",
      name: "dueDate",
      // rules: [{ required: true, message: "Please enter Due Date" }],
    },
    {
      type: "number",
      label: "Max. Usage Limit",
      name: "usageLimit",
      // rules: [{ required: true, message: "Please enter Usage Limit" }],
    },
  ];

  const [form] = Form.useForm(); 

  return (
    <>
     <Form form={form} onFinish={(values) => console.log(values, "ZAIN")}>
      <GenericCard>
          <Row>
            <Col span={16} sm={24} md={24} lg={24}>
              <FormFieldGroup
                fieldsConfig={fielldsConfig}
                fieldsColSpan={12}
                fieldsColBreakPoints={{
                  xs: 24,
                  sm: 12,
                  md: 8,
                  lg: 8,
                  xl: 8,
                  xxl: 8,
                }}
              />
            </Col>
          </Row>
          </GenericCard>      
      <Col span={24} className="flex justify-end mt-4 space-x-4">
  <GenericButton label="Cancel" htmlType="submit" />
  <GenericButton label="Save" htmlType="submit" />
</Col>
</Form>


    </>
  );
};

export default CreateUpdate;
