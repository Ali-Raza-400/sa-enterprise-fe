import React from "react";
import { CustomButtonProps } from "./GenericButton";
import { Input, InputProps } from "antd";
import { FiSearch } from "react-icons/fi";

interface SearchFilterProps {
	position?: "start" | "end";
	filterBtnProps?: CustomButtonProps;
	searchProps?: InputProps;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
	// position = "start",
	// filterBtnProps,
	searchProps,
}) => {
	return (
		<div className="flex flex-col sm:flex-row justify-between mb-5">
			<div className="flex gap-2 items-center w-full sm:w-[20rem]">
				{/* {position === "start" && (
					<GenericButton
						className="!min-w-12 !h-[2.7rem] sm:mb-0 hide-on-mobile"
						variant="solid"
						icon={<LuSlidersHorizontal size={20} />}
						{...filterBtnProps}
					/>
				)} */}
				<Input
					className="custom-input w-full"
					suffix={<FiSearch size={20} />}
					{...searchProps}
				/>
				{/* {position === "end" && (
					<GenericButton
						className="!min-w-12 !h-[2.7rem] sm:mb-0 hide-on-mobile"
						variant="solid"
						icon={<LuSlidersHorizontal size={20} />}
						{...filterBtnProps}
					/>
				)} */}
			</div>
		</div>
	);
};

export default SearchFilter;
