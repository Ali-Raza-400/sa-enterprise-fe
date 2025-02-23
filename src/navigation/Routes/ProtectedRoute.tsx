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

  useEffect(() => {
    if (user === null) {
      navigate(PATH.LOGIN);
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
