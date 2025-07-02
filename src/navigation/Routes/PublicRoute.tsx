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
          ? PATH.COURSES
          : user.role === LOOKUP_TYPES.Role.SUPER_ADMIN
            ? PATH.SELECT_PROJECT
            : PATH.MANAGE_STUDENTS;
      // axiosInstance.defaults.headers.common['Authorization'] = 'Bearer YOUR_NEW_TOKEN';
    }
  }, [user]);

  // useEffect(() => {
  //   if (user) {
  //     if (user.role === LOOKUP_TYPES.Role.SUPER_ADMIN) {
  //       window.location.href = "/select-project"; // 👈 Super Admin redirect
  //     } else if (user.role === LOOKUP_TYPES.Role.STUDENT) {
  //       window.location.href = PATH.COURSES;
  //     } else {
  //       window.location.href = PATH.TEACHER_DASHBOARD; // or another fallback
  //     }
  //   }
  // }, [user]);

  if (user === undefined) return <FullScreenLoader />;

  return <Layout>{element}</Layout>;
}
export default PublicRoute;
