import { notification } from "antd";
import { ReactNode } from "react";

// Define the allowed notification types
type NotificationType = "success" | "info" | "warning" | "error";
type NotificationPlacement =
	| "topRight"
	| "top"
	| "topLeft"
	| "bottom"
	| "bottomLeft"
	| "bottomRight"
	| undefined;
interface OpenNotificationProps {
	type: NotificationType;
	title?: string;
	description?: ReactNode;
	placement?: NotificationPlacement;
}

const useNotification = () => {
	const [api, contextHolder] = notification.useNotification();

	const openNotification = ({
		type,
		title = "Notification",
		description = null,
		placement = "topRight",
	}: OpenNotificationProps) => {
		api[type]({
			message: title,
			description,
			duration: 3,
			placement,
		});
	};

	return { openNotification, contextHolder };
};

export default useNotification;
