import { Form, Input, Card, Typography } from "antd";
import type { UserFormValues } from "../Auth/type";
import GenericButton from "../../components/UI/GenericButton";
import useGenericAlert from "../../components/Hooks/GenericAlert";
import useNotification from "../../components/UI/Notification";
import { getErrorMessage } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import PATH from "../../navigation/Path";
import { useEffect } from "react";
import { useAddZoneMutation } from "../../redux/slices/zone";

const { Title, Paragraph } = Typography;

const CreateZone = () => {
  const [form] = Form.useForm<UserFormValues>();
  const navigate = useNavigate();
  const [addZone, { isLoading }] = useAddZoneMutation();
  const { showAlert } = useGenericAlert();
  const { openNotification, contextHolder } = useNotification();
  useEffect(() => {
    document.title = "Add Zone | SA Enterprise";
  }, []);
  const handleAddUser = async (userData: any) => {
    const payload = {
      ...userData,
    };
    try {
      await addZone(payload).unwrap();
      showAlert({
        type: "success",
        title: `Zone Added!`,
        message: `Zone Added Successfully to the S.A Enterprises System`,
        confirmButtonText: "OK",
      });
      form.resetFields();
      navigate(PATH.MANAGE_ZONE);
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
            Create New Zone
          </Title>
          <Paragraph type="secondary">
            Add a new zone to the system
          </Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark="optional"
          className="space-y-4"
        >



          <Form.Item
            name="name"
            label="Zone name"
            
            rules={[{ required: true, message: "Zone name is required" }]}
          >
            <Input placeholder="Enter zone" size="large" />
          </Form.Item>
          <div className="flex justify-center pt-4">
            <GenericButton
              variant="solid"
              htmlType="submit"
              label="Add Zone"
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

export default CreateZone;
