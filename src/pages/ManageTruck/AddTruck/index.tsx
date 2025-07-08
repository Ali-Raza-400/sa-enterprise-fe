import { Form, Input, Select, Card, Typography } from "antd";
import GenericButton from "../../../components/UI/GenericButton";
import { useGetUserByRoleQuery } from "../../../redux/slices/user";
import { useAddTruckMutation } from "../../../redux/slices/truck";
import useGenericAlert from "../../../components/Hooks/GenericAlert";
import { useNavigate } from "react-router-dom";
import PATH from "../../../navigation/Path";
import useNotification from "../../../components/UI/Notification";
import { getErrorMessage } from "../../../utils/helper";
import { useEffect, useState } from "react";
import { useGetFleetsQuery } from "../../../redux/slices/fleet";
import { useSelector } from "react-redux";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const AddTruck = () => {
  const { data: supervisor } = useGetUserByRoleQuery({ role: "supervisor" });
  const { data: driver } = useGetUserByRoleQuery({ role: "driver" });
  const [tableOptions] = useState({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 10,
    },
  });
  const { data: fleetList } = useGetFleetsQuery(tableOptions);
  const { user } = useSelector((state: any) => state.auth);
  const [registerFunc, { isLoading }] = useAddTruckMutation();
  const { openNotification, contextHolder } = useNotification();
  const { showAlert } = useGenericAlert();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { project } = useSelector((state: any) => state.project);

  useEffect(() => {
    document.title = "Add Vehicle | SA Enterprise";
  }, []);

  const handleSubmit = async (values: any) => {
    let req = {
      ...values,
      project_id: project?.id ? project?.id : "",
      supervisor_id:
        user?.role === "supervisor" ? user?.id : values.supervisor_id,
    };
    try {
      await registerFunc(req).unwrap();
      showAlert({
        type: "success",
        title: `Vehicle created!`,
        message: `You have successfully created Vehicle.`,
        confirmButtonText: "OK",
        onConfirm: () => navigate(PATH.TRUCK),
      });
      form.resetFields();
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
            Add Vehicle
          </Title>
          <Paragraph type="secondary">
            Fill in the details to add a new Vehicle to the system
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
            {user?.role !== "supervisor" && (
              <Form.Item
                name="fleet_type"
                label="Fleet type"
                rules={[
                  {
                    required: user?.role != "supervisor" ? true : false,
                    message: "Fleet type is required",
                  },
                ]}
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
              name="supervisor_id"
              label="Supervisor"
              rules={[
                {
                  required: user?.role != "supervisor" && true,
                  message: "Supervisor is required",
                },
              ]}
            >
              <Select
                disabled={user?.role === "supervisor"}
                placeholder={`${user?.role === "supervisor" ? user.fullName : "Select Supervisor"}`}
                size="large"
                style={{ width: "100%" }}
                // dropdownStyle={{ maxHeight: "200px" }}
                // loading={!supervisor}
              >
                {(supervisor?.list || [])?.map((role: any) => (
                  <Option key={role.id} value={role.id}>
                    {role.first_name + " " + role.last_name}
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
              label="Add Vehicle"
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
  );
};

export default AddTruck;
