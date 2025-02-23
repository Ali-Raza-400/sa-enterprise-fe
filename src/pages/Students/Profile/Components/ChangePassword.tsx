import { Col, Form } from "antd";
import Typography from "../../../../components/UI/Typography";
import FormFieldGroup, {
  FieldProps,
} from "../../../../components/Form/FormFieldGroup";
import GenericButton from "../../../../components/UI/GenericButton";
import { useSelector } from "react-redux";
import { useUpdatePasswordMutation } from "../../../../redux/slices/auth";
import { UpdatePasswordResponseDTO } from "../../../Auth/type";
import useNotification from "../../../../components/UI/Notification";
import GenericCard from "../../../../components/UI/GenericCard";

const ChangePassword = () => {
  const { openNotification, contextHolder } = useNotification();

  const { user } = useSelector((state: any) => state.auth);
  console.log(user?.email, "Change Password");

  const [updatePassword, { isLoading: isUpdateLoading }] =
    useUpdatePasswordMutation();
  const [form] = Form.useForm();

  const handleFinish = async (values: UpdatePasswordResponseDTO) => {
    const payload = {
      ...values,
    };
    delete payload.confirmPassword;

    try {
      await updatePassword(payload).unwrap();
      openNotification({
        type: "success",
        description: "Updated Password Successfully",
      });
      form.resetFields();
    } catch (error: unknown) {
      openNotification({
        type: "error",
        description: "Password must contains one upper letter,number and a special character",
      });
      console.error("Error updating password:", error);
    }
  };

  const fieldsConfig: FieldProps[] = [
    {
      type: "input",
      label: "Email",
      name: "email",
      placeholder: "Enter Email",
      rules: [{ required: true, message: "Email is required" }],
      disabled: true,
    },
    {
      type: "password",
      label: "New Password",
      name: "password",
      placeholder: "Enter New Password",
      rules: [{ required: true, message: "New password is required" }],
    },
    {
      type: "password",
      label: "Confirm New Password",
      name: "confirmPassword",
      placeholder: "Enter Confirm New Password",
      rules: [
        {
          required: true,
          message: "Please confirm your password",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Passwords do not match!"));
          },
        }),
      ],
    },
  ];

  return (
    <>
      {contextHolder}
      <GenericCard noMargin={true}>
        <div className="flex justify-between mt-3 mb-5">
          <Typography variant="headingFour">Change Password</Typography>
        </div>

        <Form
          form={form}
          onFinish={handleFinish}
          initialValues={{
            email: user?.email,
          }}
        >
          <Col span={24} sm={24} md={24} lg={18} xl={16}>
            <FormFieldGroup fieldsConfig={fieldsConfig} fieldsColSpan={24} />
          </Col>

          {/* Action buttons */}
          <div className="flex justify-end gap-5">
            <GenericButton
              label="Update"
              htmlType="submit"
              disabled={isUpdateLoading}
              loading={isUpdateLoading}
            />
          </div>
        </Form>
      </GenericCard>
    </>
  );
};

export default ChangePassword;
