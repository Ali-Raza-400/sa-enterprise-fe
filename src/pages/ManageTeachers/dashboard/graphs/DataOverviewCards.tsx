import { Col, Row } from "antd";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdLibraryBooks, MdOutlineAttachMoney } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import Typography from "../../../../components/UI/Typography";
import GenericCard from "../../../../components/UI/GenericCard";

const DataOverviewCards = () => {
  const cardData = [
    {
      title: " Students",
      count: "1,234",
      icon: <PiStudentBold fontSize={60} color="#8970D6" />,
    },
    {
      title: " Courses Offered",
      count: "78",
      icon: <MdLibraryBooks fontSize={60} color="#8970D6" />,
    },
    {
      title: "Assistant Teachers",
      count: "44",
      icon: <FaChalkboardTeacher fontSize={60} color="#8970D6" />,
    },
    {
      title: "Annual Revenue",
      count: "$100,000",
      icon: <MdOutlineAttachMoney fontSize={60} color="#8970D6" />,
    },
  ];
  return (
    <Row gutter={[32, 32]} justify="start" className="mt-5">
      {cardData.map((card, index) => (
        <Col key={index} span={24} sm={12} md={12} lg={12} xl={6}>
          <GenericCard className="flex justify-around !mt-0">
            <div>
              <Typography variant="headingFourLight" className="text-[#666666]">
                {card.title}
              </Typography>
              <span className="text-[33px] font-semibold">{card.count}</span>
            </div>
            <div className="flex items-center">{card.icon}</div>
          </GenericCard>
        </Col>
      ))}
    </Row>
  );
};

export default DataOverviewCards;
