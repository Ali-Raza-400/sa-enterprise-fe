import { Form, Input, Select, Card, Typography } from "antd";
import type { UserFormValues } from "../Auth/type";
import GenericButton from "../../components/UI/GenericButton";
import useGenericAlert from "../../components/Hooks/GenericAlert";
import useNotification from "../../components/UI/Notification";
import { getErrorMessage } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import PATH from "../../navigation/Path";
import { useEffect } from "react";
import { useAddFleetMutation } from "../../redux/slices/fleet";
import { useGetUserByRoleQuery } from "../../redux/slices/user";

const { Title, Paragraph } = Typography;

const CreateFleet = () => {
  const [form] = Form.useForm<UserFormValues>();
  const { Option } = Select;
  const navigate = useNavigate();
  const { data: supervisor } = useGetUserByRoleQuery({ role: "supervisor" });
  const { data: driver } = useGetUserByRoleQuery({ role: "driver" });
  const [addFleet, { isLoading }] = useAddFleetMutation();
  const { showAlert } = useGenericAlert();
  const { openNotification, contextHolder } = useNotification();
  useEffect(() => {
    document.title = "Add Fleet | SA Enterprise";
  }, []);
  const handleAddUser = async (userData: any) => {
    const payload = {
      ...userData,
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
      className="w-full max-w-4xl mx-auto shadow-lg p-6 rounded-lg"
    >
      {contextHolder}
      <div>
        <div className="mb-6">
          <Title level={3} style={{ margin: 0, marginBottom: "8px" }}>
            Create New Fleet
          </Title>
          <Paragraph type="secondary">
            Fill in the details to add a new fleet to the system
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
              name="fleet_number"
              label="Fleet Number"
              rules={[{ required: true, message: "Fleet number is required" }]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name="make"
              label="Make"
              rules={[{ required: true, message: "Make is required" }]}
            >
              <Input size="large" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="model"
              label="Model"
              rules={[{ required: true, message: "Model is required" }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="year"
              label="Year"
              rules={[{ required: true, message: "Year is required" }]}
            >
              <Input size="large" type="number" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="vin"
              label="VIN"
              rules={[{ required: true, message: "VIN is required" }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="license_plate"
              label="License Plate"
              rules={[{ required: true, message: "License plate is required" }]}
            >
              <Input size="large" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="fleet_type"
              label="Fleet Type"
              rules={[{ required: true, message: "Fleet type is required" }]}
            >
              <Select size="large" placeholder="Select Fleet Type">
                <Option value="Sedan">Sedan</Option>
                <Option value="Truck">Truck</Option>
                <Option value="SUV">SUV</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Status is required" }]}
            >
              <Select size="large" placeholder="Select Status">
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="supervisor_id"
              label="Supervisor"
              rules={[{ required: true, message: "Supervisor is required" }]}
            >
              <Select
                placeholder="Select Supervisor"
                size="large"
                style={{ width: "100%" }}
              >
                {(supervisor?.list || []).map((role: any) => (
                  <Option key={role.id} value={role.id}>
                    {role.first_name} {role.last_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="driver_id"
              label="Driver"
              rules={[{ required: true, message: "Driver is required" }]}
            >
              <Select
                placeholder="Select Driver"
                size="large"
                style={{ width: "100%" }}
              >
                {(driver?.list || []).map((role: any) => (
                  <Option key={role.id} value={role.id}>
                    {role.first_name} {role.last_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="flex justify-end pt-4">
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
