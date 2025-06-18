import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Card, Typography, Image } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import type { UploadFile } from 'antd/es/upload/interface';
import { useGetTrucksQuery } from '../../redux/slices/truck';
import { useGetUserByRoleQuery } from '../../redux/slices/user';
import GenericButton from '../../components/UI/GenericButton';
import { useSelector } from 'react-redux';
import PATH from '../../navigation/Path';

const { Title } = Typography;

const ViewOperation: React.FC = () => {
    const { Option } = Select;
    const [tableOptions, _setTableOptions] = useState({
        filters: {},
        pagination: {
          page: 1,
          pageSize: 10,
        },
      });
    const { data: truck, isLoading: truckLoading } = useGetTrucksQuery(tableOptions);
    const navigate = useNavigate()
    const location = useLocation();
    const editData = location?.state;
    console.log("locationData", editData);
    const { user } = useSelector((state: any) => state.auth);
    console.log("user:::", user)
    const { data: supervisor } = useGetUserByRoleQuery({
        role: 'supervisor',
    });

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    console.log("fileList", fileList);

    const handleSubmit = () => {
        navigate(PATH.MANAGE_OPRATION)
    };

   
    
    useEffect(() => {
        if (editData?.photo_urls) {
            const formattedFiles = editData.photo_urls.map((url: string, index: number) => ({
                uid: index.toString(),
                name: `File ${index + 1}`,
                url: url,
                status: "done",
            }));
            setFileList(formattedFiles);
        }
    }, [editData]);
    useEffect(() => {
        if (editData) {
            form.setFieldsValue({
                supervisor_id: editData.supervisor_id,
                truck_id: editData.truck_id,
                location: editData.location,
            });
        }
    }, [editData, form]);

    return (
        <Card bordered={false} className="w-full max-w-4xl mx-auto shadow-lg p-6 rounded-lg">
            <div>
                <div className="mb-6">
                    <Title level={3} style={{ margin: 0, marginBottom: "8px" }}>
                        View Operation
                    </Title>
                    {/* <Paragraph type="secondary">Fill in the details to View operation to the system</Paragraph> */}
                </div>
                <Form form={form} layout="vertical" onFinish={handleSubmit} className="space-y-4"
                    initialValues={{
                        supervisor_id: editData?.supervisor_id,
                        truck_id: editData?.truck_id,
                        location: editData?.location,
                    }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                            name="supervisor_id"
                            label="Supervisor"
                            rules={[{ required: true, message: "Supervisor is required" }]}
                        >
                            <Select
                                placeholder="Select Supervisor"
                                size="large"
                                disabled
                                style={{ width: "100%" }}
                                dropdownStyle={{ maxHeight: "200px" }}
                                loading={!supervisor}
                            >
                                {(supervisor?.list || [])?.map((role: any) => (
                                    <Option key={role.id} value={role.id}>
                                        {role.first_name + " " + role.last_name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="truck_id"
                            label="Truck"
                            rules={[{ required: true, message: "Truck is required" }]}
                        >
                            <Select
                                placeholder="Select Vehicle"
                                size="large"
                                disabled
                                style={{ width: "100%" }}
                                dropdownStyle={{ maxHeight: "200px" }}
                                loading={truckLoading}
                            >
                                {(truck?.list || [])?.map((role: any) => (
                                    <Option key={role.id} value={role.id}>
                                        {role.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="location"
                        label="Location"
                        rules={[{ required: true, message: 'Location is required' }]}
                    >
                        <Input.TextArea  disabled rows={3} style={{ resize: "none" }} />
                    </Form.Item>

                    <Form.Item label="Uploaded Files" >
                        <>
                            {fileList.length > 0 && (
                                <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
                                       {fileList.map((url: any) => {
                                        return (
                                            <Image width={413} height={320} src={url.url} alt="opration_image" style={{ marginRight: "5px", borderRadius: "10px" }} />
                                        )
                                    })}
                                </div>
                            )}
                        </>
                    </Form.Item>
                    <div className="flex justify-end pt-4">
                        <GenericButton
                            variant="solid"
                            htmlType="submit"
                            label="Back"
                            // disabled={isLoading}
                            // loading={isLoading}
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



export default ViewOperation;