import React from "react";
import { Segmented, SegmentedProps } from "antd";

export interface OptionType {
	label: string;
	value: string;
}

interface GenericSegmentedProps extends SegmentedProps {
	options: OptionType[];
}

const GenericSegmented: React.FC<GenericSegmentedProps> = ({
	options,
	...props
}) => {
	return (
		<Segmented
			options={options}
			{...props}
			className="custom-segmented"
			block
			size="large"
		/>
	);
};

export default GenericSegmented;
