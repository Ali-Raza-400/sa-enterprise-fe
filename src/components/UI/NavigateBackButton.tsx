import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { backPaths } from "../../navigation/BackPaths";

const NavigateBackButton: React.FC = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const getBackPath = () => {
		for (const key in backPaths) {
			// Check if the current path matches the dynamic path pattern
			if (matchPath({ path: key }, pathname)) {
				return backPaths[key];
			}
		}
		return null;
	};

	const backPath = getBackPath();

	if (backPath) {
		return (
			<div
				className="cursor-pointer rounded-full"
				onClick={() => navigate(backPath)}
			>
				<IoArrowBackCircle size={35} fill="#FCAB60" />
			</div>
		);
	}

	return;
};

export default NavigateBackButton;
