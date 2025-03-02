import {  Spin, Image, TableProps } from "antd";
import { useState } from "react";
import { useGetOprationsQuery } from "../../redux/slices/opration";
import GenericTable from "../../components/UI/GenericTable";
import ActionDropdown from "../../components/UI/ActionDropdown";

const OprationsList = () => {
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			page: 1,
			pageSize: 10,
		},
	});
	const { data: oprationData, isLoading: oprationLoading, isFetching } = useGetOprationsQuery({
		page: 1,
		pageSize: 8,
	});
	
	const onDelete = () => {
		console.log("onDelete")
	};
	const onEdit = () => {
		console.log("onEdit")
	};
	interface OprationType {
		id: string;
		location: string;
		photo_urls: string;
		truck_id: string;
		supervisor_id: string;
	}
	const columns: TableProps<OprationType>["columns"] = [
		{
			title: "Location",
			key: "location",
			render: (obj) => {
				return (
					<div>
						{obj.location}
					</div>
				)
			},
			width: 150,
		},
		{
			title: "Photo",
			dataIndex: "photo_urls",
			key: "photo_urls",
			render: (obj) => {
				return (
					<div>
						{obj.map((url: any) => {
							return (
								<Image width={25} height={25} src={url} alt="opration_image"  style={{marginRight:"5px"}}/>
							)
						})}
					</div>
				)
			},
			width: 120,
		},
		{
			title: "Supervisor",
			dataIndex: "supervisor_id",
			key: "supervisor_id",
			width: 200,
		},
		{
			title: "Truck",
			dataIndex: "truck_id",
			key: "truck_id",
			width: 200,

		},
		{
			title: "Actions", // Updated title for actions
			key: "action",
			fixed: "right",
			width: 120,
			render: (obj:any) => (
				<ActionDropdown
					// viewProfileOnClick={() => {
					//   navigate(PATH.STUDENT_PROFILE);
					// }}

					editOnClick={() => onEdit(obj)}
					deleteOnClick={() => onDelete(obj?.id)}
				/>
			),
		},
	];
	return (
		<>
			{oprationLoading || isFetching ? (
				<Spin size="large" className="flex justify-center m-[250px]" />
			)
				: (
					<div className="">
						

							<GenericTable
								loading={oprationLoading}
								columns={columns}
								data={oprationData}
								enablePagination={true}
								updatePaginationFunc={(data: { page: number; pageSize: number }) => {
									console.log("data::::", data)
									setTableOptions({ ...tableOptions, pagination: data })
								}
								}
						
							/>
						
					</div>)}

		</>)
};

export default OprationsList;

