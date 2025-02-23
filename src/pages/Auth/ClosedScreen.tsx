import { Col, Row } from "antd";
import IMAGES from "../../assets/images";
import Typography from "../../components/UI/Typography";

const ClosedScreen = () => {
	return (
		<>
			<div
				className=" justify-center flex custom-select-height h-screen "
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
						className="overflow-scroll m-auto flex flex-col justify-center gap-10 lg:gap-6 items-center"
						span={24}
					>
						<div className="flex justify-center items-center">
							<img
								src={IMAGES.CLOSED}
								className="w-[50%] flex justify-center items-center"
							/>
						</div>
						<Typography
							variant="headingFive"
							className="!text-white justify-center text-center"
						>
							We are deeply grateful for your incredible support! Thanks to you,
							we’ve surpassed 200,000 registrations.
							<br /> While registrations are now closed, we are excited to
							announce that they will resume soon. Thank you for being a part of
							this journey!
						</Typography>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default ClosedScreen;
