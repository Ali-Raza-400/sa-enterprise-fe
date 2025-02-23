import { Col, Form, Row } from "antd";
import Typography from "../../components/UI/Typography";
import AuthScreenBanner from "./Shared/AuthScreenBanner";
import InputField from "../../components/Form/InputField";
import { LockOutlined } from "@ant-design/icons";
import STRINGS from "../../utils/strings";
import GenericButton from "../../components/UI/GenericButton";
import { useNavigate } from "react-router-dom";
import PATH from "../../navigation/Path";
// import { IoArrowBackCircle } from "react-icons/io5";

const Index = () => {
  const navigate = useNavigate();
  const signinRedirect = () => {
    navigate(PATH.LOGIN);
  };
  return (
    <div className="min-h-screen h-full justify-center flex">
      <Row gutter={24} className="flex justify-center w-full h-full">
        <AuthScreenBanner />

        <Col
          span={24}
          sm={16}
          lg={12}
          className="lg:h-full flex justify-center lg:items-center -mt-24 lg:mt-0"
        >
          <div className="w-full max-w-xl p-5">
            <Typography
              variant="headingOneLight"
              noMargin
              className="text-center dark:text-white justify-center text-[#2F3237]"
            >
              Update your Password?
            </Typography>

            <div className="flex justify-center items-center mt-1">
              <Typography variant="bodyMediumRegular">
                Reset your password and don’t share it with anyone.
              </Typography>
            </div>

            <Form
              name="normal_login"
              className="login-form mt-10"
              initialValues={{}}
              autoComplete="off"
            >
              <InputField
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: `${STRINGS.PASSWORD} is required`,
                  },
                ]}
                autoComplete="off"
                placeholder="Password"
                inputType="password"
                inputPrefix={<LockOutlined />}
                margin="medium"
              />

              <InputField
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: `Confirm password is required`,
                  },
                ]}
                autoComplete="off"
                placeholder="Confirm Password"
                inputType="password"
                inputPrefix={<LockOutlined />}
                margin="medium"
              />

              <GenericButton
                label="Update"
                htmlType="submit"
                color="primary"
                block={true}
                className="login-form-button mt-12"
              ></GenericButton>
            </Form>
            <GenericButton
                label="Back to Sign in"
                htmlType="submit"
                color="primary"
                variant="outlined"
                block={true}
                onClick={signinRedirect}
                className="login-form-button mt-5"
              ></GenericButton>
            {/* <div className="flex justify-center items-center mt-10">
              <span className="text-base">Update password ?</span>
              <GenericButton
                variant="link"
                label="Back to Sign in"
                className="p-1 !min-w-0"
                onClick={signinRedirect}
              />
            </div> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
