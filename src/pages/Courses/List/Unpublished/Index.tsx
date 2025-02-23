import { Col, Empty, Pagination, Rate, Row, TableProps } from "antd";

import { useNavigate } from "react-router-dom";
import ActionDropdown from "../../../../components/UI/ActionDropdown";
import PATH from "../../../../navigation/Path";
import CourseCard from "../../Shared/CourseCard";
import GenericTable from "../../../../components/UI/GenericTable";
import { useState } from "react";
import { useGetInstituteCoursesQuery } from "../../../../redux/slices/course";
import { useSelector } from "react-redux";
import Typography from "../../../../components/UI/Typography";
import PageLoader from "../../../../components/Loader/PageLoader";
import useGenericAlert from "../../../../components/Hooks/GenericAlert";
import { Course } from "../../type";

interface UnpublishedContentReturn {
	listContent: JSX.Element;
	gridContent: JSX.Element;
}

interface DataType {
	key: string;
	courseName: string;
	category: string;
	price: number;
	rating: number;
}

const UnpublishedContent = (deleteCourse: any): UnpublishedContentReturn => {
	const navigate = useNavigate();
	const { user } = useSelector((state: any) => state.auth);
	const { showAlert } = useGenericAlert();

	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			page: 1,
			pageSize: 8,
		},
	});
	const {
		data: courseData,
		isLoading,
		isFetching,
	} = useGetInstituteCoursesQuery({ id: user?.id, tableOptions });

	const onDelete = async (id: string) => {
		showAlert({
			type: "question",
			title: `Delete Course Confirmation`,
			message: `Are you sure you want to delete this course? This action cannot be undone.`,
			confirmButtonText: "Delete",
			cancelButtonText: "Cancel",
			onConfirm: async () => {
				await deleteCourse(id).then(() => {
					showAlert({
						type: "success",
						title: `Course Deleted Successfully`,
						message: `The course has been deleted successfully.`,
					});
				});
			},
		});
	};

	const columns: TableProps<DataType>["columns"] = [
		{
			title: "Course Name",
			dataIndex: "name",
			key: "name",
			width: 100,
		},
		{
			title: "Category",
			dataIndex: "categories",
			key: "category",
			width: 100,
			render: (value) =>
				value?.map((cat: any) => {
					return (
						<div className="inline-flex mt-1 me-2">
							<Typography
								variant="bodySmallMedium"
								className="bg-[#E6E6E6] p-2 rounded-lg text-[#5F646D]"
							>
								{cat}
							</Typography>
						</div>
					);
				}),
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
			width: 100,
			render: (value) => value || "Free",
		},
		{
			title: "Rating",
			dataIndex: "rating",
			key: "rating",
			width: 100,
			render: (value) => <Rate defaultValue={value} />,
		},

		{
			title: "Action",
			key: "action",
			fixed: "right",
			width: 100,
			render: (value) => (
				<ActionDropdown
					viewOnClick={() => navigate(PATH.COURSE_VIEW.replace(":id", "1"))}
					deleteOnClick={() => onDelete(value?.id)}
				/>
			),
		},
	];

	return {
		gridContent: isLoading ? (
			<PageLoader />
		) : courseData?.list?.length > 0 ? (
			<>
				<Row gutter={[24, 24]} className="mt-5">
					{courseData?.list?.map((course: Course, index: number) => (
						<Col key={index} xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
							<CourseCard
								courseData={course}
								onCardClick={() =>
									navigate(PATH.COURSE_VIEW.replace(":id", course?.id))
								}
								loading={isLoading || isFetching}
								onDelete={onDelete}
							/>
						</Col>
					))}
				</Row>
				<div className="my-5 justify-end flex">
					{courseData && (
						<Pagination
							total={courseData?.pagination?.totalRecords}
							defaultCurrent={courseData?.pagination?.page || 1}
							defaultPageSize={courseData?.pagination?.pageSize || 8}
							showTotal={(total, range) =>
								`${range[0]}-${range[1]} of ${total} entries`
							}
							onChange={(page, pageSize) => {
								setTableOptions({
									...tableOptions,
									pagination: {
										page: page,
										pageSize: pageSize,
									},
								});
							}}
						/>
					)}
				</div>
			</>
		) : (
			<div className="h-[65vh] flex justify-center items-center">
				<Empty />
			</div>
		),
		listContent: (
			<div className="mt-5">
				<GenericTable
					columns={columns}
					data={courseData}
					enablePagination={true}
					updatePaginationFunc={(data: any) =>
						setTableOptions({ ...tableOptions, pagination: data })
					}
					loading={isLoading || isFetching}
				/>{" "}
			</div>
		),
	};
};

export default UnpublishedContent;
