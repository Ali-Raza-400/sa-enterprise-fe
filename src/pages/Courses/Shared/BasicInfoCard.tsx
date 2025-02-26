// import IMAGES from "../../../assets/images"

import { Flex } from "antd";
import useBuyCourse from "../../../components/Hooks/BuyButton";
import Typography from "../../../components/UI/Typography";
import RatingComponent from "./RatingComponent";
import { useSelector } from "react-redux";
import { LOOKUP_TYPES } from "../../../utils/lookup";
// import IMAGES from "../../../assets/images";

interface BasicInfoCardProps {
	title?: string;
	description?: string;
	creatorName?: string;
	creatorLogo?: string;
	lastUpdated?: string;
	duration?: string;
	className?: string;
	courseId?: string;
}

const BasicInfoCard: React.FC<BasicInfoCardProps> = ({
	title,
	description,
	// creatorName,
	// creatorLogo,
	lastUpdated,
	// duration,
	className,
	courseId,
}) => {
	const { user } = useSelector((state: any) => state.auth);

	const buyCourseButton = useBuyCourse(courseId as string);

	return (
		<>
			<div className={className}>
				<Typography variant="headingThreeLight" className="text-[#1C1C1C] md:text-[1.5rem] text-[1.1rem]">
					{title}
				</Typography>

				<Typography variant="bodyLargeRegular" className="mt-2 text-[#666666]">
					{description}
				</Typography>

				<Flex
					align="baseline"
					justify="space-between"
					className="flex-wrap xs:mt-0"
				>
					<RatingComponent isHotRating={true} rating={4} reviewCount={24} />
					<div className="sm:mt-0 mt-4">
						{user?.role === LOOKUP_TYPES.Role.STUDENT && buyCourseButton}
					</div>
				</Flex>

				<div className="mt-3 flex items-center ">
					<Typography variant="bodyLargeRegular" className="text-[#666666] !text-[14px] md:!text-[16px]">
						Created by
					</Typography>
					{/* <div className="rounded-full ml-3 mr-2 w-8 h-8">
						<img src={IMAGES.ALMS_LOGO_NEW1} alt="Xeven-Logo " />
					</div> */}
					<Typography variant="bodyLargeRegular" className="!text-[14px] md:!text-[16px]">SA-InterPrices</Typography>
					{/* <Typography variant="bodyLargeRegular">{creatorName}</Typography> */}
				</div>

				<div className="flex mt-2">
					<Typography variant="bodyMediumRegular" className="text-[#666666] !text-[14px] md:!text-[16px]">
						Last Updated : {lastUpdated}
					</Typography>

					{/* <div className="flex ml-10 items-center">
						<img src={creatorLogo} alt="Xeven-Logo" />
						<Typography
							variant="bodyMediumRegular"
							className="text-[#666666] ml-2"
						>
							Duration {duration} Hours
						</Typography>
					</div> */}
				</div>
			</div>
		</>
	);
};

export default BasicInfoCard;
