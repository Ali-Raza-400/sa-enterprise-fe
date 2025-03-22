import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateFleetMutation } from "../../redux/slices/fleet";
import GenericButton from "../../components/UI/GenericButton";


interface FleetFormValues {
    fleet_type: string;
}

const FleetUpdatePage: React.FC = () => {
    const [form] = Form.useForm<FleetFormValues>();
    const location = useLocation();
    const navigate = useNavigate();
    const selectedFleet = location.state;
    const [updateFleet, { isLoading: updating }] = useUpdateFleetMutation();
    useEffect(() => {
        if (selectedFleet) {
            form.setFieldsValue(selectedFleet);
        }
    }, [selectedFleet, form]);

    const handleSubmit = async (values: FleetFormValues) => {
        if (!selectedFleet) return;

        try {
            await updateFleet({
                fleetId: selectedFleet.id,
                payload: values,
            }).unwrap();

            message.success("Fleet updated successfully");
            navigate("/fleet/list");
        } catch (error) {
            message.error("Failed to update fleet");
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <h2 className="text-2xl font-bold mb-6">Update Fleet</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={selectedFleet}
            >
                <Form.Item
                    name="name"
                    label="Fleet Title"
                    rules={[{ required: true, message: "Fleet Title is required" }]}
                >
                    <Input placeholder="Enter fleet title" size="large" />
                </Form.Item>
                <Form.Item
                    name="fleet_type"
                    label="Fleet Type"
                    rules={[{ required: true, message: "Fleet Type is required" }]}
                >
                    <Input placeholder="Enter fleet title" size="large" />
                </Form.Item>
                <div className="flex justify-center pt-4">
                    <GenericButton
                        variant="solid"
                        htmlType="submit"
                        label="Update Fleet"
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

export default FleetUpdatePage;