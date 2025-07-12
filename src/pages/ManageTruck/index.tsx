import { ReactElement, useEffect, useState } from "react";
import { Button, Flex, TableProps, Tooltip } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import useGenericAlert from "../../components/Hooks/GenericAlert";
import GenericTable from "../../components/UI/GenericTable";
import GenericButton from "../../components/UI/GenericButton";
import { FaPlus } from "react-icons/fa6";
import { Modal, Form, Input, Select } from "antd";
import {
  useAddTruckMutation,
  useDeleteTruckMutation,
  useGetTrucksQuery,
  useUpdateTruckMutation,
} from "../../redux/slices/truck";
import { useGetUserByRoleQuery } from "../../redux/slices/user";
import { truckFormValues } from "../Auth/type";
import PageLoader from "../../components/Loader/PageLoader";
import { useSelector } from "react-redux";
import PATH from "../../navigation/Path";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

interface AddUserModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddUser: (user: truckFormValues) => void;
}
interface UpdateUserModalProps {
  isVisible: boolean;
  onClose: () => void;
  onUpdateTruck: (user: truckFormValues) => void;
  selectedTruck: any;
}
interface TruckType {
  id: string;
  name: string;
  license_plate: string;
  email: string;
  address: string;
  phone_number: string;
  cnic_number: string;
  role: string;
}

const Index = (): ReactElement => {
  const [form] = Form.useForm();
  const [selectedTruck, _setSelectedTruck] = useState<any>();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const { project } = useSelector((state: any) => state.project);

  const [tableOptions, setTableOptions] = useState({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 10,
    },
  });
  const {
    data,
    isLoading: userLoading,
    refetch,
  } = useGetTrucksQuery(tableOptions);
  useEffect(() => {
    document.title = "Manage Vehicle | SA Enterprise";

    setTableOptions((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        project_id: project?.id ? project?.id : null,
      },
    }));
  }, []);

  const [deleteTruck, { isLoading: DeleteTruckLoading }] =
    useDeleteTruckMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [registerFunc, { isLoading }] = useAddTruckMutation();
  const [updateTruck, { isLoading: updateLoading }] = useUpdateTruckMutation();
  const handleUpdateTruck = async (values: any) => {
    const payload = {
      truckId: selectedTruck.id,
      payload: values,
    };
    try {
      await updateTruck(payload).unwrap();
      showAlert({
        type: "success",
        title: `Truck Updated!`,
        message: `You have successfully update the truck`,
        confirmButtonText: "OK",
        onConfirm: () => refetch(),
      });
    } catch (error: unknown) {}
  };
  const handleAddTruck = async (values: any) => {
    const payload = {
      ...values,
    };
    try {
      await registerFunc(payload).unwrap();
      showAlert({
        type: "success",
        title: `Vehicle created!`,
        message: `You have successfully created Vehicle.`,
        confirmButtonText: "OK",
        onConfirm: () => refetch(),
      });
      form.resetFields();
    } catch (error: unknown) {
      // openNotification({
      // 	type: "error",
      // 	title: getErrorMessage(error),
      // });
    }
  };
  // const onEdit = (truck: any) => {
  // 	setIsUpdateModalVisible(true)
  // 	setSelectedTruck(truck)
  // };
  const { showAlert } = useGenericAlert();
  const onDelete = async (id: string) => {
    showAlert({
      type: "question",
      title: `Delete Vehicle Confirmation`,
      message: `Are you sure you want to delete this Vehicle? This action cannot be undone.`,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      onConfirm: async () => {
        try {
          await deleteTruck(id).unwrap(); // Ensures better error handling
          showAlert({
            type: "success",
            title: `Vehicle Deleted Successfully`,
            message: `The Vehicle has been deleted successfully.`,
          });
        } catch (error) {
          showAlert({
            type: "error",
            title: `Deletion Failed`,
            message: `An error occurred while deleting the Vehicle. Please try again.`,
          });
        }
      },
    });
  };
  const columns: TableProps<TruckType>["columns"] = [
    {
      title: "Vehicle Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Fleet Type",
      dataIndex: "fleet_type",
      key: "fleet_type",
      width: 150,
    },

    {
      title: "License Plate",
      dataIndex: "license_plate",
      key: "license_plate",
      width: 120,
    },
    {
      title: "Supervisor",
      dataIndex: "supervisor_name",
      key: "supervisor_name",
      width: 120,
    },
    {
      title: "Driver",
      dataIndex: "driver_name",
      key: "driver_name",
      width: 120,
    },
    {
      title: "Actions", // Updated title for actions
      key: "action",
      fixed: "right",
      width: 120,
      render: (obj: any) => (
        <div style={{ display: "flex", gap: "15px" }}>
          {/* View Icon (Blue) */}
          <Tooltip title="View">
            <EyeOutlined
              // PATH.TEACHER_PROFILE.replace(":id", user.id)
              onClick={() => navigate(PATH.VIEW_TRUCK.replace(":id", obj.id))}
              style={{ color: "#007bff", cursor: "pointer", fontSize: "18px" }}
            />
          </Tooltip>

          {user?.role !== "supervisor" && (
            <>
              {/* Edit Icon (Orange) */}
              <Tooltip title="Edit">
                <EditOutlined
                  onClick={() =>
                    navigate(PATH.UPDATE_TRUCK.replace(":id", obj.id))
                  }
                  style={{
                    color: "#ffa500",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                />
              </Tooltip>

              {/* Delete Icon (Red) */}
              <Tooltip title="Delete">
                <DeleteOutlined
                  onClick={() => onDelete(obj.id)}
                  style={{
                    color: "#dc3545",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                />
              </Tooltip>
            </>
          )}
        </div>
      ),
    },
  ];
  if (updateLoading || DeleteTruckLoading || isLoading) {
    return (
      <>
        <PageLoader />
      </>
    );
  }

  return (
    <>
      {/* {contextHolder} */}
      <Flex className="justify-end mb-4">
        {/* <SearchFilter position="end" /> */}
        {user?.role != "supervisor" && (
          <GenericButton
            icon={<FaPlus size={20} />}
            label="Add New Vehicle"
            onClick={() => navigate(PATH.ADD_TRUCK)}
          />
        )}

        <AddUserModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onAddUser={handleAddTruck}
        />
        <UpdateUserModal
          isVisible={isUpdateModalVisible}
          onClose={() => setIsUpdateModalVisible(false)}
          onUpdateTruck={handleUpdateTruck}
          selectedTruck={selectedTruck}
        />
      </Flex>
      <GenericTable
        loading={userLoading || DeleteTruckLoading || updateLoading}
        columns={columns}
        data={data}
        enablePagination={true}
        updatePaginationFunc={(data: { page: number; pageSize: number }) => {
          setTableOptions({ ...tableOptions, pagination: data });
        }}
      />
      {/* <GenericTable loading={userLoading||DeleteTruckLoading||updateLoading} columns={columns} data={data ? data.list : []} /> */}
    </>
  );
};

export default Index;
const AddUserModal: React.FC<AddUserModalProps> = ({
  isVisible,
  onClose,
  onAddUser,
}) => {
  const { data: supervisor } = useGetUserByRoleQuery({
    role: "supervisor",
  });
  const { data: driver } = useGetUserByRoleQuery({
    role: "driver",
  });
  const [form] = Form.useForm<truckFormValues>();
  const handleSubmit = (values: truckFormValues) => {
    onAddUser(values);
    form.resetFields();
    onClose();
  };
  return (
    <Modal
      title="Add New Truck"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button key="cancel" onClick={onClose}>
            Cancel
          </Button>
          ,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Add Vehicle
          </Button>
          ,
        </div>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item<truckFormValues>
          name="name"
          label="Vehicle Name"
          rules={[{ required: true, message: "Vehicle name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<truckFormValues>
          name="license_plate"
          label="License Plate"
          rules={[{ required: true, message: "License Plate is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<truckFormValues>
          name="supervisor_id"
          label="Supervisor ID"
          rules={[{ required: true, message: "Supervisor ID is required" }]}
        >
          <Select placeholder="Select Supervisor ID">
            {(supervisor?.list || [])?.map((role: any) => {
              return (
                <Option value={role.id}>
                  {role.first_name + " " + role.last_name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item<truckFormValues>
          name="driver_id"
          label="Driver ID"
          rules={[{ required: true, message: "Driver ID is required" }]}
        >
          <Select placeholder="Select Driver ID">
            {(driver?.list || [])?.map((role: any) => {
              return (
                <Option value={role.id}>
                  {role.first_name + " " + role.last_name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  isVisible,
  onClose,
  onUpdateTruck,
  selectedTruck,
}) => {
  const { data: supervisor } = useGetUserByRoleQuery({
    role: "supervisor",
  });
  const { data: driver } = useGetUserByRoleQuery({
    role: "driver",
  });
  const [form] = Form.useForm<truckFormValues>();
  useEffect(() => {
    if (selectedTruck) {
      form.setFieldsValue(selectedTruck);
    } else {
      form.resetFields();
    }
  }, [selectedTruck, form]);
  const handleSubmit = (values: truckFormValues) => {
    onUpdateTruck(values);
    form.resetFields();
    onClose();
  };
  return (
    <Modal
      title="Update Vehicle"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button key="cancel" onClick={onClose}>
            Cancel
          </Button>
          ,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Update Vehicle
          </Button>
          ,
        </div>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item<truckFormValues>
          name="name"
          label="Vehicle Name"
          rules={[{ required: true, message: "Vehicle name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<truckFormValues>
          name="license_plate"
          label="License Plate"
          rules={[{ required: true, message: "License Plate is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<truckFormValues>
          name="supervisor_id"
          label="Supervisor ID"
          rules={[{ required: true, message: "Supervisor ID is required" }]}
        >
          <Select placeholder="Select Supervisor ID">
            {(supervisor?.list || [])?.map((role: any) => {
              return (
                <Option value={role.id}>
                  {role.first_name + " " + role.last_name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item<truckFormValues>
          name="driver_id"
          label="Driver ID"
          rules={[{ required: true, message: "Driver ID is required" }]}
        >
          <Select placeholder="Select Driver ID">
            {(driver?.list || [])?.map((role: any) => {
              return (
                <Option value={role.id}>
                  {role.first_name + " " + role.last_name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
