import { Col, Row } from "antd";
import { FaTruck, FaUsers, FaBoxes } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import Typography from "../../../../components/UI/Typography";
import GenericCard from "../../../../components/UI/GenericCard";

const DataOverviewCards = () => {
  const cardData = [
    {
      title: "Total Users",
      count: "1,234",
      icon: <FaUsers fontSize={60} color="#8970d6" />, // Green color for eco-friendly theme
      bgColor: "bg-green-50",
    },
    {
      title: "Active Trucks",
      count: "48",
      icon: <FaTruck fontSize={60} color="#8970d6" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Inventory Items",
      count: "156",
      icon: <FaBoxes fontSize={60} color="#8970d6" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Revenue",
      count: "$100,000",
      icon: <MdOutlineAttachMoney fontSize={60} color="#8970d6" />,
      bgColor: "bg-green-50",
    },
  ];

  return (
    <Row gutter={[32, 32]} justify="start" className="mt-5">
      {cardData.map((card, index) => (
        <Col key={index} span={24} sm={12} md={12} lg={12} xl={6}>
          <GenericCard 
            className={`flex justify-around !mt-0 hover:shadow-lg transition-shadow duration-300 `}
          >
            <div>
              <Typography 
                variant="headingFourLight" 
                className="text-gray-600 font-medium"
              >
                {card.title}
              </Typography>
              <span className="text-[33px] font-bold text-gray-800">
                {card.count}
              </span>
            </div>
            <div className="flex items-center">
              <div className="p-4 rounded-full bg-[rgb(252,252,252)]">
                {card.icon}
              </div>
            </div>
          </GenericCard>
        </Col>
      ))}
    </Row>
  );
};

export default DataOverviewCards;