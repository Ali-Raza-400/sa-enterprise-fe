import { ReactElement } from "react";
import GenericTabs, { Tab } from "../../../components/UI/GenericTabs";
import StudentCourses from "./AllCourses";
import Recommendations from "./InterestedCourses";
// import { useLocation } from "react-router-dom";
// import useGenericAlert from "../../../components/Hooks/GenericAlert";
// import { useSelector } from "react-redux";

const Index = (): ReactElement => {
	// const location = useLocation();
	// const { showAlert } = useGenericAlert();
	// const { user } = useSelector((state: any) => state.auth);

	// useEffect(() => {
	// 	const previousUrl = document.referrer;

	// 	// Function to check if the device is mobile
	// 	const isMobileDevice = () => {
	// 		return /Mobi|Android|iPhone/i.test(navigator.userAgent);
	// 	};
	// 	console.log("user?.isApproved::::", user?.isApproved);
	// 	// Check if the previous URL is from login or otp page and if it's a mobile device
	// 	if (
	// 		(previousUrl.endsWith("/") || previousUrl.endsWith("/otp")) &&
	// 		isMobileDevice() &&
	// 		user?.isApproved
	// 	) {
	// 		showAlert({
	// 			type: "info",
	// 			title: "Best Experience on Desktop",
	// 			message: "For the best experience, please use a desktop device.",
	// 			confirmButtonText: "OK",
	// 			onConfirm: () => {},
	// 		});
	// 	}
	// }, [location]);

	const tabs: Tab[] = [
		{
			name: "All Courses",
			content: <StudentCourses />,
		},
		{
			name: "Recommendations",
			content: <Recommendations />,
		},
	];

	return (
		<div>
			<GenericTabs tabs={tabs} />
		</div>
	);
};

export default Index;
