import { Avatar, Flex, TableProps } from "antd";
import { ReactElement } from "react";
import IMAGES from "../../../../assets/images";
import ActionDropdown from "../../../../components/UI/ActionDropdown";
import GenericCard from "../../../../components/UI/GenericCard";
import GenericTable from "../../../../components/UI/GenericTable";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../navigation/Path";

interface DataType {
	key: string;
	name: string;
	earnings: string;
	enrolledCourse: string;
}

const StudentTab = (): ReactElement => {
	const navigate = useNavigate();
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
			title: "Enrolled Course",
			dataIndex: "enrolledCourse",
			key: "enrolledCourse",
			width: 100,
		},
		{
			title: "Action",
			key: "action",
			fixed: "right",
			width: 100,
			render: () => (
				<ActionDropdown
				viewOnClick={() => {
					navigate(PATH.STUDENTS_EARNINGS);
				}}
				/>
			),
		},
	];

	const data: DataType[] = [
		{
			key: "1",
			name: "Ahmed",
			earnings: "Hello",
			enrolledCourse: "10%",
		},
		{
			key: "3",
			name: "Ahmed",
			earnings: "Hello",
			enrolledCourse: "10%",
		},
		{
			key: "2",
			name: "Ahmed",
			earnings: "Hello",
			enrolledCourse: "10%",
		},
	];

	return (
		<>
			<GenericCard>
				<GenericTable columns={columns} data={data} />
			</GenericCard>
		</>
	);
};

export default StudentTab;
