import { Rate } from "antd";
import Typography from "../../../components/UI/Typography";

interface RatingComponentProps {
	isHotRating?: boolean;
	rating?: number;
	reviewCount?: number;
}

const RatingComponent: React.FC<RatingComponentProps> = ({
	rating,
	reviewCount,
}) => {
	return (
		<>
			<div className="flex space-x-2 mt-1">
				<div className="flex items-center gap-4 mt-2">
					<Typography variant="bodyMediumRegular" className="text-[#5F646D] ">
						{rating}
					</Typography>
					<Rate className="text-sm md:text-lg text-[#FADB14] " value={rating} />
					<Typography variant="bodyMediumRegular" className="text-[#5F646D] !text-[12px] !md:text-[14px]">
						({reviewCount})
					</Typography>
				</div>
			</div>
		</>
	);
};

export default RatingComponent;
