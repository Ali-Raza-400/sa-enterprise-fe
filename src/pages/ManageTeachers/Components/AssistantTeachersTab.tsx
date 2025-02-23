import { Avatar, Flex, TableProps } from "antd";
import { ReactElement } from "react";
import IMAGES from "../../../assets/images";
import ActionDropdown from "../../../components/UI/ActionDropdown";
import GenericTable from "../../../components/UI/GenericTable";
import useGenericAlert from "../../../components/Hooks/GenericAlert";

interface DataType {
	key: string;
	name: string;
	age: number;
	emailAddress: string;
	cnic: string;
}

const AssistantTeachersTab = (): ReactElement => {
	const { showAlert } = useGenericAlert();

	const columns: TableProps<DataType>["columns"] = [
		{
			title: "Name",
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
			title: "CNIC",
			dataIndex: "cnic",
			key: "cnic",
			width: 100,
		},
		{
			title: "Age",
			dataIndex: "age",
			key: "age",
			width: 100,
		},
		{
			title: "Email Address",
			dataIndex: "emailAddress",
			key: "address",
			width: 100,
		},
		{
			title: "Action",
			key: "action",
			fixed: "right",
			width: 100,
			render: (obj) => (
				<ActionDropdown
					viewProfileOnClick={() => {}}
					suspendOnClick={() =>
						showAlert({
							type: "warning",
							title: `Suspend ${obj.name}`,
							message: `Are you sure you want to suspend this teacher?`,
							confirmButtonText: "Suspend",
							cancelButtonText: "Cancel",
							// onConfirm: () => handleAction('suspend', obj.teacher.fullName),
						})
					}
					deleteOnClick={() =>
						showAlert({
							type: "warning",
							title: `Delete ${obj.name}`,
							message: `Are you sure you want to delete this teacher?`,
							confirmButtonText: "Delete",
							cancelButtonText: "Cancel",
							// onConfirm: () => handleAction('suspend', obj.teacher.fullName),
						})
					}
				/>
			),
		},
	];

	const data: DataType[] = [
		{
			key: "1",
			name: "John Brown",
			age: 32,
			emailAddress: "test@gmail.com",
			cnic: "123456789",
		},
		{
			key: "2",
			name: "Jim Green",
			age: 42,
			cnic: "123456789",
			emailAddress: "test@gmail.com",
		},
		{
			key: "3",
			name: "Joe Black",
			age: 32,
			cnic: "123456789",
			emailAddress: "test@gmail.com",
		},
	];
	return (
		<>
			<GenericTable columns={columns} data={data} />
		</>
	);
};

export default AssistantTeachersTab;
