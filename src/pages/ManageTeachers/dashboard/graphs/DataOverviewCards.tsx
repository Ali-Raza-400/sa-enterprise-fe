import { Col, Row } from "antd";
import { FaTruck, FaUsers, FaBoxes } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import Typography from "../../../../components/UI/Typography";
import GenericCard from "../../../../components/UI/GenericCard";
import { useGetTilesInfoQuery } from "../../../../redux/slices/dashboardCount";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const DataOverviewCards = () => {
  const { project } = useSelector((state: any) => state.project);
  const { data: countsData } = useGetTilesInfoQuery({
    project_id: project?.id,
  });

  useEffect(() => {
    document.title = "Dashboard | SA Enterprise";
  }, []);
  const cardData = [
    {
      title: "Total Users",
      count: countsData?.list?.total_users ?? 0,
      icon: <FaUsers fontSize={40} color="#008000" />, // Green color for eco-friendly theme
      bgColor: "bg-green-50",
    },
    {
      title: "Active Trucks",
      count: countsData?.list?.trucks ?? 0,
      icon: <FaTruck fontSize={40} color="#008000" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Inventory Items",
      count: "156",
      icon: <FaBoxes fontSize={40} color="#008000" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Revenue",
      count: "$100,000",
      icon: <MdOutlineAttachMoney fontSize={40} color="#008000" />,
      bgColor: "bg-green-50",
    },
  ];

  return (
    <Row gutter={[32, 32]} justify="start" className="mt-0">
      {cardData.map((card, index) => (
        <Col key={index} span={24} sm={12} md={12} lg={12} xl={6}>
          <GenericCard
            className={`flex justify-around !mt-0 hover:shadow-lg transition-shadow duration-300 `}
          >
            <div>
              <Typography
                variant="headingFourLight"
                className="text-gray-600 font-medium text-[18px]"
              >
                {card.title}
              </Typography>
              <span className="text-[28px] font-bold text-gray-800">
                {card.count}
              </span>
            </div>
            <div className="flex items-center">
              <div className="p-0 rounded-full bg-[rgb(252,252,252)]">
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
