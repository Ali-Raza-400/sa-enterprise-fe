import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../../../redux/slices/user";
import GenericButton from "../../../components/UI/GenericButton";

const { Option } = Select;

interface UserFormValues {
    first_name: string;
    last_name: string;
    email: string;
    address?: string;
    phone_number: string;
    cnic_number: string;
    role: string;
    password?: string;
}

const ViewUser: React.FC = () => {
    const [form] = Form.useForm<UserFormValues>();
    const location = useLocation();
    const navigate = useNavigate();
    const selectedUser = location.state;

    const [_updateUser, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        if (selectedUser) {
            form.setFieldsValue(selectedUser);
        } else {
            form.resetFields();
        }
    }, [selectedUser, form]);

    const handleSubmit = async (_values: UserFormValues) => {
        navigate("/user/list");
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <h2>View User</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: "First name is required" }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: "Last name is required" }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Valid email is required" }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name="address" label="Address">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="phone_number" label="Phone Number" rules={[{ required: true, message: "Phone number is required" }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name="cnic_number" label="CNIC Number" rules={[{ required: true, message: "CNIC is required" }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name="role" label="Role" rules={[{ required: true, message: "Role is required" }]}>
                    <Select placeholder="Select Role" disabled>
                        <Option value="super_admin">Superadmin</Option>
                        <Option value="operations_manager">Operations Manager</Option>
                        <Option value="supervisor">Supervisor</Option>
                        <Option value="driver">Driver</Option>
                    </Select>
                </Form.Item>
                {!selectedUser && (
                    <Form.Item name="password" label="Password" rules={[{ required: true, message: "Password is required" }]}>
                        <Input.Password />
                    </Form.Item>
                )}
                <div className="flex justify-end pt-4">
                    <GenericButton
                        variant="solid"
                        htmlType="submit"
                        label="Back"
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
    );
};

export default ViewUser;
