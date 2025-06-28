import React, { useEffect } from "react";
import { Form, Input, message, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import GenericButton from "../../components/UI/GenericButton";
import { useUpdateProjectMutation } from "../../redux/slices/project";
import PATH from "../../navigation/Path";

interface FleetFormValues {
  fleet_type: string;
}

const ProjectUpdatePage: React.FC = () => {
  const [form] = Form.useForm<FleetFormValues>();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedFleet = location.state;
  const [updateZone, { isLoading: updating }] = useUpdateProjectMutation();

  const { Option } = Select;

  useEffect(() => {
    if (selectedFleet) {
      form.setFieldsValue(selectedFleet);
    }
  }, [selectedFleet, form]);

  const handleSubmit = async (values: FleetFormValues) => {
    if (!selectedFleet) return;

    try {
      await updateZone({
        fleetId: selectedFleet.id,
        payload: values,
      }).unwrap();

      message.success("Zone updated successfully");
      navigate(PATH.MANAGE_PROJECT);
    } catch (error) {
      message.error("Failed to update zone");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 className="text-2xl font-bold mb-6">Update Zone</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={selectedFleet}
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
            label="Update Zone"
            disabled={updating}
            loading={updating}
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
  );
};

export default ProjectUpdatePage;
