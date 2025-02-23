import { Col, Form, Row } from "antd";
import GenericButton from "../../components/UI/GenericButton";
import STRINGS from "../../utils/strings";
import InputField from "../../components/Form/InputField";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { MdOutlineLocationOn, MdOutlineMail } from "react-icons/md";
import RadioGroup from "../../components/Form/RadioGroup";
import { useRegisterMutation } from "../../redux/slices/auth";
import { getErrorMessage } from "../../utils/helper";
import useNotification from "../../components/UI/Notification";
import { RegisterRequestDTO } from "./type";
import PATH from "../../navigation/Path";
import { useNavigate } from "react-router-dom";
import useGenericAlert from "../../components/Hooks/GenericAlert";
import { FaRegBuilding } from "react-icons/fa6";
import Typography from "../../components/UI/Typography";
import IMAGES from "../../assets/images";

const InstituteSignUp = () => {
	const [form] = Form.useForm();
	const roleName = Form.useWatch("role", form);
	console.log(roleName, "Role NAme");
	const [registerFunc, { isLoading }] = useRegisterMutation();
	const { openNotification, contextHolder } = useNotification();
	const { showAlert } = useGenericAlert();
	const navigate = useNavigate();
	const signinRedirect = () => {
		navigate("/");
	};
	const handleFormFinish = async (values: RegisterRequestDTO) => {
		const payload = {
			...values,
		};
		delete payload.confirmPassword;

		try {
			await registerFunc(payload).unwrap();
			showAlert({
				type: "success",
				title: `Account Created!`,
				message: `You have successfully registered. Welcome to the ALM System`,
				confirmButtonText: "OK",
				onConfirm: () => navigate(PATH.LOGIN),
			});
			form.resetFields();
		} catch (error: unknown) {
			openNotification({
				type: "error",
				title: getErrorMessage(error),
			});
		}
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
				<div className="absolute inset-0 bg-[#8970d6] opacity-95" />
				<Row gutter={24} className="flex justify-center w-full  ">
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

					<Col sm={24} lg={12} md={24} className="overflow-scroll" span={24}>
						<div className="w-full flex flex-col justify-center items-center h-screen">
							<Typography
								variant="headingOneLight"
								noMargin
								className="text-center dark:text-white justify-center text-white "
							>
								Sign Up
							</Typography>

							<div className="flex justify-center items-center mb-4">
								<span className="text-base font-normal">Already a member?</span>
								<GenericButton
									color="primary"
									variant="link"
									label="Sign in"
									className="p-1 !min-w-0"
									onClick={signinRedirect}
								/>
							</div>
							<Row gutter={5}>
								<Col span={24}>
									<Form
										name="normal_login"
										initialValues={{}}
										autoComplete="off"
										onFinish={handleFormFinish}
										form={form}
									>
										<Row gutter={24}>
											<Col span={24}>
												<RadioGroup
													name="role"
													rules={[
														{
															required: true,
															message: `Type is required`,
														},
													]}
													items={[
														{ value: "Institute", label: "Institute" },
														{ value: "Individual", label: "Individual" },
													]}
												/>
											</Col>
										</Row>
										{/* 
						<InputField
							name="fullName"
							rules={[
								{
									required: true,
									message: "Institute name is required",
								},
							]}
							autoComplete="off"
							inputPrefix={<FaRegBuilding />}
							placeholder={STRINGS.INSTITUTE}
							inputType="input"
						/> */}

										{roleName === "Institute" ? (
											<InputField
												name="fullName"
												rules={[
													{
														required: true,
														message: "Institute name is required",
													},
												]}
												autoComplete="off"
												inputPrefix={<FaRegBuilding />}
												placeholder="Institute Name"
												inputType="input"
											/>
										) : (
											<InputField
												name="fullName"
												rules={[
													{
														required: true,
														message: "Individual name is required",
													},
												]}
												autoComplete="off"
												inputPrefix={<UserOutlined />}
												placeholder="Individual Name"
												inputType="input"
											/>
										)}

										<InputField
											name="email"
											rules={[
												{ required: true, message: "Email is required" },
												{ type: "email", message: "Email is invalid" },
											]}
											autoComplete="off"
											inputPrefix={<MdOutlineMail />}
											placeholder={STRINGS.EMAIL}
											inputType="input"
										/>

										<InputField
											name="address"
											rules={[
												{
													required: true,
													message: `${STRINGS.ADDRESS} is required`,
												},
											]}
											autoComplete="off"
											inputPrefix={<MdOutlineLocationOn />}
											placeholder={STRINGS.ADDRESS}
											inputType="input"
										/>

										<Row gutter={24}>
											<Col span={12}>
												<InputField
													name="password"
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
											</Col>

											<Col span={12}>
												<InputField
													name="confirmPassword"
													dependencies={["password"]}
													rules={[
														{
															required: true,
															message: `Confirm password is required`,
														},
														({ getFieldValue }) => ({
															validator(_, value) {
																if (
																	!value ||
																	getFieldValue("password") === value
																) {
																	return Promise.resolve();
																}
																return Promise.reject(
																	new Error("Passwords do not match!")
																);
															},
														}),
													]}
													autoComplete="off"
													placeholder="Confirm Password"
													inputType="password"
													inputPrefix={<LockOutlined />}
													margin="medium"
												/>
											</Col>
										</Row>

										<InputField
											name="describeYourSelf"
											rules={[
												{
													required: true,
													message: "Introduction is required",
												},
											]}
											autoComplete="off"
											inputPrefix={<MdOutlineLocationOn />}
											placeholder={STRINGS.INTRODUCTION}
											inputType="textarea"
											rows={3}
										/>

										<Col span={24} className="mt-16 gap-6 space-y-5">
											<GenericButton
												color="primary"
												block={true}
												label="Sign Up"
												htmlType="submit"
												loading={isLoading}
												disabled={isLoading}
											/>

											{/* <GenericButton
												color="primary"
												label="Continue with Google"
												block={true}
												icon={<FcGoogle size={24} />}
												variant="outlined"
												disabled={isLoading}
											/> */}
										</Col>
									</Form>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default InstituteSignUp;
