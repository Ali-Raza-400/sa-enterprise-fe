import { useEffect, useState } from "react";
import { Col, Flex, Row, Input, message } from "antd";
import Typography from "../../components/UI/Typography";
import GenericButton from "../../components/UI/GenericButton";
import IMAGES from "../../assets/images";
import {
	useResendOtpMutation,
	useVerifyOtpMutation,
} from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getErrorMessage, removeUser, setUser } from "../../utils/helper";
import { setCredentials } from "../../redux/features/authSlice";
import type { GetProps } from "antd";
import useNotification from "../../components/UI/Notification";

type OTPProps = GetProps<typeof Input.OTP>;

const Index = () => {
	const [verifyOtp] = useVerifyOtpMutation();
	const [resendOtp] = useResendOtpMutation();
	const [otpCode, setOtpCode] = useState("");
	const { openNotification, contextHolder } = useNotification();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [timer, setTimer] = useState(30);

	const { user } = useSelector((state: any) => state.auth);
	console.log(user, "USER__--");

	// Timer countdown effect
	useEffect(() => {
		let interval: any;
		if (timer > 0) {
			interval = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [timer]);

	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	// Update state with OTP input value on change
	const onChange: OTPProps["onChange"] = (text) => {
		console.log("OTP input value:", text);
		setOtpCode(text);
	};

	// Handle form submission and call API with OTP from state
	const onFinish = async () => {
		if (!user) {
			openNotification({
				type: "error",
				title: `User not found. Please sign up first.`,
			});
			return;
		}
		if (otpCode?.length < 6) {
			openNotification({
				type: "error",
				title: `Please enter a valid 6-digit OTP.`,
			});
			return;
		}
		const payload = {
			otpCode,
			email: user?.email,
		};
		console.log("payload::", payload);
		await verifyOtp(payload)
			.unwrap()
			.then((response) => {
				console.log("response:::", response, user, "user");
				if (!response) {
					openNotification({
						type: "error",
						title: `Failed to verify OTP. Please try again.`,
					});
					return;
				}
				if (response) {
					const updatedUser = {
						...user,
						...response,
						// access_token: user.access_token,
					};

					setUser(updatedUser);
					dispatch(setCredentials(updatedUser));
					message.success("OTP verified successfully!");
				}
			})
			.catch((error) => {
				openNotification({
					type: "error",
					title: getErrorMessage(error),
				});
			});
	};

	const resendOtpHandler = async () => {
		if (timer > 0) return;
		if (!user) {
			openNotification({
				type: "error",
				title: "User not found. Please sign up first.",
			});
			return;
		}
		const payload = {
			email: user?.email,
		};
		resendOtp(payload)
			.then((response) => {
				openNotification({
					type: "success",
					title: "otp send successfully",
				});
				console.log("resend otp response:::", response);
				setTimer(30);
			})
			.catch((error) => {
				openNotification({
					type: "error",
					title: error?.message,
				});
			});
	};

	const sharedProps: OTPProps = {
		onChange,
	};

	return (
		<>
			{contextHolder}
			<div
				className=" justify-center flex custom-select-height h-screen "
				style={{
					backgroundImage: `url(${IMAGES.LMS_IMAGE})`,
				}}
			>
				<div className="absolute inset-0 bg-[#8970d6] opacity-95 " />
				<Row gutter={24} className="flex justify-center w-full h-full ">
					<Col
						sm={24}
						lg={12}
						xl={12}
						md={24}
						span={24}
						className="hidden md:block"
					>
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
										height: "clamp(50px, 15vw, 500px)",
									}}
								/> */}
							</div>
						</div>
					</Col>

					<Col
						sm={24}
						lg={8}
						md={18}
						className="overflow-scroll m-auto "
						span={22}
					>
						<Flex
							vertical
							className="items-center justify-center OTP_CLASS flex-col"
						>
							<img
								src={IMAGES.OTP}
								className="mb-10 w-[120px] sm:w-[150px] md-[200px]"
								alt="OTP Icon"
							/>
							<Typography variant="headingOne" className="text-white pb-2">
								Verify your Email Address
							</Typography>
							<Typography
								variant="bodyLargeBold"
								className="mb-8 text-white text-center"
							>
								Please check your email; you should have received a 6-digit OTP
								code. If you don’t see it in your inbox, please check your spam
								folder
							</Typography>

							{/* OTP Input */}
							<Input.OTP length={6} className="OTP_CLASS" {...sharedProps} />

							{/* Verify Email Button */}
							<GenericButton
								color="primary"
								label="Verify Email"
								block={true}
								variant="solid"
								className="mt-10 !h-12"
								onClick={onFinish} // Trigger API call on button click
							/>

							{/* <Typography
								variant="bodyXLargeMedium"
								className=" my-5 text-white"
							>
								Didn't receive the code?{" "}
								<span
									onClick={resendOtpHandler}
									className="underline text-[#FCAB60] font-bold"
								>
									Resend Code
								</span>
							</Typography> */}

							<Typography
								variant="bodyXLargeMedium"
								className="my-5 text-white"
							>
								Didn't receive the code?{" "}
								{timer > 0 ? (
									<>
										<span
											className={`underline  font-bold text-[#CCCCCC] cursor-not-allowed`}
										>
											Resend Code
										</span>
										<span className="text-[#FCAB60] font-bold">
											{formatTime(timer)}
										</span>
									</>
								) : (
									<span
										onClick={resendOtpHandler}
										className={`underline  font-bold cursor-pointer 
												text-[#FCAB60]
										}`}
									>
										Resend Code
									</span>
								)}
							</Typography>

							<GenericButton
								color="primary"
								label="Back to sign up"
								className="!h-12"
								variant="outlined"
								block
								onClick={() => {
									dispatch(setCredentials(null));
									removeUser();
									navigate("/signup");
								}}
							/>
						</Flex>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default Index;
