import React, { useEffect } from "react";
import { Form, Input, Select, message } from "antd";
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
    zone: string;
    password?: string;
}

const UserUpdatePage: React.FC = () => {
    const [form] = Form.useForm<UserFormValues>();
    const location = useLocation();
    const navigate = useNavigate();
    const selectedUser = location.state;

    const [updateUser, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        if (selectedUser) {
            form.setFieldsValue(selectedUser);
        } else {
            form.resetFields();
        }
    }, [selectedUser, form]);

    const handleSubmit = async (values: UserFormValues) => {
        if (!selectedUser) return;

        const payload = {
            userId: selectedUser.id,
            payload: values,
        };

        try {
            await updateUser(payload).unwrap();
            message.success("User updated successfully");
            navigate("/user/list");
        } catch (error) {
            message.error("Failed to update user");
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <h2>Update User</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: "First name is required" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: "Last name is required" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Valid email is required" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="zone" label="Zone" rules={[{ required: true, message: "Zone is required" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Address">
                    <Input />
                </Form.Item>
                <Form.Item name="phone_number" label="Phone Number" rules={[{ required: true, message: "Phone number is required" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="cnic_number" label="CNIC Number" rules={[{ required: true, message: "CNIC is required" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="role" label="Role" rules={[{ required: true, message: "Role is required" }]}>
                    <Select placeholder="Select Role">
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
                        label="Update User"
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

export default UserUpdatePage;
