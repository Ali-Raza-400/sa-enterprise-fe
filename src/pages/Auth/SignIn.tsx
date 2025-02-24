import { Col, Row, Button, Form } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Typography from "../../components/UI/Typography";
import { useLoginMutation } from "../../redux/slices/auth";
import { setCredentials, setTheme } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getErrorMessage, setThemeInLS, setUser } from "../../utils/helper";
import InputField from "../../components/Form/InputField";
import STRINGS from "../../utils/strings";
// import CheckboxField from "../../components/Form/CheckboxField";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AuthResponseDTO, LoginRequestDTO } from "./type";
import GenericButton from "../../components/UI/GenericButton";
// import { FcGoogle } from "react-icons/fc";
import useNotification from "../../components/UI/Notification";
import IMAGES from "../../assets/images";
import PATH from "../../navigation/Path";
// import SocialLogins from "./Shared/SocialLogins";

function Index() {
	const { openNotification, contextHolder } = useNotification();
	const dispatch = useDispatch();
	const [login, { isLoading: isLoginLoading }] = useLoginMutation();
	const navigate = useNavigate();
	const { user } = useSelector((state: any) => state.auth);

	console.log("user:::", user);

	const onFinish = async (values: LoginRequestDTO) => {
		dispatch(setTheme("LIGHT"));
		setThemeInLS("LIGHT");
		try {
			const { data, error }: any = await login(values);
			const obj = {
				...data,
				interest: data?.interest?.[0]?.interest,
			};
			if (!error) {
				setUser(obj as AuthResponseDTO);
				dispatch(setCredentials(data));
				navigate("/");
			} else {
				console.log(error, "err");
				if (error?.response?.status === 403) {
					const temp = {
						email: values?.email,
					};
					setUser(temp as AuthResponseDTO);
					dispatch(setCredentials(temp));
					navigate(PATH.OTP_SCREEN);
				} else {
					openNotification({
						type: "error",
						title: getErrorMessage(error),
					});
				}
			}
		} catch (error: unknown) {
			console.log(error, "ERRO");

			openNotification({
				type: "error",
				title: getErrorMessage(error),
			});
		}
	};

	const signupRedirect = () => {
		console.log("Running signup redirect")
		// navigate("/signup");
		// navigate(PATH.CLOSED); //for closing-signup
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
				<div className="absolute inset-0 bg-[green] opacity-95 " />
				<Row gutter={24} className="flex justify-center w-full h-full ">
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
						xl={8}
						md={18}
						className="overflow-scroll m-auto"
						span={22}
					>
						<div className="w-full flex flex-col justify-center">
							<Typography
								variant="headingOneLight"
								noMargin
								className="text-center justify-center  text-white"
							>
								Hello Again!
							</Typography>

							<Typography
								variant="bodyMediumRegular"
								className="text-center mt-1 justify-center text-white"
							>
								Welcome back, you’ve been missed!
							</Typography>

							<Form
								name="normal_login"
								className="login-form mt-10"
								initialValues={{}}
								onFinish={onFinish}
								autoComplete="off"
							>
								<InputField
									name="email"
									rules={[
										{
											required: true,
											message: `${STRINGS.EMAIL} is required`,
										},
									]}
									autoComplete="off"
									inputPrefix={<UserOutlined />}
									placeholder={STRINGS.EMAIL}
									inputType="input"
								/>

								<InputField
									name="password"
									rules={[
										{
											required: true,
											message: `${STRINGS.PASSWORD} is required`,
										},
									]}
									autoComplete="off"
									placeholder={STRINGS.PASSWORD}
									inputType="password"
									inputPrefix={<LockOutlined />}
									margin="small"
								/>

								<div className="flex justify-end">
									<Link
										to="/forgot-password"
										className="text-[#5F646D] bodyMediumRegular hover:text-[#5F646D] text-white"
									>
										Forgot Password?
									</Link>
								</div>

								{/* <CheckboxField
            type="checkbox"
            name="remember"
            valuePropName="checked"
            label={STRINGS.REMEMBER_ME}
          /> */}

								<Button
									type="primary"
									htmlType="submit"
									size="large"
									className="login-form-button w-full mt-10 mb-5 text-white !h-12"
									disabled={isLoginLoading}
									loading={isLoginLoading}
								>
									Sign In
								</Button>

								{/* <GenericButton
                  color="primary"
                  label="Continue with Google"
                  block={true}
                  icon={<FcGoogle size={24} />}
                  variant="outlined"
                  disabled={isLoginLoading}
                /> */}

								{/* <SocialLogins /> */}

								<div className="flex justify-center items-center mt-10 ">
									<span className="text-base text-white">
										Don’t have an account ?
									</span>
									<GenericButton
										color="primary"
										variant="link"
										label="Sign up"
										className="p-1 !min-w-0"
										onClick={signupRedirect}
									/>
								</div>
							</Form>
						</div>
					</Col>
				</Row>
				<Outlet />
			</div>
		</>
	);
}
export default Index;
