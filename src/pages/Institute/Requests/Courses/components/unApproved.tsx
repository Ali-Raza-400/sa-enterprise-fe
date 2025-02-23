import { Space, TableProps, Typography } from "antd";
import { ReactElement, useState } from "react";
import GenericTable from "../../../../../components/UI/GenericTable";
import { CheckOutlined } from "@ant-design/icons";
import useNotification from "../../../../../components/UI/Notification";
import GenericButton from "../../../../../components/UI/GenericButton";
import { useDownloadCSV } from "../../../../../components/Hooks/DownloadCSV";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../../../../utils/constants";
import {
	useBulkCoursesApproveUnapproveMutation,
	useGetCoursesRequestQuery,
} from "../../../../../redux/slices/course";
interface DataType {
	key: string;
	name: string;
	age: number;
	emailAddress: string;
	cnic: string;
}

const UnApproved = (): ReactElement => {
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			page: 1,
			pageSize: 10,
		},
	});
	const { openNotification, contextHolder } = useNotification();
	const { DownloadCSVComponent } = useDownloadCSV();

	const {
		data: approvedData,
		isLoading,
		isFetching,
	} = useGetCoursesRequestQuery({ tableOptions });
	const [bulkApproveReject, { isLoading: unapproveLoading }] =
		useBulkCoursesApproveUnapproveMutation();

	const [selectedRowKeys, setSelectedRowKeys] = useState([]);

	const handleApprove = async (ids: string[]) => {
		await bulkApproveReject({ payload: { requestId: ids, isApproved: true } })
			.unwrap()
			?.then(() => {
				openNotification({
					title: "Request Unapproved",
					type: "success",
				});
			})
			.catch(() => {
				openNotification({
					title: "Something went wrong",
					type: "error",
				});
			});
	};

	const columns: TableProps<DataType>["columns"] = [
		{
			title: "Course",
			dataIndex: "course",
			// dataIndex: aprrovalData?.list?.[0]?.fullName,
			key: "course",
			width: 100,
			render: (value) => (value?.name ? value?.name : "N/A"),
		},
		{
			title: "Name",
			dataIndex: "student",
			key: "student",
			width: 100,
			render: (value) => (value?.fullName ? value?.fullName : "N/A"),
		},
		{
			title: "Email",
			dataIndex: "student",
			key: "student",
			width: 100,
			render: (value) => (value?.email ? value?.email : "N/A"),
		},

		{
			title: "Subscription Price",
			dataIndex: "subscriptionPrice",
			key: "subscriptionPrice",
			width: 100,
			render: (subscriptionPrice) =>
				subscriptionPrice ? subscriptionPrice : "N/A",
		},
		{
			title: "createdAt",
			dataIndex: "createdAt",
			key: "createdAt",
			width: 100,
			render: (createdAt) =>
				createdAt ? dayjs(createdAt).format(DATE_FORMAT) : "N/A",
		},
		{
			title: "Action",
			key: "action",
			fixed: "right",
			width: 150,
			render: (obj) => (
				<Space className="gap-6">
					<Typography.Link
						style={{ color: "#51E186", display: "flex", alignItems: "center" }}
						onClick={() => handleApprove([obj?.id])}
					>
						<CheckOutlined className="text-[#51E186] cursor-pointer text-[1.3rem]" />
						<span style={{ marginLeft: "0.5rem" }}>Approve</span>
					</Typography.Link>
				</Space>
			),
		},
	];

	return (
		<>
			<div className="flex justify-end gap-2">
				{approvedData?.list?.length > 0 && (
					<DownloadCSVComponent
						data={
							approvedData?.list?.map((item: any) => {
								console.log("item:::", item);
								return {
									CourseName: item?.course?.name || "N/A",
									StudentName: item?.student?.fullName || "N/A",
									email: item?.student?.email || "N/A",
									subscriptionPrice: item?.subscriptionPrice || "N/A",
								};
							}) || []
						}
						filename={`Approved_users_${dayjs().format(DATE_FORMAT)}`}
					>
						<GenericButton
							label="Export CSV"
							color="primary"
							variant="outlined"
						/>
					</DownloadCSVComponent>
				)}
				{selectedRowKeys?.length > 0 && (
					<GenericButton
						label="Approve All"
						onClick={() => handleApprove(selectedRowKeys)}
						color="primary"
					/>
				)}
			</div>
			{contextHolder}
			<GenericTable
				columns={columns}
				data={approvedData}
				enablePagination={true}
				updatePaginationFunc={(data: any) =>
					setTableOptions({ ...tableOptions, pagination: data })
				}
				loading={isLoading || isFetching || unapproveLoading}
				enableSelection={true}
				rowKey="id"
				selectionType="checkbox"
				selectedRowKeys={selectedRowKeys}
				onSelectionChange={(a: any) => setSelectedRowKeys(a)}
			/>{" "}
		</>
	);
};

export default UnApproved;
