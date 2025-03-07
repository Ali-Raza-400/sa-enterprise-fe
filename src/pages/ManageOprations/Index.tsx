import { Spin, Image, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useDeleteOprationMutation, useGetOprationsQuery } from "../../redux/slices/opration";
import GenericTable from "../../components/UI/GenericTable";
import ActionDropdown from "../../components/UI/ActionDropdown";
import useGenericAlert from "../../components/Hooks/GenericAlert";
import PATH from "../../navigation/Path";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OprationsList = () => {
	const { user } = useSelector((state: any) => state.auth);
	console.log("userData", user);
	const [tableOptions, setTableOptions] = useState({
		filters: {},
		pagination: {
			page: 1,
			pageSize: 10,

		},
	});
	const options = { tableOptions: tableOptions, supervisor_id: user?.role === "supervisor" ? user?.id : null }
	const { data: oprationData, isLoading: oprationLoading, isFetching } = useGetOprationsQuery(options);
	useEffect(() => {
		document.title = "Manage Opration | SA Enterprise"
	}, [])
	const navigate = useNavigate();
	const [deleteOpration, { isLoading: deleteUserLoading }] = useDeleteOprationMutation();
	const { showAlert } = useGenericAlert();
	const onDelete = async (id: string) => {
		showAlert({
			type: "question",
			title: `Delete Opration Confirmation`,
			message: `Are you sure you want to delete this Opration? This action cannot be undone.`,
			confirmButtonText: "Delete",
			cancelButtonText: "Cancel",
			onConfirm: async () => {
				try {
					await deleteOpration(id).unwrap(); // Ensures better error handling
					showAlert({
						type: "success",
						title: `Opration Deleted Successfully`,
						message: `The Opration has been deleted successfully.`,
					});
				} catch (error) {
					showAlert({
						type: "error",
						title: `Deletion Failed`,
						message: `An error occurred while deleting the Opration. Please try again.`,
					});
				}
			},
		});
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
								<Image width={40} height={40} src={url} alt="opration_image" style={{ marginRight: "5px", borderRadius: "50px" }} />
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
			render: (obj: any) => (
				<ActionDropdown
					viewProfileOnClick={() => {
					  navigate(PATH.STUDENT_PROFILE);
					}}
					editOnClick={() => navigate(PATH.MANAGE_OPRATION_UPDATE, {
						state: obj
					})}
					// editOnClick={() => navigate(PATH.MANAGE_OPRATION_CREATE)}
					deleteOnClick={() => onDelete(obj.id)}
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
							loading={oprationLoading || deleteUserLoading}
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

