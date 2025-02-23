import { Col, Divider, Row } from "antd";
import GenericCard from "../../../../components/UI/GenericCard";
import { CiEdit } from "react-icons/ci";
import IMAGES from "../../../../assets/images";
import Typography from "../../../../components/UI/Typography";
import { FaFacebook, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import { TeacherData } from "./TeacherTypes";

interface ProfileProps {
  onAdd?: () => void;
  onEdit?: any;
  hasEditAccess: boolean;
  data: TeacherData;
}

const Introduction: React.FC<ProfileProps> = ({
  onEdit,
  hasEditAccess,
  data,
}) => {
  return (
    <>
      <Col span={24} sm={24} md={24} lg={10} xl={8}>
        <GenericCard>
          <div className="p-1">
            {hasEditAccess && (
              <div className="flex justify-end">
                <CiEdit size={25} color="#8970D6" className="cursor-pointer" onClick={() => onEdit("1")} />
              </div>
            )}
            <div className="flex lg:block xl:flex items-center gap-10">
              <img
                src={data?.imageUrl || IMAGES.STUDENT_PROFILE}
                alt="description"
                className="w-52 h-52 rounded-full"
              />
              <div>
                <Typography variant="headingOneLight" className="mt-3">
                  {data?.fullName || " "}
                </Typography>
                {/* <Rate defaultValue={5} className="" /> */}
                <div className="flex gap-5 mt-5">
                  {data?.linkedinProfileLink && (
                    <a
                      href={data?.linkedinProfileLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      <FaLinkedin size={30} fill="#0077B5" />
                    </a>
                  )}

                  {data?.facebookProfileLink && (
                    <a
                      href={data?.facebookProfileLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      <FaFacebook size={30} fill="#0065F7" />
                    </a>
                  )}

                  {data?.twitterProfileLink && (
                    <a
                      href={data?.twitterProfileLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      <FaSquareXTwitter size={30} fill="#000000" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div>
            <div>
              <Row gutter={[0, 5]} className="mt-10">
                <Col span={8}>
                  <Typography
                    variant="bodyLargeMedium"
                    className="!text-[#666666]"
                  >
                    Email:
                  </Typography>
                </Col>
                <Col span={16} lg={24} xl={12}>
                  <Typography
                    variant="bodyXLargeRegular"
                    className="!text-[#333333]"
                  >
                    {data?.email}
                  </Typography>
                </Col>

                <Col span={8}>
                  <Typography
                    variant="bodyLargeMedium"
                    className="!text-[#666666]"
                  >
                    Contact:
                  </Typography>
                </Col>
                <Col span={16}>
                  <Typography
                    variant="bodyXLargeRegular"
                    className="!text-[#333333]"
                  >
                    {data?.phoneNumber || "N/A"}
                  </Typography>
                </Col>

                <Col span={8}>
                  <Typography
                    variant="bodyLargeMedium"
                    className="!text-[#666666]"
                  >
                    Address:
                  </Typography>
                </Col>
                <Col span={16}>
                  <Typography
                    variant="bodyXLargeRegular"
                    className="!text-[#333333]"
                  >
                    {data?.address || "N/A"}
                  </Typography>
                </Col>

                <Col span={8}>
                  <Typography
                    variant="bodyLargeMedium"
                    className="!text-[#666666]"
                  >
                    CNIC:
                  </Typography>
                </Col>
                <Col span={16}>
                  <Typography
                    variant="bodyXLargeRegular"
                    className="!text-[#333333]"
                  >
                    {data?.cnic || "N/A"}
                  </Typography>
                </Col>

                <Col span={8}>
                  <Typography
                    variant="bodyLargeMedium"
                    className="!text-[#666666]"
                  >
                    Age:
                  </Typography>
                </Col>
                <Col span={16}>
                  <Typography
                    variant="bodyXLargeRegular"
                    className="!text-[#333333]"
                  >
                    {data?.age || "N/A"}
                  </Typography>
                </Col>
              </Row>
            </div>

            <Divider className="bg-[#999999]"></Divider>

            <div>
              <Typography variant="bodyLargeMedium" className="!text-[#666666]">
                About Me
              </Typography>
              <Typography
                variant="bodyXLargeRegular"
                className="!text-[#333333]"
              >
                {data?.describeYourSelf || "N/A"}
              </Typography>
            </div>
          </div>
        </GenericCard>
      </Col>
    </>
  );
};

export default Introduction;
