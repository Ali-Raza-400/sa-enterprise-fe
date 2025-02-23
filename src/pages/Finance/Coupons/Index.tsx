import { TableProps } from "antd";
import SearchFilter from "../../../components/UI/SearchFilter";
import GenericButton from "../../../components/UI/GenericButton";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PATH from "../../../navigation/Path";
import GenericCard from "../../../components/UI/GenericCard";
import { ReactElement } from "react";
import ActionDropdown from "../../../components/UI/ActionDropdown";
import GenericTable from "../../../components/UI/GenericTable";

interface DataType {
	key: string;
	couponName: string;
	percentage: string;
	dueDate: string;
	usageLimit: string;
}

const CouponsList = (): ReactElement => {
	const navigate = useNavigate();

	const columns: TableProps<DataType>["columns"] = [
		// {
		//   title: "Coupon Name",
		//   dataIndex: "name",
		//   key: "name",
		//   render: (text) => (
		//     <Flex align="center" gap={6}>
		//       <Avatar shape="circle" size="large" src={IMAGES.SAMPLE_WEB} />
		//       {text}
		//     </Flex>
		//   ),
		//   width: 100,
		// },
		{
			title: "Coupon Name",
			dataIndex: "couponName",
			key: "name",
			width: 100,
		},
		{
			title: "Percentage",
			dataIndex: "percentage",
			key: "percentage",
			width: 100,
		},
		{
			title: "Due Date",
			dataIndex: "dueDate",
			key: "dueDate",
			width: 100,
		},
		{
			title: "Max. Usage Limit",
			dataIndex: "usageLimit",
			key: "usageLimit",
			width: 100,
		},

		{
			title: "Action",
			key: "action",
			fixed: "right",
			width: 100,
			render: () => <ActionDropdown viewOnClick={() => {}} />,
		},
	];

	const data: DataType[] = [
		{
			key: "1",
			couponName: "Hello",
			percentage: "10%",
			dueDate: "10/8/2024",
			usageLimit: "10",
		},
		{
			key: "2",
			couponName: "Hello",
			percentage: "10%",
			dueDate: "10/8/2024",
			usageLimit: "20",
		},
		{
			key: "3",
			couponName: "Hello",
			percentage: "10%",
			dueDate: "10/8/2024",
			usageLimit: "30",
		},
	];
	return (
		<>
			<div className="flex justify-between mb-4">
				<SearchFilter position="end" />
				<GenericButton
					icon={<FaPlus size={20} />}
					label="Generate New Coupon"
					onClick={() => navigate(PATH.COUPONS_CREATE)}
				/>
			</div>

			<GenericCard>
				<GenericTable columns={columns} data={data} />
			</GenericCard>
		</>
	);
};

export default CouponsList;
