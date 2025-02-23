import React from "react";
import { Card, Col, Row, Tag } from "antd";
import Typography from "../../../../components/UI/Typography";

import { CiClock1 } from "react-icons/ci";

interface GenericCardProps {
	title?: string;
	deadline?: string;
	number?: string;
	onClick?: () => void;
	className?: string;
}

const GenericCard: React.FC<GenericCardProps> = ({
	title,
	deadline,
	// number,
	onClick,
	className,
}) => {
	return (
		<Card
			hoverable
			className={`hover:border-[1px] hover:border-[#8970D6] ${className}`}
			onClick={onClick}
		>
			<Row gutter={[10, 20]}>
				<Col span={12} className="flex items-center">
					<Typography variant="bodyLargeSemibold">{title}</Typography>{" "}
				</Col>{" "}
				<Col span={12}>
					<Tag
						icon={<CiClock1 fontSize={20} />}
						color="#FCAB60"
						className="flex items-center p-1"
					>
						<Typography variant="bodyMediumMedium" className="text-white ml-2">
							{deadline}
						</Typography>{" "}
					</Tag>
				</Col>{" "}
			</Row>
		</Card>
	);
};

export default GenericCard;
