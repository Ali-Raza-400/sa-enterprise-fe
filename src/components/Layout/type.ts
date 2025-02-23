import { PropsWithChildren } from "react";

export type LayoutsMapType = "auth" | "private" | "public";
export type LayoutProps = PropsWithChildren<{ className?: string, hideSidebar?: boolean }>;
