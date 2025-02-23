import { LayoutProps, LayoutsMapType } from "./../type";
import AuthLayout from "../Auth";
import PrivateLayout from "../Private";
import PublicLayout from "../Public";

export const layoutsMap: Record<
  LayoutsMapType,
  (props: LayoutProps) => JSX.Element
> = {
  private: PrivateLayout,
  auth: AuthLayout,
  public: PublicLayout,
} as const;
