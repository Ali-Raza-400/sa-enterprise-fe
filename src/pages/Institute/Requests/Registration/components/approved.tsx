import { Avatar, Space, TableProps, Tag, Typography } from "antd";
import { ReactElement, useState } from "react";
import GenericTable from "../../../../../components/UI/GenericTable";
import { CloseOutlined } from "@ant-design/icons";
import {
	useBulkApproveUnapproveMutation,
	useGetFilteredUsersQuery,
} from "../../../../../redux/slices/user";
import { LOOKUP_TYPES } from "../../../../../utils/lookup";
import useNotification from "../../../../../components/UI/Notification";
import GenericButton from "../../../../../components/UI/GenericButton";
import { useDownloadCSV } from "../../../../../components/Hooks/DownloadCSV";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../../../../utils/constants";
import { TruncatedText } from "../../../../../components/UI/TruncatedText";
interface DataType {
	key: string;
	name: string;
	age: number;
	emailAddress: string;
	cnic: string;
}

const Approved = (): ReactElement => {
	const [tableOptions, setTableOptions] = useState({
		filters: {
			isApproved: true,
			role: LOOKUP_TYPES.Role.STUDENT,
		},
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
	} = useGetFilteredUsersQuery({ tableOptions });

	const [bulkApproveReject, { isLoading: unapproveLoading }] =
		useBulkApproveUnapproveMutation();

	const [selectedRowKeys, setSelectedRowKeys] = useState([]);

	const handleUnApprove = async (ids: string[]) => {
		await bulkApproveReject({ payload: { userIds: ids, isApproved: false } })
			.unwrap()
			?.then(() => {
				openNotification({
					title: "Users Unapproved Successfully",
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
			title: "Name",
			dataIndex: "fullName",
			// dataIndex: aprrovalData?.list?.[0]?.fullName,
			key: "name",
			width: 100,
			render: (fullName) => (fullName ? fullName : "N/A"),
		},
		{
			title: "Age",
			dataIndex: "age",
			key: "age",
			width: 100,
			render: (age) => (age ? age : "N/A"),
		},
		{
			title: "Email Address",
			dataIndex: "email",
			key: "address",
			width: 100,
			render: (email) => (email ? email : "N/A"),
		},
		{
			title: "Country",
			dataIndex: "countryName",
			key: "countryName",
			width: 100,
			render: (v) => (v ? v : "N/A"),
		},
		{
			title: "Province",
			dataIndex: "stateName",
			key: "stateName",
			width: 100,
			render: (v) => (v ? v : "N/A"),
		},
		{
			title: "City",
			dataIndex: "cityName",
			key: "cityName",
			width: 100,
			render: (v) => (v ? v : "N/A"),
		},
		{
			title: "Certification",
			dataIndex: "certifications",
			key: "certifications",
			width: 100,
			render: (courses: string[]) =>
				courses?.length > 0 ? (
					<div className="flex flex-wrap gap-2">
						<Avatar.Group maxCount={2} shape="square" className="show-more">
							{courses?.map((cat: string) => (
								<Tag
									key={cat}
									color="default"
									className="mt-1 bg-[#E6E6E6] border-0 p-1 px-2 flex justify-center items-center cursor-pointer"
									onClick={() => window.open(cat, "_blank")}
								>
									{TruncatedText({text:cat.substring(cat.lastIndexOf("/") + 1),width:100})}
								</Tag>
							))}
						</Avatar.Group>
					</div>
				) : (
					// Use TagWithShowMore component to display the enrolled courses
					"N/A"
				),
		},
		// {
		// 	title: "Education",
		// 	dataIndex: "education",
		// 	key: "education",
		// 	width: 100,
		// 	render: (v) => (v ? v : "N/A"),
		// },

		{
			title: "Action",
			key: "action",
			fixed: "right",
			width: 150,
			render: (obj) => (
				<Space className="gap-6">
					<Typography.Link
						style={{ color: "#BA2A2A", display: "flex", alignItems: "center" }}
						onClick={() => handleUnApprove([obj?.id])}
					>
						<CloseOutlined className="cursor-pointer text-[1.3rem] text-[#BA2A2A]" />
						<span style={{ marginLeft: "0.5rem" }}>Unapprove</span>
					</Typography.Link>
				</Space>
			),
		},
	];

	return (
		<>
			<div className="flex justify-end gap-2">
				<DownloadCSVComponent
					data={
						approvedData?.list?.map((item: any) => {
							return {
								fullName: item?.fullName || "N/A",
								email: item?.email || "N/A",
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
				{selectedRowKeys?.length > 0 && (
					<GenericButton
						label="Unapprove All"
						onClick={() => handleUnApprove(selectedRowKeys)}
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

export default Approved;
