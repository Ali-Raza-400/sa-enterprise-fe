import { Tooltip } from "antd";

export const TruncatedText = ({
	text,
	width,
	lineClamp = false,
}: {
	text: string;
	width: number;
	lineClamp?: boolean;
}) => (
	<Tooltip title={text}>
		{lineClamp ? (
			<div style={{ width }} className="overflow-hidden text-ellipsis">
				<span className="line-clamp-2">{text}</span>
			</div>
		) : (
			<div className="truncate" style={{ width: width }}>
				{text}
			</div>
		)}
	</Tooltip>
);
