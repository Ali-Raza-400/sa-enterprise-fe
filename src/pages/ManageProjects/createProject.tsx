import { Form, Input, Card, Typography, Select } from "antd";
import type { UserFormValues } from "../Auth/type";
import GenericButton from "../../components/UI/GenericButton";
import useGenericAlert from "../../components/Hooks/GenericAlert";
import useNotification from "../../components/UI/Notification";
import { getErrorMessage } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import PATH from "../../navigation/Path";
import { useEffect } from "react";
import { useAddProjectMutation } from "../../redux/slices/project";

const { Title, Paragraph } = Typography;

const CreateProject = () => {
  const [form] = Form.useForm<UserFormValues>();
  const navigate = useNavigate();
  const [addZone, { isLoading }] = useAddProjectMutation();
  const { showAlert } = useGenericAlert();
  const { openNotification, contextHolder } = useNotification();

  const { Option } = Select;

  useEffect(() => {
    document.title = "Add Project | SA Enterprise";
  }, []);
  const handleAddProject = async (userData: any) => {
    const payload = {
      ...userData,
    };
    try {
      await addZone(payload).unwrap();
      showAlert({
        type: "success",
        title: `Project Added!`,
        message: `Project Added Successfully to the S.A Enterprises System`,
        confirmButtonText: "OK",
      });
      form.resetFields();
      navigate(PATH.MANAGE_PROJECT);
    } catch (error: unknown) {
      openNotification({
        type: "error",
        title: getErrorMessage(error),
      });
    }
  };
  const handleSubmit = (values: UserFormValues) => {
    handleAddProject(values);
  };
  return (
    <Card
      bordered={false}
      className="p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto"
    >
      {contextHolder}
      <div>
        <div className="mb-6">
          <Title level={3} style={{ margin: 0, marginBottom: "8px" }}>
            Create New Project
          </Title>
          <Paragraph type="secondary">
            Add a new project to the system
          </Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark="optional"
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "City is required" }]}
            >
              <Input placeholder="Enter city" size="large" />
            </Form.Item>

            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: "Type is required" }]}
            >
              <Select
                placeholder="Select type"
                size="large"
                style={{ width: "100%" }}
                dropdownStyle={{ maxHeight: "200px" }}
                onChange={() => console.log("ddd")}
              >
                <Option value="Private">Private</Option>
                <Option value="Government">Government</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter name" size="large" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Enter description" rows={4} />
          </Form.Item>

          <div className="flex justify-center pt-4">
            <GenericButton
              variant="solid"
              htmlType="submit"
              label="Add Project"
              disabled={isLoading}
              loading={isLoading}
              style={{
                height: "44px",
                minWidth: "120px",
                background: "#1890ff",
                color: "white",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            />
          </div>
        </Form>
      </div>
    </Card>
  );
};

export default CreateProject;
