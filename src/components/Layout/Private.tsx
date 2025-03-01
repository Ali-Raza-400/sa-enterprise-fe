import {
	Avatar,
	Button,
	Dropdown,
	Layout,
	Menu,
	MenuProps,
	Space,
	// Switch,
} from "antd";
import {
	UserOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons";
import { LayoutProps } from "./type";
import { useEffect, useState } from "react";
import {
	matchPath,
	useLocation,
	useMatch,
	useNavigate,
} from "react-router-dom";
import { GoChevronDown } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/authSlice";
import { removeUser } from "../../utils/helper";
import IMAGES from "../../assets/images";
import { THEME } from "../../utils/constants";
import Typography from "../UI/Typography";
import { LuBell } from "react-icons/lu";
import ROUTES from "../../navigation/Routes";
import { items, roleBasedItems } from "./constants/SidebarItems";
import NavigateBackButton from "../UI/NavigateBackButton";
import PATH from "../../navigation/Path";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
// import packageJson from "../../../package.json";

const { Header, Content, Sider } = Layout;

function PrivateLayout({ children }: LayoutProps) {
	const [collapsed, setCollapsed] = useState(false);
	const { theme, user } = useSelector((state: any) => state.auth);
	const match = useMatch<"id", string>(PATH.COURSE_VIEW_STUDENT);
	console.log("user====>", user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const clearUser = () => {
		dispatch(setCredentials(null));
		removeUser();
	};
	const { pathname } = useLocation();

	const getPageName = () => {
		const route = ROUTES.find((route) => matchPath(route.path, pathname));
		return route ? route.name : "Page Not Found";
	};

	// Filter items based on the current role
	const getMenuItems = (currentRole: string | number) =>
		items
			.map((item) => {
				if (item?.children) {
					const filteredChildren = item?.children.filter((child) =>
						roleBasedItems[currentRole]?.includes(child?.key)
					);
					return filteredChildren?.length > 0
						? { ...item, children: filteredChildren }
						: null;
				}
				// Include item if it’s permitted for the role
				return roleBasedItems[currentRole]?.includes(item.key) ? item : null;
			})
			.filter(Boolean);

	const profileDropdownItems: MenuProps["items"] = [
		{
			key: "1",
			label: (
				<div
					className="flex items-center"
					// onClick={() => navigate(PATH.INSTITUTE_PROFILE)}
					onClick={() => {
						if (user?.role == "Institute") {
							navigate(PATH.INSTITUTE_PROFILE);
						} else if (user?.role == "Teacher") {
							navigate(PATH.TEACHER_PROFILE.replace(":id", user.id));
						} else if (user?.role == "Student") {
							navigate(PATH.STUDENT_PROFILE.replace(":tab", "profile"));
						}
					}}
				>
					<CgProfile size={20} className="mr-2" />
					My Profile
				</div>
			),
		},
		{
			key: "2",
			label: (
				<div onClick={clearUser} className="flex items-center">
					<FiLogOut size={18} className="mr-2" />
					Logout
				</div>
			),
		},
	];
	// const switchTheme = () => {
	// 	const newTheme = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
	// 	dispatch(setTheme(newTheme));
	// 	setThemeInLS(newTheme as "DARK" | "LIGHT");
	// };

	useEffect(() => {
		const width = window.innerWidth;
		if (width < 991) {
			setCollapsed(true);
		}
	}, [pathname]);

	// useEffect(() => {
	// 	const checkVersion = () => {
	// 		const currentVersion = packageJson.version;
	// 		const storedVersion = localStorage.getItem("appVersion");

	// 		if (storedVersion && storedVersion !== currentVersion) {
	// 			// Clear cache and reload if version mismatch
	// 			localStorage.clear();
	// 			sessionStorage.clear();
	// 			window.location.reload();
	// 		} else {
	// 			// Store the current version
	// 			localStorage.setItem("appVersion", currentVersion);
	// 		}
	// 	};

	// 	checkVersion();
	// }, []);

	return (
		<Layout className={`min-h-screen ${theme.toLowerCase()} mobile-responsive`}>
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
				breakpoint="lg"
				collapsedWidth="75"
				onBreakpoint={(broken) => {
					setCollapsed(broken);
				}}
				style={{
					overflow: "hidden",
					height: "100vh",
					position: "fixed",
					insetInlineStart: 0,
					top: 0,
					zIndex: 2,
					bottom: 0,
					scrollbarWidth: "thin",
					scrollbarColor: "unset",
					backgroundColor: theme === THEME.DARK ? "#212529" : "#8970D6", // Replace this with your custom color
				}}
				theme={theme.toLowerCase()}
			>
				<div
					onClick={() => setCollapsed(!collapsed)}
					className="cursor-pointer hidden lg:hidden bg-[#BEB0E8] py-2 w-full justify-center items-center max-lg:flex"
				>
					<span className="!min-w-0 ">
						{collapsed ? (
							<FaChevronRight className="!text-white" />
						) : (
							<FaChevronLeft className="!text-white" />
						)}
					</span>
				</div>
				<div className="flex flex-col h-full justify-between py-5 px-1">
					<div>
						<img src={IMAGES.ALMS_LOGO_NEW2} className="mb-5 w-[60%] mx-auto" />
						<Menu
							theme={theme.toLowerCase()}
							mode="inline"
							selectedKeys={[pathname]}
							items={getMenuItems(user?.role)}
							style={{
								backgroundColor: theme === THEME.DARK ? "#212529" : "#8970D6", // Replace with your custom color
							}}
						/>
					</div>
					{/* <div className="w-full flex justify-center">
						<Switch
							className={`theme-switch ${theme === THEME.LIGHT ? "light-switch" : "dark-switch"}`}
							unCheckedChildren={<MdDarkMode size={18} fill="black" />}
							checkedChildren={<MdLightMode size={18} />}
							defaultChecked={theme === THEME.LIGHT}
							onChange={switchTheme}
						/>
					</div> */}

					{/* <div className="flex justify-center ">
						<div className="bg-[#FCAB60] p-2 rounded-[10px] w-[11.5rem]">
							<Space className="profile-dropdown-space">
								<Avatar
									src={`https://ui-avatars.com/api/?name=${`${user?.fullName || "USER"}`}&background=C95151&color=fff`}
									size={40}
									className="cursor-pointer"
									icon={<UserOutlined />}
								/>
								<div className=" ">
									<p
										className="font-semibold text-white "
										style={{ fontSize: "clamp(0.75rem, 2.5vw, 1.25rem)" }}
									>
										{user?.fullName || "USER"}
									</p>
									<Dropdown
										menu={{
											items: profileDropdownItems,
										}}
										trigger={["click"]}
										className="profile-dropdown text-white"
										placement="bottomCenter"
										overlayClassName="position-fixed"
									>
										<Space className="profile-dropdown-space">
											<Space className="flex cursor-pointer">
												<Typography variant="bodySmallRegular" color="white">
													Profile Settings
												</Typography>
												<GoChevronDown className="cursor-pointer" />
											</Space>
										</Space>
									</Dropdown>
								</div>
							</Space>
							<Divider className="bg-white my-3" />
							<div
								onClick={clearUser}
								className="flex items-center text-white cursor-pointer"
							>
								<FiLogOut size={18} className="mr-2" />
								Logout
							</div>
						</div>
					</div> */}
				</div>
			</Sider>
			<Layout className="ms-[4rem] sm:ms-[4.5rem] md:ms-[4.5rem] lg:ms-[12.5rem] xl:ms-[12.5rem]">
				<Header
					className={`bg-white dark:bg-[#212529] px-8 flex justify-between items-center`}
					style={{
						position: "sticky",
						top: 0,
						zIndex: 1,
						width: "100%",
						display: "flex",
						alignItems: "center",
					}}
				>
					<div className="flex items-center gap-2 ">
						<Button
							type="text"
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={() => setCollapsed(!collapsed)}
							className="!hidden !min-w-0"
						/>
						<NavigateBackButton />
						<Typography variant="headingFour" className="hide-on-mobile">
							{getPageName()}
						</Typography>
					</div>
					<div className="flex justify-center items-center gap-2 xs:gap-4">
						<div className="p-2 rounded-full">
							<LuBell size={25} color="#8970D6" />
						</div>
						<div>
							<Dropdown
								menu={{
									items: profileDropdownItems,
								}}
								trigger={["click"]}
								className="profile-dropdown"
								placement="bottomRight"
								overlayClassName="position-fixed"
							>
								<Space className="profile-dropdown-space">
									<Avatar
										src={
											IMAGES.PERSON_IMG
										}
										size={40}
										className="cursor-pointer"
										icon={<UserOutlined />}
									/>
									<p className="mb-0 cursor-pointer user-name text-black dark:text-white font-bold hidden xs:block">
										{user?.fullName}
									</p>
									<GoChevronDown className="cursor-pointer d-flex align-items-center" />
								</Space>
							</Dropdown>
						</div>
					</div>
				</Header>
				<Content className={`p-8 bg-[#F5F5F5] dark:bg-[#212529]`}>
					<div className={` h-full`}>
						{!match && (
							<div className="show-on-mobile">
								<Typography variant="headingFour">{getPageName()}</Typography>
							</div>
						)}
						{/* <div className={`bg-white dark:bg-[#2A2E32] h-full rounded-lg p-5`}> */}
						{children}
					</div>
				</Content>
			</Layout>
		</Layout>
	);
}
export default PrivateLayout;
