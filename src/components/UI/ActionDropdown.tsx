import { Dropdown, Space, MenuProps } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ReactElement } from "react";
import { FaEye, FaTrashAlt, FaEdit } from "react-icons/fa";
import { RiUserForbidLine } from "react-icons/ri";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaCircleExclamation } from "react-icons/fa6";

interface ActionDropdownProps {
	editOnClick?: () => void;
	deleteOnClick?: () => void;
	viewOnClick?: () => void;
	suspendOnClick?: () => void;
	viewProfileOnClick?: () => void;
	disable?: string[];
	uploadOnClick?: () => void;
	mandatoryOnClick?: () => void;
	btnLable?: {
		[key: string]: string;
	};
}

export default function ActionDropdown({
	editOnClick,
	deleteOnClick,
	viewOnClick,
	suspendOnClick,
	viewProfileOnClick,
	disable = [],
	uploadOnClick,
	mandatoryOnClick,
	btnLable,
}: ActionDropdownProps): ReactElement {
	const items: MenuProps["items"] = [
		viewProfileOnClick && {
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						viewProfileOnClick();
					}}
					className="flex items-center gap-2"
				>
					<FaEye /> View
				</a>
			),
			key: "0",
			disabled: disable.includes("viewProfileOnClick"),
		},
		editOnClick && {
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						editOnClick();
					}}
					className="flex items-center gap-2"
				>
					<FaEdit /> Update
				</a>
			),
			key: "1",
			disabled: disable.includes("editOnClick"),
		},
		deleteOnClick && {
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						deleteOnClick();
					}}
					className="flex items-center gap-2"
				>
					<FaTrashAlt /> Delete
				</a>
			),
			key: "2",
			disabled: disable.includes("deleteOnClick"),
		},
		viewOnClick && {
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						viewOnClick();
					}}
					className="flex items-center gap-2"
				>
					<FaEye /> View
				</a>
			),
			key: "3",
			disabled: disable.includes("viewOnClick"),
		},
		suspendOnClick && {
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						suspendOnClick();
					}}
					className="flex items-center gap-2"
				>
					<RiUserForbidLine /> Suspend
				</a>
			),
			key: "4",
			disabled: disable.includes("suspendOnClick"),
		},
		uploadOnClick && {
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						uploadOnClick();
					}}
					className="flex items-center gap-2"
				>
					<AiOutlineCloudUpload size={22} color="black" className="" /> Upload
				</a>
			),
			key: "5",
			disabled: disable.includes("uploadOnClick"),
		},
		mandatoryOnClick && {
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
						mandatoryOnClick();
					}}
					className="flex items-center gap-2"
				>
					<FaCircleExclamation /> {btnLable?.mandatory}
				</a>
			),
			key: "5",
			disabled: disable.includes("mandatoryOnClick"),
		},
	].filter(Boolean) as MenuProps["items"]; // Remove undefined entries

	return (
		<Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
			<Space className="cursor-pointer">
				<BsThreeDotsVertical size={20} />
			</Space>
		</Dropdown>
	);
}
