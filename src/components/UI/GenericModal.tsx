import React from "react";
import { Modal, ModalProps } from "antd";

interface GenericModalProps extends ModalProps {
	show: boolean;
	onClose: () => void;
	showFooter?: boolean;
}

const GenericModal: React.FC<GenericModalProps> = ({
	show,
	onClose,
	showFooter = true,
	...modalProps
}) => {
	return (
		<Modal
			open={show}
			onCancel={onClose}
			footer={showFooter ? undefined : null}
			{...modalProps}
			className="custom-modal"
			okButtonProps={{ variant: "solid", color: "default" ,htmlType:"submit"}}
			cancelButtonProps={{ variant: "solid", color: "primary" }}
		>
			{modalProps?.children}
		</Modal>
	);
};

export default GenericModal;
