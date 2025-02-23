import { ReactElement, useState } from "react";
import { Col, Form, GetProp, message, Row, Upload, UploadProps } from "antd";
import { LuImagePlus } from "react-icons/lu";
import { useSelector } from "react-redux";
import { RegisterRequestDTO } from "../../../Auth/type";
import GenericCard from "../../../../components/UI/GenericCard";
import GenericButton from "../../../../components/UI/GenericButton";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const CreateUpdate = (): ReactElement => {

  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const { user } = useSelector((state:any) => state.auth);

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleFormFinish = async (values: RegisterRequestDTO) => {
    const payload = {
      ...values,
      instituteId: user?.id,
    };
    delete payload.profileImage;
    delete payload.describeYourSelf;
  };

  const uploadButton = (
    <button
      className="border-none bg-none flex flex-col items-center justify-center"
      type="button"
    >
      {loading ? "Uploading..." : <LuImagePlus size={80} color="#FCAB60" />}
      <div style={{ marginTop: 8 }}>Choose Profile Picture</div>
    </button>
  );

  const [form] = Form.useForm();
  return (
    <>
      {/* {contextHolder} */}
      <GenericCard>
        <Form form={form} onFinish={handleFormFinish}>
          <Row>
            <Col span={8} sm={12} md={12} lg={8}>
              <Form.Item name="profileImage">
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
              </Form.Item>
            </Col>
            <Col span={24} className="flex justify-end">
              <GenericButton
                label="Save"
                htmlType="submit"
              />
            </Col>
          </Row>
        </Form>
      </GenericCard>
    </>
  );
};

export default CreateUpdate;
