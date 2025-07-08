import { ReactElement, useEffect, useState } from "react";
import { Button, Flex, TableProps, Tooltip } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import useGenericAlert from "../../components/Hooks/GenericAlert";
import GenericTable from "../../components/UI/GenericTable";
import GenericButton from "../../components/UI/GenericButton";
import { FaPlus } from "react-icons/fa6";
import { useAddFleetMutation } from "../../redux/slices/fleet";
import { Modal, Form, Input, Select } from "antd";
import PageLoader from "../../components/Loader/PageLoader";
import { useNavigate } from "react-router-dom";
import PATH from "../../navigation/Path";
import {
  useDeleteZoneMutation,
  useGetZonesQuery,
} from "../../redux/slices/zone";

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

interface AddFleetModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddFleet: (fleet: FleetFormValues) => void;
  supervisors: Array<{ id: string; name: string }>;
  drivers: Array<{ id: string; name: string }>;
}

interface FleetType {
  id: string;
  fleet_number: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  license_plate: string;
  fleet_type: string;
  status: string;
  supervisor_id: string;
  driver_id: string;
}

const Index = (): ReactElement => {
  const navigate = useNavigate();
  const [tableOptions, setTableOptions] = useState({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    document.title = "Manage Zone | SA Enterprise";
  }, []);

  const [form] = Form.useForm();
  const {
    data,
    isLoading: fleetLoading,
    refetch,
  } = useGetZonesQuery(tableOptions);
  const [deleteZone, { isLoading: deleteZoneLoading }] =
    useDeleteZoneMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createFleet] = useAddFleetMutation();
  const { showAlert } = useGenericAlert();
  const handleAddFleet = async (fleetData: FleetFormValues) => {
    try {
      await createFleet(fleetData).unwrap();
      showAlert({
        type: "success",
        title: "Zone Added!",
        message: "Zone has been added successfully to the system",
        confirmButtonText: "OK",
        onConfirm: () => refetch(),
      });
      form.resetFields();
    } catch (error: unknown) {
      showAlert({
        type: "error",
        title: "Error",
        message: "Failed to add zone. Please try again.",
      });
    }
  };

  const onDelete = async (id: string) => {
    showAlert({
      type: "question",
      title: "Delete Zone Confirmation",
      message:
        "Are you sure you want to delete this zone? This action cannot be undone.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      onConfirm: async () => {
        try {
          await deleteZone(id).unwrap();
          showAlert({
            type: "success",
            title: "Zone Deleted Successfully",
            message: "The zone has been deleted from the system.",
          });
        } catch (error) {
          showAlert({
            type: "error",
            title: "Deletion Failed",
            message:
              "An error occurred while deleting the zone. Please try again.",
          });
        }
      },
    });
  };

  const columns: TableProps<FleetType>["columns"] = [
    {
      title: "Serial #",
      key: "serialNumber",
      width: 80,
      render: (_text: any, _record: FleetType, index: number) => index + 1,
    },
    {
      title: "Zone",
      dataIndex: "name",
      key: "name",
      width: 120,
    },
    {
      title: "Actions",
      key: "action",
      fixed: "right",
      width: 120,
      render: (obj: any) => (
        <div style={{ display: "flex", gap: "15px" }}>
          <Tooltip title="View">
            <EyeOutlined
              onClick={() =>
                navigate(PATH.MANAGE_ZONE_VIEW, {
                  state: obj,
                })
              }
              style={{ color: "#007bff", cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <EditOutlined
              onClick={() =>
                navigate(PATH.MANAGE_ZONE_UPDATE, {
                  state: obj,
                })
              }
              style={{ color: "#ffa500", cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              onClick={() => onDelete(obj.id)}
              style={{ color: "#dc3545", cursor: "pointer" }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  if (fleetLoading || deleteZoneLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <Flex className="justify-end mb-4">
        <GenericButton
          icon={<FaPlus size={20} />}
          label="Add New Zone"
          onClick={() => navigate(PATH.MANAGE_ZONE_CREATE)}
        />

        <AddFleetModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onAddFleet={handleAddFleet}
          supervisors={[]} // Pass actual supervisors data here
          drivers={[]} // Pass actual drivers data here
        />
      </Flex>
      <GenericTable
        loading={fleetLoading || deleteZoneLoading}
        columns={columns}
        data={data}
        enablePagination={true}
        updatePaginationFunc={(data: { page: number; pageSize: number }) => {
          setTableOptions({ ...tableOptions, pagination: data });
        }}
      />
    </>
  );
};

export default Index;

const AddFleetModal: React.FC<AddFleetModalProps> = ({
  isVisible,
  onClose,
  onAddFleet,
  supervisors,
  drivers,
}) => {
  const [form] = Form.useForm<FleetFormValues>();

  const handleSubmit = (values: FleetFormValues) => {
    onAddFleet(values);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add New Fleet"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <div
          style={{ display: "flex", justifyContent: "flex-end" }}
          key="footer"
        >
          <Button key="cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Add Fleet
          </Button>
        </div>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
          <Select placeholder="Select Supervisor">
            {supervisors.map((supervisor) => (
              <Option key={supervisor.id} value={supervisor.id}>
                {supervisor.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="driver_id"
          label="Driver"
          rules={[{ required: true, message: "Driver is required" }]}
        >
          <Select placeholder="Select Driver">
            {drivers.map((driver) => (
              <Option key={driver.id} value={driver.id}>
                {driver.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
