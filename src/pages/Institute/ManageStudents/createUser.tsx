import { Form, Input, Select, Card, Typography } from "antd"
import type { UserFormValues } from "../../Auth/type"
import GenericButton from "../../../components/UI/GenericButton"
import { useRegisterMutation } from "../../../redux/slices/auth"
import useGenericAlert from "../../../components/Hooks/GenericAlert"
import useNotification from "../../../components/UI/Notification"
import { getErrorMessage } from "../../../utils/helper"
import { useNavigate } from "react-router-dom"
import PATH from "../../../navigation/Path"

const { Title, Paragraph } = Typography

const CreateUser = () => {
    const [form] = Form.useForm<UserFormValues>()
    const { Option } = Select
    const navigate = useNavigate()
    const [registerFunc, { isLoading }] = useRegisterMutation()
    const { showAlert } = useGenericAlert()
    const { openNotification, contextHolder } = useNotification()
    const handleAddUser = async (userData: any) => {
        const payload = {
            ...userData,
        }
        try {
            await registerFunc(payload).unwrap()
            showAlert({
                type: "success",
                title: `User registered!`,
                message: `User Added Successfully. Welcome to the SA-Enterprize System`,
                confirmButtonText: "OK",
            })
            form.resetFields()
            navigate(PATH.MANAGE_STUDENTS)
        } catch (error: unknown) {
            openNotification({
                type: "error",
                title: getErrorMessage(error),
            })
        }
    }
    const handleSubmit = (values: UserFormValues) => {
        // onAddUser(values);
        handleAddUser(values)
        // form.resetFields()
    }
    return (
        <Card bordered={false} className="w-full max-w-4xl mx-auto shadow-lg p-6 rounded-lg">
            {contextHolder}
            <div   >
                <div className="mb-6">
                    <Title level={3} style={{ margin: 0, marginBottom: "8px" }}>
                        Create New User
                    </Title>
                    <Paragraph type="secondary">Fill in the details to add a new user to the system</Paragraph>
                </div>

                <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark="optional" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item<UserFormValues>
                            name="first_name"
                            label="First Name"
                            rules={[{ required: true, message: "First name is required" }]}
                        >
                            <Input size="large" style={{ height: "40px" }} />
                        </Form.Item>
                        <Form.Item<UserFormValues>
                            name="last_name"
                            label="Last Name"
                            rules={[{ required: true, message: "Last name is required" }]}
                        >
                            <Input size="large" style={{ height: "40px" }} />
                        </Form.Item>
                    </div>

                    <Form.Item<UserFormValues>
                        name="email"
                        label="Email"
                        rules={[{ required: true, type: "email", message: "Valid email is required" }]}
                    >
                        <Input size="large" style={{ height: "40px" }} />
                    </Form.Item>

                    <Form.Item<UserFormValues> name="address" label="Address">
                        <Input.TextArea rows={3} style={{ resize: "none" }} />
                    </Form.Item>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item<UserFormValues>
                            name="phone_number"
                            label="Phone Number"
                            rules={[{ required: true, message: "Phone number is required" }]}
                        >
                            <Input size="large" style={{ height: "40px" }} />
                        </Form.Item>
                        <Form.Item<UserFormValues>
                            name="cnic_number"
                            label="CNIC Number"
                            rules={[{ required: true, message: "CNIC is required" }]}
                        >
                            <Input size="large" style={{ height: "40px" }} />
                        </Form.Item>
                    </div>

                    <Form.Item<UserFormValues> name="role" label="Role" rules={[{ required: true, message: "Role is required" }]}>
                        <Select
                            placeholder="Select Role"
                            size="large"
                            style={{ width: "100%" }}
                            dropdownStyle={{ maxHeight: "200px" }}
                        >
                            <Option value="super_admin">Superadmin</Option>
                            <Option value="operations_manager">Operations Manager</Option>
                            <Option value="supervisor">Supervisor</Option>
                            <Option value="driver">Driver</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item<UserFormValues>
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: "Password is required" }]}
                    >
                        <Input.Password size="large" style={{ height: "40px" }} />
                    </Form.Item>

                    <div className="flex justify-end pt-4">
                        <GenericButton
                            variant="solid"
                            htmlType="submit"
                            label="Add User"
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
    )
}

export default CreateUser

