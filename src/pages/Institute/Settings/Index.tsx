import { useState } from "react";
import { TableProps } from "antd";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import GenericTable from "../../../components/UI/GenericTable";
import InputField from "../../../components/Form/InputField";
import {
	useGetCourseLimitQuery,
	useUpdateCourseLimitMutation,
} from "../../../redux/slices/course";
import Typography from "../../../components/UI/Typography";
import useNotification from "../../../components/UI/Notification";

const InstituteSettings = () => {
	const { openNotification, contextHolder } = useNotification();

	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			page: 1,
			pageSize: 10,
		},
	});

	const {
		data: courseLimit,
		isLoading,
		isFetching,
	} = useGetCourseLimitQuery({ tableOptions });

	const [updateCourseLimit] = useUpdateCourseLimitMutation();

	const [editValue, setEditValue] = useState({ id: "", totalSeats: "" });

	const handleSave = async (recordId: number) => {
		try {
			const indexToUpdate = courseLimit.list.findIndex(
				(item: any) => item.id === recordId
			);

			if (indexToUpdate !== -1) {
				const payload = { limit: editValue.totalSeats.toString() };

				const response = await updateCourseLimit({
					courseId: recordId,
					payload,
				});

				if (response?.data) {
					//   console.log("Course limit updated successfully:", response.data);
				} else {
					console.error("Failed to update course limit.");
				}
			}

			setEditValue({ id: "", totalSeats: editValue.totalSeats });
		} catch (error) {
			console.error("Error updating course limit:", error);
		}
		openNotification({
			type: "success",
			title: "Course Limit Updated Successfully",
		});
	};

	const handleCancel = () => {
		setEditValue({ id: "", totalSeats: "" });
	};

	const columns: TableProps<any>["columns"] = [
		{
			title: "Course Name",
			dataIndex: "name",
			key: "name",
			width: 100,
		},
		{
			title: "Total Seats",
			dataIndex: "totalSeats",
			key: "totalSeats",
			width: 100,
			render: (_, record) =>
				editValue.id === record.id ? (
					<InputField
						name="totalSeats"
						rules={[{ required: true, message: "Limit is required" }]}
						autoComplete="off"
						placeholder="Set Limit"
						inputType="number"
						defaultValue={record?.totalSeats}
						onChange={(e: any) => setEditValue({ ...editValue, totalSeats: e })}
						margin="none"
						fieldClassName="w-[50%]"
					/>
				) : (
					<div>{record.totalSeats || "No Limit"}</div>
				),
		},
		{
			title: "Action",
			key: "action",
			fixed: "right",
			width: 100,
			render: (_, record) => (
				<div className="flex items-center gap-1">
					{editValue.id === record.id ? (
						<>
							<CheckOutlined
								className="text-[#51E186] cursor-pointer text-[1.3rem]"
								onClick={() => handleSave(record.id)}
							/>
							<Typography
								variant="bodyLargeSemibold"
								className="!text-[#51E186] cursor-pointer mr-5"
								onClick={() => handleSave(record.id)}
							>
								Save
							</Typography>
							<CloseOutlined
								className="cursor-pointer text-[1.3rem] text-[#BA2A2A]"
								onClick={handleCancel}
							/>
							<Typography
								variant="bodyLargeSemibold"
								className="!text-[#BA2A2A] cursor-pointer "
								onClick={handleCancel}
							>
								Cancel
							</Typography>
						</>
					) : (
						<EditOutlined
							className="text-[1.3rem] text-[#8970D6] cursor-pointer"
							onClick={() => {
								setEditValue({
									id: record?.id,
									totalSeats: record?.totalSeats || "",
								});
							}}
						/>
					)}
				</div>
			),
		},
	];

	return (
		<>
			{contextHolder}
			<div className="">
				<Typography variant="headingFive" className="mb-5">
					Manage Enrollment Limit
				</Typography>
				<GenericTable
					columns={columns}
					data={courseLimit}
					enablePagination={true}
					updatePaginationFunc={(paginationData) =>
						setTableOptions({ ...tableOptions, pagination: paginationData })
					}
					loading={isLoading || isFetching}
				/>
			</div>
		</>
	);
};

export default InstituteSettings;
