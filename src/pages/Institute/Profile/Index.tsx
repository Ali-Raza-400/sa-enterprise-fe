import IMAGES from "../../../assets/images";
import Typography from "../../../components/UI/Typography";
import { Col, Divider, Form, Row } from "antd";
import SearchFilter from "../../../components/UI/SearchFilter";
// import CourseCard from "../../Courses/Shared/CourseCard";
import { useDispatch, useSelector } from "react-redux";
// import GenericCard from "../../../components/UI/GenericCard";
// import { useGetInstituteByIdQuery } from "../../../redux/slices/institute";
import PageLoader from "../../../components/Loader/PageLoader";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import GenericModal from "../../../components/UI/GenericModal";
import FormFieldGroup, {
  FieldProps,
} from "../../../components/Form/FormFieldGroup";
import GenericUpload from "../../../components/UI/GenericRoundUploader";
import { AuthResponseDTO } from "../../Auth/type";
import { getUser, setUser } from "../../../utils/helper";
import { setCredentials } from "../../../redux/features/authSlice";
import { useUpdateUserProfileMutation } from "../../../redux/slices/user";
// import PublishedCourses from "../../Courses/List/Published/Index"
import { useGetInstituteByIdQuery } from "../../../redux/slices/institute";
import PublishedContent from "../../Courses/List/Published/Index";
import { FaFacebook, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import GenericCard from "../../../components/UI/GenericCard";

interface AddModal {
  show: boolean;
  type: string;
}

const Index = () => {
  const published = PublishedContent();

  const [form] = Form.useForm();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const dispatch = useDispatch();

  const [addModal, setAddModal] = useState<AddModal>({ show: false, type: "" });

  const closeModal = () => {
    setAddModal({ show: false, type: "" });
  };

  const showModal = () => {
    setAddModal({ show: true, type: "Edit Profile" });
  };

  const { user } = useSelector((state: any) => state.auth);
  const { isLoading } = useGetInstituteByIdQuery(user?.id);

  const handleFinish = async (values: AuthResponseDTO) => {
    const payload = {
      ...values,
      role: user?.role,
    };
    delete payload.email;

    const userId = user?.id;

    try {
      await updateUserProfile({ payload, userId })
        .unwrap()
        .then((response) => {
          const existingToken = getUser()?.access_token;
          const updatedUserData = { ...response, access_token: existingToken };
          setUser(updatedUserData as AuthResponseDTO);
          dispatch(setCredentials(updatedUserData));
        });
     
    } catch (error: unknown) {
      console.error("Error updating password:", error);
    }
    closeModal();
  };

  const profileData = [
    { label: "Name", value: user?.fullName },
    { label: "Phone Number", value: user?.phoneNumber },
    { label: "Email", value: user?.email },
    { label: "Address", value: user?.address },

    // { label: "Facebook Profile Link", value: user?.facebookProfileLink },
    // { label: "LinkedIn Profile Link", value: user?.linkedinProfileLink },
    // { label: "Twitter Profile Link", value: user?.twitterProfileLink },
  ];

  const ProfileFieldsConfig: FieldProps[] = [
    {
      type: "custom-component",
      label: "Profile Picture",
      name: "imageUrl",
      placeholder: "Upload Profile Picture",
      colSpan: 12,
      customComponent: <GenericUpload form={form} name="imageUrl" />,
    },
    {
      type: "input",
      label: "Name",
      name: "fullName",
      placeholder: "Enter Full Name",
      colSpan: 12,
      rules: [{ required: true, message: "Please enter name" }],
    },
    {
      type: "input",
      label: "Email",
      name: "email",
      disabled: true,
      placeholder: "Enter Email",
      colSpan: 12,
      rules: [{ required: true, message: "Please enter email" }],
    },
    {
      type: "input",
      label: "Address",
      name: "address",
      placeholder: "Enter Address",
      colSpan: 12,
    },
    {
      type: "input",
      label: "Mobile",
      name: "phoneNumber",
      placeholder: "Enter Contact Number",
      colSpan: 12,
      rules: [{ required: true, message: "Please enter mobile" }],
    },
    {
      type: "input",
      label: "Facebook Profile Link",
      name: "facebookProfileLink",
      placeholder: "Enter Facebook Profile Link",
      colSpan: 12,
      rules: [
        {
          pattern: /^https?:\/\/.+$/,
          message: "Enter a valid URL starting with http or https.",
        }
        
      ],
    },
    {
      type: "input",
      label: "LinkedIn Profile Link",
      name: "linkedinProfileLink",
      placeholder: "Enter LinkedIn Profile Link",
      colSpan: 12,
      rules: [
        {
          pattern: /^https?:\/\/.+$/,
          message: "Enter a valid URL starting with http or https.",
        }
        
      ],
    },
    {
      type: "input",
      label: "Twitter Profile Link",
      name: "twitterProfileLink",
      placeholder: "Enter Twitter Profile Link",
      colSpan: 12,
      rules: [
        {
          pattern: /^https?:\/\/.+$/,
          message: "Enter a valid URL starting with http or https.",
        }
        
      ],
    },
    {
      type: "textarea",
      label: "About",
      name: "describeYourSelf",
      placeholder: "Describe Yourself",
      colSpan: 24,
      rows: 4,
    },
  ];

  return isLoading ? (
    <PageLoader />
  ) : (
    <>
      <div className="flex justify-end">
        <EditOutlined
          className="text-[1.5rem] text-[#8970D6] cursor-pointer"
          onClick={showModal}
        />
      </div>
      <GenericCard>
        <Row gutter={32} className="mt-5 mb-10">
          <Col span={6} sm={10} md={9} lg={8} xl={6}>
            <img
              src={user ? user?.imageUrl : IMAGES.Institute}
              alt="description"
              className="w-full h-[300px] rounded-[0.5rem]"
            />

            <div className="flex justify-center gap-10 mt-8">
              {user?.linkedinProfileLink && (
                <a
                  href={user?.linkedinProfileLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  <FaLinkedin size={30} fill="#0077B5" />
                </a>
              )}

              {user?.facebookProfileLink && (
                <a
                  href={user?.facebookProfileLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  <FaFacebook size={30} fill="#0065F7" />
                </a>
              )}

              {user?.twitterProfileLink && (
                <a
                  href={user?.twitterProfileLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  <FaSquareXTwitter size={30} fill="#000000" />
                </a>
              )}
            </div>
          </Col>

          <Col span={18} sm={14} md={15} lg={16} xl={18}>
            <>
              <Row>
                {profileData.map((item: any, index: any) => (
                  <Col key={index} span={24} md={12} xl={12} className="mt-5">
                    <Typography
                      variant="bodyLargeMedium"
                      className="!text-[#666666]"
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="bodyXLargeRegular"
                      className="!text-[#333333]"
                    >
                      {item.value || "N/A"}
                    </Typography>
                  </Col>
                ))}
              </Row>
              <Divider />
              <div className="mt-5">
                <Typography
                  variant="bodyLargeMedium"
                  className="!text-[#666666]"
                >
                  Introduction
                </Typography>
                <Typography
                  variant="bodyXLargeRegular"
                  className="!text-[#333333]"
                >
                  {user?.describeYourSelf || "N/A"}
                </Typography>
              </div>
            </>
          </Col>
        </Row>
      </GenericCard>

      <Divider />

      <div className="flex justify-between px-2">
        <Typography variant="headingThreeLight">Course Offering</Typography>
        <SearchFilter />
      </div>

      <GenericCard>
        <div className="mt-10">{published.gridContent}</div>
      </GenericCard>

      <Form form={form} initialValues={{ ...user }} onFinish={handleFinish}>
        <GenericModal
          onClose={closeModal}
          show={addModal.show}
          width={750}
          title={addModal.type === "Edit Profile" ? "Edit Profile" : ""}
          onOk={() => form.submit()}
        >
          {addModal.type === "Edit Profile" && (
            <div>
              <Row gutter={[24, 24]}>
                <Col span={24} className="mt-5">
                  <FormFieldGroup fieldsConfig={ProfileFieldsConfig} />
                </Col>
              </Row>
            </div>
          )}
        </GenericModal>
      </Form>
    </>
  );
};

export default Index;
