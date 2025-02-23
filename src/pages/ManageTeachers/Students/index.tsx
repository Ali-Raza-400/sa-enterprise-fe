import { ReactElement, useState } from "react";
import { Flex, TableProps, Tag } from "antd";
import SearchFilter from "../../../components/UI/SearchFilter";
import ActionDropdown from "../../../components/UI/ActionDropdown";
import GenericTable from "../../../components/UI/GenericTable";
import PATH from "../../../navigation/Path";
import { useNavigate } from "react-router-dom";
import { useGetTeacherStudentsQuery } from "../../../redux/slices/teacher";

interface StudentType {
	key: string;
	studentName: string;
	studentId: string;
	course: string;
	grade: string;
}

const Index = (): ReactElement => {
	const [tableOptions, setTableOptions] = useState({
		pagination: {
			page: 1,
			pageSize: 10,
		},
	});

	const {
		data: teacherStudents,
		isLoading,
		isFetching,
	} = useGetTeacherStudentsQuery({ tableOptions });
	// console.log(teacherStudents, "Teacher Students");

	const navigate = useNavigate();
	const columns: TableProps<StudentType>["columns"] = [
		{
			title: "Student Name",
			dataIndex: ["student", "fullName"],
			key: "studentName",
			width: 150,
		},
		{
			title: "Student Email",
			dataIndex: ["student", "email"],
			key: "studentId",
			width: 100,
		},
		{
			title: "Course",
			dataIndex: ["course", "name"],
			key: "course",
			width: 150,
		},
		{
			title: "Course Status",
			dataIndex: "isCourseCompleted",
			key: "isCourseCompleted",
			render: (value) => (
				<Tag
					color={value ? "#A8F0C2" : "#FFCF99"}
					className="flex justify-center items-center p-2 w-36"
				>
					<span className="text-[16px] text-black">
						{value ? "Completed" : "Ongoing"}
					</span>
				</Tag>
			),
			width: 80,
		},

		{
			title: "Action",
			key: "action",
			fixed: "right",
			width: 120,
			render: (obj) => (
				<ActionDropdown
					viewProfileOnClick={() => {
						navigate(
							PATH.TEACHER_STUDENT_PROFILE_VIEW.replace(":id", obj.student.id)
						);
					}}
					
				/>
			),
		},
	];

	return (
		<>
			<Flex className="justify-between">
				<SearchFilter position="end" />
			</Flex>
			<GenericTable
				columns={columns}
				data={teacherStudents}
				enablePagination={true}
				updatePaginationFunc={(teacherStudents: any) =>
					setTableOptions({ ...tableOptions, pagination: teacherStudents })
				}
				loading={isLoading || isFetching}
			/>
		</>
	);
};

export default Index;
