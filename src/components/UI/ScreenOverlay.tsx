import React, { useEffect, useState } from "react";
import GenericButton from "./GenericButton";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/features/authSlice";
import { removeUser } from "../../utils/helper";
import PATH from "../../navigation/Path";
import { useLocation, useNavigate } from "react-router-dom";

interface ScreenOverlayProps {
	isApproved: boolean;
	children: React.ReactNode;
}

const ScreenOverlay: React.FC<ScreenOverlayProps> = ({
	isApproved,
	children,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const [showOverlay, setShowOverlay] = useState<boolean>(true);

	const clearUser = () => {
		dispatch(setCredentials(null));
		removeUser();
		navigate(PATH.LOGIN);
	};

	useEffect(() => {
		const publicRoutes = [
			PATH.LOGIN,
			PATH.SIGNUP,
			PATH.FORGOT_PASSWORD,
			PATH.OTP_SCREEN,
		];
		const isPublicRoute = publicRoutes.includes(location.pathname);

		setShowOverlay(!isApproved && !isPublicRoute);
	}, [location.pathname, isApproved]);

	return (
		<div
			style={{ position: "relative" }}
			className={`${showOverlay ? "ant-layout-opacity-css" : ""}`}
		>
			{children}
			{showOverlay && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						zIndex: 1000,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "#fff",
						fontSize: "1.5em",
						flexDirection: "column",
					}}
				>
					<p>
						We are currently reviewing your account. You'll receive an update
						from te institute within 48 hours.
					</p>
					<GenericButton
						label="Log out"
						variant="solid"
						color="primary"
						onClick={clearUser}
						className="mt-5"
					/>
				</div>
			)}
		</div>
	);
};

export default ScreenOverlay;
