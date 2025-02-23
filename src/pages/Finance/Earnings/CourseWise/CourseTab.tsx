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
	teacherName: string;
	category: string;
	courseName: string;
	students: string;
	earnings: string;
}

const CourseTab = (): ReactElement => {
	const navigate = useNavigate();
	const columns: TableProps<DataType>["columns"] = [
		{
			title: "Course Name",
			dataIndex: "courseName",
			key: "courseName",
			width: 100,
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
			width: 100,
		},
		{
			title: "Teacher Name",
			dataIndex: "teacherName",
			key: "teacherName",
			render: (text) => (
				<Flex align="center" gap={6}>
					<Avatar shape="circle" size="large" src={IMAGES.SAMPLE_WEB} />
					{text}
				</Flex>
			),
			width: 100,
		},
		{
			title: "Students",
			dataIndex: "students",
			key: "students",
			width: 100,
		},
		{
			title: "Earnings",
			dataIndex: "earnings",
			key: "earnings",
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
					navigate(PATH.VIEW_EARNINGS);
				}}
				/>
			),
		},
	];

	const data: DataType[] = [
		{
			key: "1",
			teacherName: "Ahmed",
			category: "Hello",
			courseName: "10%",
			students: "20",
			earnings: "$100",
		},
		{
			key: "2",
			teacherName: "Ahmed",
			category: "Hello",
			courseName: "10%",
			students: "20",
			earnings: "$100",
		},
		{
			key: "3",
			teacherName: "Ahmed",
			category: "Hello",
			courseName: "10%",
			students: "20",
			earnings: "$100",
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

export default CourseTab;
