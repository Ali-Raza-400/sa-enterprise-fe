import { Col, Empty, Form, Pagination, Rate, Row, TableProps } from "antd";

import { useNavigate } from "react-router-dom";
import ActionDropdown from "../../../../components/UI/ActionDropdown";
import PATH from "../../../../navigation/Path";
import CourseCard from "../../Shared/CourseCard";
import GenericTable from "../../../../components/UI/GenericTable";
import { useState } from "react";
import {
	useAssignCourseToTeacherMutation,
	useGetInstituteCoursesQuery,
	useToggleMandatoryMutation,
} from "../../../../redux/slices/course";
import { useSelector } from "react-redux";
import Typography from "../../../../components/UI/Typography";
import PageLoader from "../../../../components/Loader/PageLoader";
import useGenericAlert from "../../../../components/Hooks/GenericAlert";
import GenericModal from "../../../../components/UI/GenericModal";
import TeachersTab from "../../../ManageTeachers/Components/TeachersTab";
import useNotification from "../../../../components/UI/Notification";
import {
	PublishedColumnType,
	PublishedContentReturn,
	SelectedKeysType,
	ShowAvailableTeachersState,
} from "../type";
import { Course } from "../../type";

const PublishedContent = (deleteCourse?: any): PublishedContentReturn => {
	const navigate = useNavigate();
	const { user } = useSelector((state: any) => state.auth);
	const { showAlert } = useGenericAlert();
	const [selectedKeys, setSelectedKeys] = useState<SelectedKeysType>({
		key: "",
		teacherId: "",
	});
	const { openNotification, contextHolder } = useNotification();
	const [showAvailableTeachers, setShowAvailableTeachers] =
		useState<ShowAvailableTeachersState>({ visibility: false, courseId: "" });
	const [assignCourseToTeacher] = useAssignCourseToTeacherMutation();
	const [toggleFunc, { isLoading: toggleLoading }] =
		useToggleMandatoryMutation();
	const [form] = Form.useForm();
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

	const assignCourseToTeachers = (id: string) => {
		setShowAvailableTeachers({
			visibility: true,
			courseId: id,
		});
	};

	const closeAssignCourseToTeacherModal = () => {
		setSelectedKeys({ key: "", teacherId: "" });
		setShowAvailableTeachers({
			visibility: false,
			courseId: "",
		});
	};

	const handleMandatory = (id: string, type: boolean | null) => {
		toggleFunc({
			type: type ? false : true,
			courseId: id,
		});
	};
	const columns: TableProps<PublishedColumnType>["columns"] = [
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
			title: "Mandatory",
			dataIndex: "isMendatory",
			key: "isMendatory",
			width: 100,
			render: (value) => (value ? "Yes" : "No"),
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
			render: (value, record) => (
				<ActionDropdown
					viewOnClick={() => navigate(PATH.COURSE_VIEW.replace(":id", "1"))}
					deleteOnClick={() => onDelete(value?.id)}
					mandatoryOnClick={() =>
						handleMandatory(value?.id, record?.isMendatory as boolean)
					}
					btnLable={{
						mandatory: record?.isMendatory
							? "Unmark Mandatory"
							: "Mark Mandatory",
					}}
				/>
			),
		},
	];
	async function handleFormFinish(values: any) {
		console.log(values);

		try {
			showAlert({
				type: "question",
				title: `Assign Teacher To Course`,
				message: `Are you sure you want to Assign Teacher To Course? This action cannot be undone.`,
				confirmButtonText: "Assign",
				cancelButtonText: "Cancel",
				onConfirm: async () => {
					try {
						await assignCourseToTeacher({
							courseId: showAvailableTeachers?.courseId,
							teacherId: selectedKeys?.teacherId,
						});

						openNotification({
							type: "success",
							title: "Course Assigned to Teacher successfully.",
						});
						setSelectedKeys({ key: "", teacherId: "" });
						closeAssignCourseToTeacherModal();
					} catch (error) {
						showAlert({
							type: "error",
							title: "Error Assigning Teacher to Course",
							message: "Failed to assign teacher to course.",
						});
						setSelectedKeys({ key: "", teacherId: "" });
					}
				},
			});
		} catch (error) {
			showAlert({
				type: "error",
				title: "Unexpected Error",
				message: "An unexpected error occurred.",
			});
		}
	}

	return {
		gridContent:
			isLoading || toggleLoading ? (
				<PageLoader />
			) : courseData?.list?.length > 0 ? (
				<>
					{contextHolder}
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
									assignCourseToTeacher={assignCourseToTeachers}
									toggleMandatory={handleMandatory}
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
					{showAvailableTeachers && (
						<GenericModal
							width={750}
							onClose={closeAssignCourseToTeacherModal}
							onOk={() => {
								if (!selectedKeys.teacherId) {
									showAlert({
										type: "error",
										title: "Selection Required",
										message: "Please select a teacher to assign to the course.",
									});
								} else {
									form.validateFields().then(handleFormFinish);
								}
							}}
							show={showAvailableTeachers.visibility}
						>
							<TeachersTab
								selectionType={"radio"}
								showActions={true}
								setSelectedKeys={setSelectedKeys}
								selectedKeys={selectedKeys}
								enableSelection={true}
								showScroll={true}
								showAction={false}
							/>
						</GenericModal>
					)}
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
					loading={isLoading || isFetching || toggleLoading}
				/>{" "}
			</div>
		),
	};
};

export default PublishedContent;
