import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import ROUTES from "./Routes.tsx";
import WEB_PAGES from "../pages/index.ts";
import PATH from "./Path.ts";
import { useSelector } from "react-redux";
import ScreenOverlay from "../components/UI/ScreenOverlay.tsx";
import { LOOKUP_TYPES } from "../utils/lookup.tsx";

// Router Configuration
function RouterConfig() {
	const [progress, setProgress] = useState(false);
	const [prevLoc, setPrevLoc] = useState("");
	const location = useLocation();
	const { user } = useSelector((state: any) => state.auth);

	useEffect(() => {
		setPrevLoc(location.pathname);
		setProgress(true);
		if (location.pathname === prevLoc) {
			setPrevLoc("");
		}
	}, [location]);

	useEffect(() => {
		setProgress(false);
	}, [prevLoc]);

	TopBarProgress.config({
		barColors: {
			0: "#272F95",
			"1.0": "#272F95",
		},
		shadowBlur: 5,
	});
	return (
		<>
			{progress && <TopBarProgress />}
			<ScreenOverlay
				isApproved={
					user?.role === LOOKUP_TYPES.Role.STUDENT ? user?.isApproved : true
				}
			>
				<Routes>
					{ROUTES.map((item) => {
						const RouteType = item.routeType;
						if (item?.hide) return;
						if (!user || user?.isActive) {
							return (
								<Route
									key={item.path}
									path={item.path}
									element={
										<RouteType
											element={item?.page}
											layout={item?.layout}
											hideSidebar={item?.hideSidebar}
											wrapperClass={item?.wrapperClass}
										/>
									}
								>
									{item?.children?.map((child) => {
										return (
											<Route
												key={child.path}
												{...(child?.index
													? { index: true }
													: { path: child.path })}
												element={child?.page}
											/>
										);
									})}
								</Route>
							);
						} else if (!user.isActive) {
							return (
								<Route
									key={item.path}
									path={item.path}
									element={<WEB_PAGES.OTP_SCREEN />}
								/>
							);
						} else {
							return (
								<Route
									key={item.path}
									path={item.path}
									element={<WEB_PAGES.NO_ACCESS />}
								/>
							);
						}
					})}
					{/* NO PAGE FOUND */}
					<Route path={PATH.NOPAGE} element={<WEB_PAGES.NO_PAGE_FOUND />} />
				</Routes>
			</ScreenOverlay>
		</>
	);
}

export default RouterConfig;
