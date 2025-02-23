import { ReactElement} from "react";
import GenericCard from "../../components/UI/GenericCard";
import { Col, Form, Row} from "antd";
// import { LuImagePlus } from "react-icons/lu";
import FormFieldGroup, {
  FieldProps,
} from "../../components/Form/FormFieldGroup";
import GenericButton from "../../components/UI/GenericButton";
import { RegisterRequestDTO } from "../Auth/type";
import { useRegisterMutation } from "../../redux/slices/auth";
import { LOOKUP_TYPES } from "../../utils/lookup";
import { getErrorMessage } from "../../utils/helper";
import useNotification from "../../components/UI/Notification";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PATH from "../../navigation/Path";
import useGenericAlert from "../../components/Hooks/GenericAlert";
// type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

// const getBase64 = (img: FileType, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };

// const beforeUpload = (file: FileType) => {
//   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//   if (!isJpgOrPng) {
//     message.error("You can only upload JPG/PNG file!");
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error("Image must smaller than 2MB!");
//   }
//   return isJpgOrPng && isLt2M;
// };

const CreateUpdate = (): ReactElement => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [imageUrl, setImageUrl] = useState<string>();
  const [registerFunc, { isLoading }] = useRegisterMutation();
  const { openNotification, contextHolder } = useNotification();
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const { showAlert } = useGenericAlert();

//   const handleChange: UploadProps["onChange"] = (info) => {
//     if (info.file.status === "uploading") {
//       setLoading(true);
//       return;
//     }
//     if (info.file.status === "done") {
//       getBase64(info.file.originFileObj as FileType, (url) => {
//         setLoading(false);
//         setImageUrl(url);
//       });
//     }
//   };

  const handleFormFinish = async (values: RegisterRequestDTO) => {
    const payload = {
      ...values,
      instituteId: user?.id,
    };
    delete payload.profileImage;
    delete payload.describeYourSelf;
    try {
      await registerFunc(payload)
        .unwrap()
        .then(() =>
          showAlert({
            type: "success",
            title: `Teacher Added`,
            message: `Teacher added successfully. A password has been sent to the provided email.`,
            onConfirm: () => navigate(PATH.MANAGE_TEACHER),
          })
        );

      form.resetFields();
    } catch (error: unknown) {
      openNotification({
        type: "error",
        title: getErrorMessage(error),
      });
    }
  };

//   const uploadButton = (
//     <button
//       className="border-none bg-none flex flex-col items-center justify-center"
//       type="button"
//     >
//       {loading ? "Uploading..." : <LuImagePlus size={80} color="#FCAB60" />}
//       <div style={{ marginTop: 8 }}>Choose Profile Picture</div>
//     </button>
//   );

  const fielldsConfig: FieldProps[] = [
    {
      type: "radioGroup",
      label: "Type",
      name: "role",
      items: [
        { value: LOOKUP_TYPES.Role.TEACHER, label: "Teacher" },
        {
          value: LOOKUP_TYPES.Role.TEACHING_ASSISTANT,
          label: "Assistant Teacher",
        },
      ],
      rules: [{ required: true, whitespace: true ,message: "Type is required" }],
    },
    {
      type: "input",
      label: "Name",
      name: "fullName",
      placeholder: "Enter Full Name",
      rules: [{ required: true, whitespace: true, message: "Full name is required" }],
    },
    {
      type: "input",
      label: "Email",
      name: "email",
      placeholder: "Enter Email",
      rules: [{ required: true, whitespace: true, message: "Email is required" }],
    },
    {
      type: "input",
      label: "CNIC",
      name: "cnic",
      placeholder: "Enter CNIC",
      rules: [{ required: true, whitespace: true, message: "Cnic is required" }],
    },

    {
      type: "input",
      label: "Mobile",
      name: "phoneNumber",
      placeholder: "03001234567",
      rules: [{ required: true, whitespace: true, message: "Phone number is required" }],
    },
    {
      type: "input",
      label: "Address",
      name: "address",
      placeholder: "Enter Address",
      rules: [{message: "Phone number is required" }],
    },
    {
      type: "number",
      label: "Age",
      name: "age",
      placeholder: "Enter Age",
      // rules: [{ required: true, message: "Please enter age" }],
    },

    {
      type: "input",
      label: "Facebook Profile Link",
      name: "facebookProfileLink",
      placeholder: "https://www.facebook.com/username",
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
      placeholder: "https://www.linkedin.com/in/username",
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
      placeholder: "https://www.twitter.com/username",
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
      colBreakPoints: { xs: 24, lg: 24, md: 24, sm: 24, xl: 24, xxl: 24 },
      rows: 4,
    },
  ];
  const [form] = Form.useForm();
  return (
    <>
      {contextHolder}
      <GenericCard noMargin>
        {/* <Form form={form} onFinish={(values) => console.log(values, "ZAIN")}> */}
        <Form form={form} onFinish={handleFormFinish}>
          <Row className="flex justify-center">
            {/* <Col span={8} sm={12} md={12} lg={8}> */}
              {/* <Form.Item name="profileImage">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader w-full profile-upload"
                  showUploadList={false}
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item> */}
            {/* </Col> */}
            <Col span={24} lg={20} xl={14}>
              <FormFieldGroup
                fieldsConfig={fielldsConfig}
                fieldsColSpan={12}
                fieldsColBreakPoints={{
                  xs: 24,
                  sm: 24,
                  md: 24,
                  lg: 12,
                  xl: 12,
                  xxl: 12,
                }}
              />
            </Col>
            <Col span={24} className="flex justify-end">
              <GenericButton
                label="Save"
                htmlType="submit"
                loading={isLoading}
                disabled={isLoading}
              />
            </Col>
          </Row>
        </Form>
      </GenericCard>
    </>
  );
};

export default CreateUpdate;
