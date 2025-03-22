import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import GenericButton from "../../components/UI/GenericButton";
import { useUpdateZoneMutation } from "../../redux/slices/zone";


interface FleetFormValues {
    fleet_type: string;
}

const ZoneUpdatePage: React.FC = () => {
    const [form] = Form.useForm<FleetFormValues>();
    const location = useLocation();
    const navigate = useNavigate();
    const selectedFleet = location.state;
    const [updateZone, { isLoading: updating }] = useUpdateZoneMutation();
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
            navigate("/zone/list");
        } catch (error) {
            message.error("Failed to update zone");
        }
    };
   
    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <h2 className="text-2xl font-bold mb-6">Update Zone</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={selectedFleet}
            >
                <Form.Item
                    name="name"
                    label="Zone Title"
                    rules={[{ required: true, message: "Zone is required" }]}
                >
                    <Input placeholder="Enter zone title" size="large" />
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

export default ZoneUpdatePage;