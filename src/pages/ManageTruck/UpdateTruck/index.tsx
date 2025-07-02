import { Form, Input, Select, Card, Typography } from "antd";
import GenericButton from "../../../components/UI/GenericButton";
import { useGetUserByRoleQuery } from "../../../redux/slices/user";
import {
  useGetTruckByIdQuery,
  useUpdateTruckMutation,
} from "../../../redux/slices/truck";
import useGenericAlert from "../../../components/Hooks/GenericAlert";
import { useNavigate, useParams } from "react-router-dom";
import PATH from "../../../navigation/Path";
import useNotification from "../../../components/UI/Notification";
import { getErrorMessage } from "../../../utils/helper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetFleetsQuery } from "../../../redux/slices/fleet";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const UpdateTruck = () => {
  const { id } = useParams<{ id: string }>();
  const { data: truckData, isLoading: isFetching } = useGetTruckByIdQuery(
    id as any
  );
  const { data: supervisor } = useGetUserByRoleQuery({ role: "supervisor" });
  const { data: driver } = useGetUserByRoleQuery({ role: "driver" });
  const { user } = useSelector((state: any) => state.auth);
  const [updateTruck, { isLoading }] = useUpdateTruckMutation();
  const [tableOptions] = useState({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 10,
    },
  });
  const { openNotification, contextHolder } = useNotification();
  const { showAlert } = useGenericAlert();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data: fleetList } = useGetFleetsQuery(tableOptions);
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
        title: `Vehicle Updated!`,
        message: `You have successfully updated the Vehicle.`,
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
    <Card
      bordered={false}
      className="w-full max-w-4xl mx-auto shadow-lg p-6 rounded-lg"
    >
      {contextHolder}
      <div>
        <div className="mb-6">
          <Title level={3} style={{ margin: 0, marginBottom: "8px" }}>
            Update Vehicle
          </Title>
          <Paragraph type="secondary">
            Modify Vehicle details and save changes.
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
              name="name"
              label="Vehicle Name"
              rules={[{ required: true, message: "Vehicle name is required" }]}
            >
              <Input
                size="large"
                style={{ height: "40px" }}
                placeholder="Enter Vehicle name"
              />
            </Form.Item>
            <Form.Item
              name="license_plate"
              label="License Plate"
              rules={[{ required: true, message: "License Plate is required" }]}
            >
              <Input
                size="large"
                style={{ height: "40px" }}
                placeholder="Enter license plate"
              />
            </Form.Item>

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

            {user?.role !== "supervisor" && (
              <Form.Item
                name="fleet_type"
                label="Fleet type"
                rules={[{ required: false }]}
              >
                <Select
                  placeholder="Select Fleet type"
                  size="large"
                  style={{ width: "100%" }}
                >
                  {(fleetList?.list || []).map((fleet: any) => (
                    <Option key={fleet.id} value={fleet.fleet_type}>
                      {fleet.fleet_type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
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
              label="Update Vehicle"
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
