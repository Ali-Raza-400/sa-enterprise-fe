import React, { ReactNode } from "react";
import { Flex, Modal, ModalProps } from "antd";

interface AppConfirmDialogProps extends ModalProps {
	title?: string | ReactNode;
	showModal: boolean;
	description?: string | ReactNode;
	handleCancel?: () => void;
	handleOk?: () => void;
	footer?: ReactNode;
}

const AppConfirmDialog: React.FC<AppConfirmDialogProps> = ({
	title,
	handleCancel,
	handleOk,
	showModal,
	description,
	footer,
}) => {
	return (
		<Modal
			className="confirm-dialog"
			title={
				<Flex
					justify="center"
					className="text-[2rem] font-semibold my-5 capitalize"
				>
					{title}
				</Flex>
			}
			centered
			open={showModal}
			onOk={handleOk}
			onCancel={handleCancel}
			destroyOnClose={true}
			cancelButtonProps={{ variant: "outlined", color: "primary" }}
			okButtonProps={{ htmlType: "submit" }}
			okText="Yes"
			cancelText="Cancel"
			closeIcon={false}
			footer={footer}
			maskClosable={false}
		>
			<p>{description}</p>
		</Modal>
	);
};

export default AppConfirmDialog;
