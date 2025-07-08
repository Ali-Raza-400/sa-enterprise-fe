import { RouteTypeProps } from "../type";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PATH from "../Path";
import { layoutsMap } from "../../components/Layout/constants";
import FullScreenLoader from "../../components/Loader/FullScreenLoader";
import { useSelector } from "react-redux";

// Protected Routes for logged In User
function ProtectedRoute({
  element,
  layout,
  hideSidebar,
  wrapperClass,
}: RouteTypeProps) {
  const Layout = layoutsMap[layout];
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);

  // useEffect(() => {
  //   if (user === null) {
  //     navigate(PATH.LOGIN);
  //   }
  // }, [user, navigate]);
  useEffect(() => {
    if (user === null) {
      navigate(PATH.LOGIN);
      return;
    }

    const superUserRaw = localStorage.getItem("super_user");
    const projectRaw = localStorage.getItem("super_user");
    if (superUserRaw) {
      const superUser = JSON.parse(superUserRaw);
      const project = projectRaw ? JSON.parse(projectRaw) : null;

      const isSuperAdmin = superUser?.role === "super_admin";

      const isOnSelectProjectPage =
        window.location.pathname === "/select-project";

      if (isSuperAdmin && !project?.id && !isOnSelectProjectPage) {
        navigate("/select-project");
      }
    }
  }, [user, navigate]);

  if (user === undefined) return <FullScreenLoader />;

  return (
    <Layout hideSidebar={hideSidebar} className={wrapperClass}>
      {element}
    </Layout>
  );
}

export default ProtectedRoute;
