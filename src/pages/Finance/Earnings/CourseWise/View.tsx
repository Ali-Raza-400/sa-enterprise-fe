import { Avatar, Flex, TableProps } from "antd";
import IMAGES from "../../../../assets/images";
import BasicInfoCard from "../../../Courses/Shared/BasicInfoCard";
import GenericCard from "../../../../components/UI/GenericCard";
import { ReactElement } from "react";
import GenericTable from "../../../../components/UI/GenericTable";

interface DataType {
	key: string;
	name: string;
	earnings: string;
	department: string;
}

const ViewEarnings = (): ReactElement => {
	const columns: TableProps<DataType>["columns"] = [
		{
			title: "Student Name",
			dataIndex: "name",
			key: "name",
			render: (text) => (
				<Flex align="center" gap={6}>
					<Avatar shape="circle" size="large" src={IMAGES.SAMPLE_WEB} />
					{text}
				</Flex>
			),
			width: 100,
		},
		{
			title: "Earnings",
			dataIndex: "earnings",
			key: "earnings",
			width: 100,
		},
		{
			title: "Department",
			dataIndex: "department",
			key: "department",
			width: 100,
		},
	];

	const data: DataType[] = [
		{
			key: "1",
			name: "Ahmed",
			earnings: "Hello",
			department: "10%",
		},
		{
			key: "3",
			name: "Ahmed",
			earnings: "Hello",
			department: "10%",
		},
		{
			key: "2",
			name: "Ahmed",
			earnings: "Hello",
			department: "10%",
		},
	];

	return (
		<>
			<div className="banner-wrapper">
				<img
					src={IMAGES.EARNINGS_WEBFLOW}
					alt="Earnings"
					className="w-full h-[11.25rem] "
				/>
			</div>

			<BasicInfoCard
				title="Webflow 101 Crash Course"
				description="Learn how to optimize your webpages for different screen sizes and platforms."
				creatorName="Xeven Solutions"
				creatorLogo={IMAGES.XEVEN_LOGO}
				lastUpdated="10/09/2024"
				duration="3"
			/>
			<GenericCard className="!mt-10">
				<GenericTable columns={columns} data={data} />
			</GenericCard>
		</>
	);
};

export default ViewEarnings;
