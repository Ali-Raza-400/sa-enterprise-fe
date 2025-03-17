import React, { useEffect } from "react";
import { Form, Input, Select, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateFleetMutation } from "../../redux/slices/fleet";
import { useGetUserByRoleQuery } from "../../redux/slices/user";
import GenericButton from "../../components/UI/GenericButton";
import PageLoader from "../../components/Loader/PageLoader";

const { Option } = Select;

interface FleetFormValues {
    fleet_number: string;
    make: string;
    model: string;
    year: number;
    vin: string;
    license_plate: string;
    fleet_type: string;
    status: "Active" | "Inactive" | "Maintenance";
    supervisor_id: string;
    driver_id: string;
}

const FleetUpdatePage: React.FC = () => {
    const [form] = Form.useForm<FleetFormValues>();
    const location = useLocation();
    const navigate = useNavigate();
    const selectedFleet = location.state;

    const { data: supervisors, isLoading: loadingSupervisors } = useGetUserByRoleQuery({role:"supervisor"});
    const { data: drivers, isLoading: loadingDrivers } = useGetUserByRoleQuery({role:"driver"});
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

    if (loadingSupervisors || loadingDrivers) {
        return <PageLoader />;
    }

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
                    name="fleet_number"
                    label="Fleet Number"
                    rules={[{ required: true, message: "Fleet number is required" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="make"
                    label="Make"
                    rules={[{ required: true, message: "Make is required" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="model"
                    label="Model"
                    rules={[{ required: true, message: "Model is required" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="year"
                    label="Year"
                    rules={[{ required: true, message: "Year is required" }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name="vin"
                    label="VIN"
                    rules={[{ required: true, message: "VIN is required" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="license_plate"
                    label="License Plate"
                    rules={[{ required: true, message: "License plate is required" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="fleet_type"
                    label="Fleet Type"
                    rules={[{ required: true, message: "Fleet type is required" }]}
                >
                    <Select placeholder="Select Fleet Type">
                        <Option value="Sedan">Sedan</Option>
                        <Option value="SUV">SUV</Option>
                        <Option value="Van">Van</Option>
                        <Option value="Truck">Truck</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: "Status is required" }]}
                >
                    <Select placeholder="Select Status">
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                        <Option value="Maintenance">Maintenance</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="supervisor_id"
                    label="Supervisor"
                    rules={[{ required: true, message: "Supervisor is required" }]}
                >
                    <Select 
                        placeholder="Select Supervisor"
                        showSearch
                        optionFilterProp="children"
                    >
                        {supervisors?.list?.map((supervisor: any) => (
                            <Option key={supervisor.id} value={supervisor.id}>
                                {supervisor.first_name} {supervisor.last_name}
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
                        showSearch
                        optionFilterProp="children"
                    >
                        {drivers?.list?.map((driver: any) => (
                            <Option key={driver.id} value={driver.id}>
                                {driver.first_name} {driver.last_name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <div className="flex justify-end pt-4">
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