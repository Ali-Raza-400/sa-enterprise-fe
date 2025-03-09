import { useParams } from "react-router-dom";
import { useGetTruckByIdQuery } from "../../../redux/slices/truck";
import { Card, Descriptions, Spin, Alert, Tag } from "antd";
import dayjs from "dayjs";

const TruckDetails = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Alert message="Invalid Truck ID" type="error" />;
  }

  const { data, isLoading, error } = useGetTruckByIdQuery(id);

  if (isLoading) return <Spin size="large" />;
  if (error) return <Alert message="Error fetching truck details" type="error" />;

  const truck = data?.list || data?.pagination?.data;

  if (!truck) return <Alert message="No truck data found" type="warning" />;

  return (
    <Card title={`Truck Details - ${truck.name}`} style={{ maxWidth: 600, margin: "auto" }}>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="License Plate">{truck.license_plate}</Descriptions.Item>
        <Descriptions.Item label="Supervisor ID">{truck.supervisor_id}</Descriptions.Item>
        <Descriptions.Item label="Driver ID">{truck.driver_id}</Descriptions.Item>
        <Descriptions.Item label="Created At">{dayjs(truck.created_at).format("YYYY-MM-DD HH:mm")}</Descriptions.Item>
        <Descriptions.Item label="Updated At">{dayjs(truck.updated_at).format("YYYY-MM-DD HH:mm")}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={truck.is_active ? "green" : "red"}>
            {truck.is_active ? "Active" : "Inactive"}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default TruckDetails;
