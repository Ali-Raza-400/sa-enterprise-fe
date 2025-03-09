import { Form, Input, Select, Card, Typography } from "antd";
import GenericButton from "../../../components/UI/GenericButton";
import { useGetUserByRoleQuery } from "../../../redux/slices/user";
import { useGetTruckByIdQuery, useUpdateTruckMutation } from "../../../redux/slices/truck";
import useGenericAlert from "../../../components/Hooks/GenericAlert";
import { useNavigate, useParams } from "react-router-dom";
import PATH from "../../../navigation/Path";
import useNotification from "../../../components/UI/Notification";
import { getErrorMessage } from "../../../utils/helper";
import { useEffect } from "react";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const UpdateTruck = () => {
    const { id } = useParams<{ id: string }>();
    const { data: truckData, isLoading: isFetching } = useGetTruckByIdQuery(id as any);
    const { data: supervisor } = useGetUserByRoleQuery({ role: "supervisor" });
    const { data: driver } = useGetUserByRoleQuery({ role: "driver" });
    const [updateTruck, { isLoading }] = useUpdateTruckMutation();
    const { openNotification, contextHolder } = useNotification();
    const { showAlert } = useGenericAlert();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (truckData) {
            form.setFieldsValue(truckData.list);
        }
    }, [truckData, form]);

    const handleSubmit = async (values: any) => {
        try {
            await updateTruck({ truckId: id, payload: values }).unwrap();
            showAlert({
                type: "success",
                title: `Truck Updated!`,
                message: `You have successfully updated the truck.`,
                confirmButtonText: "OK",
                onConfirm: () => navigate(PATH.TRUCK),
            });
        } catch (error) {
            openNotification({
                type: "error",
                title: getErrorMessage(error),
            });
        }
    };

    return (
        <Card bordered={false} className="w-full max-w-4xl mx-auto shadow-lg p-6 rounded-lg">
            {contextHolder}
            <div>
                <div className="mb-6">
                    <Title level={3} style={{ margin: 0, marginBottom: "8px" }}>Update Truck</Title>
                    <Paragraph type="secondary">Modify truck details and save changes.</Paragraph>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    requiredMark="optional"
                    className="space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item name="name" label="Truck Name" rules={[{ required: true, message: "Truck name is required" }]}>
                            <Input size="large" style={{ height: "40px" }} placeholder="Enter truck name" />
                        </Form.Item>
                        <Form.Item name="license_plate" label="License Plate" rules={[{ required: true, message: "License Plate is required" }]}>
                            <Input size="large" style={{ height: "40px" }} placeholder="Enter license plate" />
                        </Form.Item>
                    </div>

                    <Form.Item name="supervisor_id" label="Supervisor" rules={[{ required: true, message: "Supervisor is required" }]}>
                        <Select placeholder="Select Supervisor" size="large" style={{ width: "100%" }}>
                            {(supervisor?.list || []).map((role:any) => (
                                <Option key={role.id} value={role.id}>{role.first_name} {role.last_name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="driver_id" label="Driver" rules={[{ required: true, message: "Driver is required" }]}>
                        <Select placeholder="Select Driver" size="large" style={{ width: "100%" }}>
                            {(driver?.list || []).map((role:any) => (
                                <Option key={role.id} value={role.id}>{role.first_name} {role.last_name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <div className="flex justify-end pt-4">
                        <GenericButton
                            variant="solid"
                            htmlType="submit"
                            label="Update Truck"
                            disabled={isLoading || isFetching}
                            loading={isLoading || isFetching}
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

export default UpdateTruck;
