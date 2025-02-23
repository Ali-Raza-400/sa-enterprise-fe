import React from "react";
import { Card, Dropdown, Menu, Switch } from "antd";
import { Rate } from "antd";
import { EllipsisOutlined, EditOutlined } from "@ant-design/icons";
import Typography from "../../../components/UI/Typography";

interface ReviewCardProps {
	profileImage: string;
	name: string;
	rating: number;
	time: string;
	reviewText: string;
	dropdownItems?: string[];
}

const ReviewCard: React.FC<ReviewCardProps> = ({
	profileImage,
	name,
	rating,
	time,
	reviewText,
	dropdownItems = [],
}) => {
	const menu = (
		<Menu>
			{dropdownItems.length > 0 ? (
				dropdownItems.map((item, index) => (
					<Menu.Item
						key={index}
						icon={
							<EditOutlined style={{ fontSize: "1.2rem" }} className="ml-1" />
						}
					>
						<Typography
							variant="bodyMediumRegular"
							className="text-[#4D4D4D] ml-1"
						>
							{item}
						</Typography>
					</Menu.Item>
				))
			) : (
				<Menu.Item key="1" disabled>
					<Typography
						variant="bodyMediumRegular"
						className="text-[#999999] ml-1"
					>
						No options available
					</Typography>
				</Menu.Item>
			)}
			<Menu.Item key="2">
				<div className="flex items-center">
					<Switch size="small" className="mr-2" />
					<Typography variant="bodyMediumRegular" className="text-[#4D4D4D]">
						Inactive
					</Typography>
				</div>
			</Menu.Item>
		</Menu>
	);

	return (
		<Card className="h-[8.5rem] bg-[#E4E5E7] rounded-none review-card-body">
			<div className="flex justify-between">
				<div className="flex gap-3">
					<img
						src={profileImage}
						alt="Profile"
						className="w-[2.5rem] h-[2.5rem] rounded-full"
					/>
					<div>
						<Typography variant="bodyMediumMedium" className="text-[#0D0D0D]">
							{name}
						</Typography>
						<div className="flex gap-3">
							<Rate
								allowHalf
								defaultValue={rating}
								className="text-lg text-[#FCAB60]"
							/>
							<Typography variant="bodySmallMedium" className="text-[#2F3237]">
								{time}
							</Typography>
						</div>
					</div>
				</div>

				<div>
					<Dropdown overlay={menu} placement="bottomRight">
						<EllipsisOutlined className="text-2xl cursor-pointer transform rotate-90" />
					</Dropdown>
				</div>
			</div>

			<Typography
				variant="bodySmallRegular"
				className="text-[#5F646D] leading-[0.875rem] mt-1"
			>
				{reviewText}
			</Typography>
		</Card>
	);
};

export default ReviewCard;
