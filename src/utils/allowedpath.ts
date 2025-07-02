import { useLocation } from "react-router-dom";

const allowedPaths = ["select-project"]; // Add more paths as needed

const useIsAllowedPath = (): boolean => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return allowedPaths.some((path) => pathSegments.includes(path));
};

export default useIsAllowedPath;
