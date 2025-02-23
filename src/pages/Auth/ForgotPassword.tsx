import { Col, Form, Row } from "antd";
import Typography from "../../components/UI/Typography";
import InputField from "../../components/Form/InputField";
import { MdOutlineMail } from "react-icons/md";
import GenericButton from "../../components/UI/GenericButton";
import { useNavigate } from "react-router-dom";
import PATH from "../../navigation/Path";
import { useForgotMutation } from "../../redux/slices/auth";
import useNotification from "../../components/UI/Notification";
import { getErrorMessage } from "../../utils/helper";
import { ForgotRequestDTO } from "./type";
import useGenericAlert from "../../components/Hooks/GenericAlert";
import STRINGS from "../../utils/strings";
import IMAGES from "../../assets/images";

const Index = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const { openNotification, contextHolder } = useNotification();
	const [forgot, { isLoading: isForgotLoading }] = useForgotMutation();
	const { showAlert } = useGenericAlert();

	const onFinish = async (values: ForgotRequestDTO) => {
		try {
			const { data, error } = await forgot(values?.email);

			if (data) {
				showAlert({
					type: "success",
					title: `Password Sent Successful!`,
					message: `A new password has been sent to your email. Please check your inbox
						and use the new password to log in`,
					confirmButtonText: "OK",
					onConfirm: () => navigate(PATH.LOGIN),
				});
			} else {
				openNotification({
					type: "error",
					title: getErrorMessage(error),
				});
			}
		} catch (error: unknown) {
			openNotification({
				type: "error",
				title: getErrorMessage(error),
			});
		}
	};
	const signinRedirect = () => {
		navigate(PATH.LOGIN);
	};

	return (
		<>
			{contextHolder}
			<div
				className=" justify-center flex custom-select-height h-screen form-fields-custom-css"
				style={{
					backgroundImage: `url(${IMAGES.LMS_IMAGE})`,
				}}
			>
				<div className="absolute inset-0 bg-[#8970d6] opacity-95 " />
				<Row gutter={24} className="flex justify-center w-full h-full">
					<Col sm={24} lg={12} xl={12} md={24} span={24}>
						<div className="w-full relative bg-contain bg-center ">
							<div
								className="flex w-full h-full lg:justify-start justify-center
							 lg:items-center items-start  translate-x-2 lg:translate-x-28 
							 lg:translate-y-[35vh] xl:translate-y-[29vh] sm:translate-y-[2vh] translate-y-10"
							>
								{/* <img
									src={IMAGES.ALMS_LOGO_NEW2}
									alt="LMS Logo"
									className="z-10"
									style={{
										width: "clamp(200px, 30vw, 500px)",
										height: "clamp(50px, 20vw, 500px)",
									}}
								/> */}
							</div>
						</div>
					</Col>

					<Col
						sm={24}
						lg={8}
						md={18}
						className="overflow-scroll m-auto"
						span={22}
					>
						<div className="w-full flex flex-col justify-center">
							<Typography
								variant="headingOneLight"
								noMargin
								className="text-center dark:text-white justify-center text-white"
							>
								Forgot your Password
							</Typography>

							<div className="flex justify-center items-center mt-1 ">
								<Typography variant="bodyMediumRegular" className="text-white">
									Confirm your email, rest password is sent to your email
								</Typography>
							</div>

							<Form
								name="normal_login"
								className="login-form mt-10"
								initialValues={{}}
								autoComplete="off"
								form={form}
								onFinish={onFinish}
							>
								<div>
									<InputField
										name="email"
										rules={[
											{
												required: true,
												message: `${STRINGS.EMAIL} is required`,
											},
										]}
										autoComplete="off"
										inputPrefix={<MdOutlineMail />}
										placeholder="Email"
										inputType="input"
										margin="medium"
										size="large"
									/>
								</div>
								<GenericButton
									label="Send Email"
									htmlType="submit"
									color="primary"
									block={true}
									className="login-form-button !h-12 mt-12"
									disabled={isForgotLoading}
									loading={isForgotLoading}
								/>
							</Form>
							<GenericButton
								label="Back to Sign in"
								htmlType="submit"
								color="primary"
								variant="outlined"
								block={true}
								className="login-form-button !h-12 mt-5"
								disabled={isForgotLoading}
								onClick={signinRedirect}
							/>
						</div>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default Index;
