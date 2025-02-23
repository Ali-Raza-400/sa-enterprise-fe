import { useCallback } from "react";
import Swal from "sweetalert2";

type AlertType = "success" | "error" | "warning" | "info" | "question";

interface AlertConfig {
	type: AlertType;
	title: string;
	message: string;
	confirmButtonText?: string;
	cancelButtonText?: string;
	onConfirm?: () => void;
	onCancel?: () => void;
	props?: any;
}

const useGenericAlert = () => {
	const showAlert = useCallback((config: AlertConfig) => {
		Swal.fire({
			icon: config.type,
			title: config.title,
			text: config.message,
			showCancelButton: !!config.cancelButtonText,
			confirmButtonText: config.confirmButtonText || "OK",
			cancelButtonText: config.cancelButtonText || "Cancel",
			// cancelButtonColor: "#FCAB60",
			confirmButtonColor:
				config.confirmButtonText === "Delete"
					? "#BA2A2A"
					: config.confirmButtonText === "Suspend"
						? "#FCAB60"
						: "#8970D6",
			...config.props,
		}).then((result) => {
			if (result.isConfirmed) {
				config.onConfirm && config.onConfirm();
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				config.onCancel && config.onCancel();
			}
		});
	}, []);

	return { showAlert };
};

export default useGenericAlert;
