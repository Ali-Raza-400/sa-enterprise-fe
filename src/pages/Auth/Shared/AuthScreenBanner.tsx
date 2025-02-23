// AuthScreenBanner.js
import IMAGES from "../../../assets/images";
// import IMAGES from "../../../assets/images";

const AuthScreenBanner = () => {
	return (
		<div className="w-full relative bg-contain bg-center ">
			<div
				className="flex w-full h-full lg:justify-start justify-center lg:items-center items-start  
              xl:translate-x-32 lg:translate-x-10  lg:translate-y-[45vh] sm:translate-y-[2vh]"
			>
				<img
					src={IMAGES.ALMS_LOGO}
					alt="LMS Logo"
					className="z-10"
					style={{
						width: "clamp(200px, 30vw, 366px)",
						height: "clamp(50px, 20vw, 71px)",
					}}
				/>
			</div>
		</div>
	);
};

export default AuthScreenBanner;
