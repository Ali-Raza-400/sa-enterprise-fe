import { ReactNode } from "react";
import { LayoutsMapType } from "../components/Layout/type";

export type RouteTypeProps = {
  element: ReactNode;
  layout: LayoutsMapType;
  hideSidebar?: boolean,
  wrapperClass?: string
};

export type PermissionType = 1 | 2 | 3;

export type SingleRouteType = {
  name: string;
  path: string;
  page: JSX.Element | undefined;
  routeType: (props: RouteTypeProps) => JSX.Element;
  layout: LayoutsMapType;
  hide?: boolean;
  permissionToRole?: PermissionType,
  hideSidebar?: boolean,
  wrapperClass?: string
};

export type ChildrenRouteType = {
  name: string;
  path: string;
  page: React.ReactNode;
  index?: boolean;
  permissionToRole?: PermissionType,
  wrapperClass?: string
};

export type RouteType = SingleRouteType & {
  children?: ChildrenRouteType[];
};