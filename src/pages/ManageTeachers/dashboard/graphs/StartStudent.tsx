import { Col } from "antd";
import { List } from "antd";
import Typography from "../../../../components/UI/Typography";
import { FaTruck, FaStar } from "react-icons/fa";
import IMAGES from "../../../../assets/images";

const TopDrivers = () => {
  interface Driver {
    name: string;
    route: string;
    performance: number; // Percentage
    collections: number;
    image: string;
  }

  // Example top drivers data
  const topDrivers: Driver[] = [
    {
      name: "John Smith",
      route: "Route A",
      performance: 98,
      collections: 156,
      image: `${IMAGES.PERSON_IMG}`,
    },
    {
      name: "Maria Garcia",
      route: "Route B",
      performance: 97,
      collections: 149,
      image: `${IMAGES.PERSON_IMG}`,
    },
    {
      name: "David Wilson",
      route: "Route C",
      performance: 95,
      collections: 142,
      image: `${IMAGES.PERSON_IMG}`,
    },
    {
      name: "Sarah Johnson",
      route: "Route D",
      performance: 94,
      collections: 138,
      image: `${IMAGES.PERSON_IMG}`,
    },
  ];

  return (
    <Col span={24} sm={12} md={12} lg={12}>
      <div className="bg-white shadow-md rounded-lg p-6 pb-4">
        <div className="flex items-center gap-2 mb-4">
          <FaTruck className="text-green-600 text-xl" />
          <Typography variant="headingThreeLight" className="text-[#2F3237]">
            Top Performing Drivers
          </Typography>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={topDrivers}
          className="overflow-y-auto min-h-80 max-h-80"
          renderItem={(driver: Driver) => (
            <List.Item className="hover:bg-green-50 transition-colors duration-200 rounded-lg px-4">
              <List.Item.Meta
                avatar={
                  <img
                    src={driver.image || "/placeholder.svg"}
                    alt={driver.name}
                    className="rounded-full w-12 h-12 object-cover border-2 border-green-500"
                  />
                }
                title={
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{driver.name}</span>
                    <FaStar className="text-yellow-400" />
                    <span className="text-green-600 text-sm">
                      {driver.performance}%
                    </span>
                  </div>
                }
                description={
                  <div className="text-gray-600">
                    <div>Route: {driver.route}</div>
                    <div className="text-sm">
                      Collections: {driver.collections} pickups this month
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </Col>
  );
};

export default TopDrivers;