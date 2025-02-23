import { Col, Row } from "antd";
import IMAGES from "../../../../assets/images";
import GenericCard from "../../../../components/UI/GenericCard";
import Typography from "../../../../components/UI/Typography";

const Payment = () => {
  return (
    <div>
      <GenericCard noMargin={true}>
        <div className="flex justify-between mt-3 mb-5" >
          <Typography variant="headingFour" className="">
            Payment
          </Typography>
          {/* <EditOutlined className="text-[1.5rem] text-[#8970D6] cursor-pointer" /> */}
        </div>
        <Row gutter={[20, 0]} >
          <Col span={12} xs={24} md={10} lg={12} xl={6} className="">
            <img src={IMAGES.PAYMENT} />
          </Col>
          <Col span={12} xs={24} md={10} lg={12} xl={6} className="mt-5 sm:mt-0">
            <img src={IMAGES.PAYMNET} />
          </Col>
        </Row>
      </GenericCard>
    </div>
  );
};

export default Payment;
