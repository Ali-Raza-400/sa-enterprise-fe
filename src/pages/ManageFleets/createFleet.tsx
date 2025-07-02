import { Form, Input, Card, Typography } from "antd";
import type { UserFormValues } from "../Auth/type";
import GenericButton from "../../components/UI/GenericButton";
import useGenericAlert from "../../components/Hooks/GenericAlert";
import useNotification from "../../components/UI/Notification";
import { getErrorMessage } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import PATH from "../../navigation/Path";
import { useEffect } from "react";
import { useAddFleetMutation } from "../../redux/slices/fleet";

const { Title, Paragraph } = Typography;

const CreateFleet = () => {
  const [form] = Form.useForm<UserFormValues>();
  const navigate = useNavigate();
  const [addFleet, { isLoading }] = useAddFleetMutation();
  const { showAlert } = useGenericAlert();
  const { openNotification, contextHolder } = useNotification();
  useEffect(() => {
    document.title = "Add Fleet | SA Enterprise";
  }, []);
  const handleAddUser = async (userData: any) => {
    const superUser = localStorage.getItem("super_user");
    if (superUser) {
      try {
        const parsedUser = JSON.parse(superUser);
        var projectId = parsedUser?.project_id;
      } catch (e) {
        console.error("Failed to parse super_user from localStorage", e);
      }
    }

    const payload = {
      ...userData,
      project_id: projectId,
    };
    try {
      await addFleet(payload).unwrap();
      showAlert({
        type: "success",
        title: `Fleet Added!`,
        message: `Fleet Added Successfully to the S.A Enterprises System`,
        confirmButtonText: "OK",
      });
      form.resetFields();
      navigate(PATH.MANAGE_FLEETS);
    } catch (error: unknown) {
      openNotification({
        type: "error",
        title: getErrorMessage(error),
      });
    }
  };
  const handleSubmit = (values: UserFormValues) => {
    handleAddUser(values);
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
            Create New Fleet
          </Title>
          <Paragraph type="secondary">Add a new fleet to the system</Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark="optional"
          className="space-y-4"
        >
          <Form.Item
            name="fleet_type"
            label="Fleet Type"
            rules={[{ required: true, message: "Fleet Type is required" }]}
          >
            <Input placeholder="Enter fleet type" size="large" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Fleet Title"
            rules={[{ required: true, message: "Fleet Title is required" }]}
          >
            <Input placeholder="Enter fleet title" size="large" />
          </Form.Item>
          <div className="flex justify-center pt-4">
            <GenericButton
              variant="solid"
              htmlType="submit"
              label="Add Fleet"
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

export default CreateFleet;
