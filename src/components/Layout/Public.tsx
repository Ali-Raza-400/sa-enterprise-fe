import { useSelector } from "react-redux";
import { LayoutProps } from "./type";

function PublicLayout({ children }: LayoutProps) {
  const { theme } = useSelector((state: any) => state.auth);

  return (
    <div
      className={`d-flex align-items-center public min-h-screen ${theme.toLowerCase()}`}
    >
      {children}
    </div>
  );
}

export default PublicLayout;
