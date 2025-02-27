import { RouteTypeProps } from "../type";
import { useEffect } from "react";
import { layoutsMap } from "../../components/Layout/constants";
import PATH from "../Path";
import FullScreenLoader from "../../components/Loader/FullScreenLoader";
import { useSelector } from "react-redux";
import { LOOKUP_TYPES } from "../../utils/lookup";

// Public Routes to access without login
function PublicRoute({ element, layout }: RouteTypeProps) {
	const Layout = layoutsMap[layout];
	const { user } = useSelector((state: any) => state.auth);
	useEffect(() => {
		if (user) {
			window.location.href =
				user.role === LOOKUP_TYPES.Role.STUDENT
					? PATH.STUDENT_COURSES_LIST
					: user.role === LOOKUP_TYPES.Role.TEACHER
						? PATH.TEACHER_DASHBOARD
						: PATH.MANAGE_STUDENTS; 
			// axiosInstance.defaults.headers.common['Authorization'] = 'Bearer YOUR_NEW_TOKEN';
		}
	}, [user]);

	if (user === undefined) return <FullScreenLoader />;

	return <Layout>{element}</Layout>;
}
export default PublicRoute;
