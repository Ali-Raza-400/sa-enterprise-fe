import {
  AutoComplete,
  Avatar,
  Button,
  Dropdown,
  Input,
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
  SearchOutlined,
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
import { CiSettings } from "react-icons/ci";

import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/authSlice"; //setZoneId
import { removeProjectLocalStorage, removeUser } from "../../utils/helper";
import IMAGES from "../../assets/images";
import { THEME } from "../../utils/constants";
import Typography from "../UI/Typography";
import ROUTES from "../../navigation/Routes";
import { items, roleBasedItems } from "./constants/SidebarItems";
import NavigateBackButton from "../UI/NavigateBackButton";
import PATH from "../../navigation/Path";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import useIsAllowedPath from "../../utils/allowedpath";

import { clearProject } from "../../redux/features/projectSlice";

const { Header, Content, Sider } = Layout;

function PrivateLayout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, user } = useSelector((state: any) => state.auth);
  const { project } = useSelector((state: any) => state.project);

  const match = useMatch<"id", string>(PATH.COURSE_VIEW_STUDENT);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAllowed = useIsAllowedPath();
  const clearUser = () => {
    removeUser();
    removeProjectLocalStorage();
    dispatch(setCredentials(null));
    dispatch(clearProject());
    navigate("/");
  };

  const { pathname } = useLocation();
  // const [tableOptions] = useState({
  //   filters: {},
  //   pagination: {
  //     page: 1,
  //     pageSize: 10,
  //   },
  // });
  // const { data: zoneData } = useGetZonesQuery(tableOptions);
  const getPageName = () => {
    const route = ROUTES.find((route) => matchPath(route.path, pathname));
    return route ? route.name : "Page Not Found";
  };

  const getMenuItems = (currentRole: string | number) =>
    items
      .map((item) => {
        // if (item?.children) {
        //   const filteredChildren = item?.children.filter((child) =>
        //     roleBasedItems[currentRole]?.includes(child?.key)
        //   );
        //   return filteredChildren?.length > 0
        //     ? { ...item, children: filteredChildren }
        //     : null;
        // }
        return roleBasedItems[currentRole]?.includes(item.key) ? item : null;
      })
      .filter(Boolean);

  const profileDropdownItems: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <div
          className="flex items-center"
          onClick={() => navigate(PATH.INSTITUTE_PROFILE)}
        >
          <CgProfile size={20} className="mr-2" />
          My Profile
        </div>
      ),
    },
    ...(user?.role === "super_admin"
      ? [
          {
            key: "1",
            label: (
              <div
                className="flex items-center"
                onClick={() => navigate(PATH.SELECT_PROJECT)}
              >
                <CiSettings size={20} className="mr-2" />
                Change Project
              </div>
            ),
          },
        ]
      : []),
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
  const [searchValue, setSearchValue] = useState<string>("");
  // const [searchZone, setSearchZone] = useState<string>("");
  const onSelect = (value: string, option: any) => {
    setSearchValue(option.label); // Display label instead of value (URL)
    navigate(value); // Navigate to the selected module
  };
  const modules = [
    { label: "Dashboard", value: "/admin-dashboard" },
    { label: "Manage Vehicle", value: "/truck/list" },
    { label: "Manage Users", value: "/user/list" },
    { label: "Add User", value: "/create-user" },
    { label: "Manage Oprations", value: "/operation/list" },
    { label: "Add Oprations", value: "/manage-operation/create" },
  ];

  // const zoneOptions = (zoneData?.list || [])?.map((zone: any) => ({
  //   value: String(zone.id),
  //   label: zone.name,
  // }));

  // Handle selection

  // const onSelectZone = (value: string) => {
  //   dispatch(setZoneId(Number(value)));
  //   setSearchZone(
  //     zoneOptions.find((zone: any) => zone.value === value)?.label || ""
  //   );
  // };
  // const onClearZone = () => {
  //   dispatch(setZoneId(null)); // Reset zoneId to 90
  //   setSearchZone(""); // Clear the search input
  // };
  return (
    <Layout className={`min-h-screen ${theme.toLowerCase()} mobile-responsive`}>
      {!isAllowed ? (
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
            maxWidth: "220px",
            minWidth: "220px",
            width: "220px",
            zIndex: 2,
            bottom: 0,
            scrollbarWidth: "thin",
            scrollbarColor: "unset",
            backgroundColor: theme === THEME.DARK ? "#212529" : "#008000", // Replace this with your custom color
          }}
          theme={theme.toLowerCase()}
        >
          <div
            onClick={() => setCollapsed(!collapsed)}
            className="bg-[#BEB0E8] justify-center w-full cursor-pointer hidden items-center lg:hidden max-lg:flex py-2"
          >
            <span className="!min-w-0">
              {collapsed ? (
                <FaChevronRight className="!text-white" />
              ) : (
                <FaChevronLeft className="!text-white" />
              )}
            </span>
          </div>
          <div className="flex flex-col h-full justify-between px-1 py-5">
            <div>
              <img
                src={IMAGES.ALMS_LOGO_NEW2}
                className="h-[auto] rounded-[2px] w-[70%] cursor-pointer mx-auto"
                onClick={() => navigate("/admin-dashboard")}
              />
              <Menu
                theme={theme.toLowerCase()}
                mode="inline"
                selectedKeys={[pathname]}
                items={getMenuItems(user?.role)}
                style={{
                  backgroundColor: theme === THEME.DARK ? "#212529" : "#008000", // Replace with your custom color
                }}
              />
            </div>
            {/* <div className="flex justify-center w-full">
						<Switch
							className={`theme-switch ${theme === THEME.LIGHT ? "light-switch" : "dark-switch"}`}
							unCheckedChildren={<MdDarkMode size={18} fill="black" />}
							checkedChildren={<MdLightMode size={18} />}
							defaultChecked={theme === THEME.LIGHT}
							onChange={switchTheme}
						/>
					</div> */}

            {/* <div className="flex justify-center">
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
										className="text-white font-semibold"
										style={{ fontSize: "clamp(0.75rem, 2.5vw, 1.25rem)" }}
									>
										{user?.fullName || "USER"}
									</p>
									<Dropdown
										menu={{
											items: profileDropdownItems,
										}}
										trigger={["click"]}
										className="text-white profile-dropdown"
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
								className="flex text-white cursor-pointer items-center"
							>
								<FiLogOut size={18} className="mr-2" />
								Logout
							</div>
						</div>
					</div> */}
          </div>
        </Sider>
      ) : (
        <></>
      )}
      <Layout className="lg:ms-[13.6rem] md:ms-[4.5rem] ms-[4rem] sm:ms-[4.5rem] xl:ms-[13.6rem]">
        {!isAllowed ? (
          <Header
            className="flex bg-white justify-between dark:bg-[#212529] items-center px-8"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="flex gap-4 items-center">
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

              {(user?.role === "super_admin" ||
                user?.role === "operations_manager") && (
                <div className="w-[150px] ml-4">
                  <AutoComplete
                    options={modules}
                    onSelect={onSelect}
                    value={searchValue}
                    allowClear
                    onChange={(value) => setSearchValue(value)}
                    filterOption={(inputValue, option) =>
                      option!.label
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    }
                    style={{ width: "100%" }}
                  >
                    <Input
                      placeholder="Search Modules..."
                      prefix={
                        <SearchOutlined
                          className="h-5 text-customGreen "
                          style={{ fontSize: "14px" }}
                        />
                      } // Smaller search icon
                      size="middle"
                    />
                  </AutoComplete>
                </div>
              )}
            </div>
            {user?.role === "super_admin" ? (
              <>
                <h3 style={{ color: "#008000", textTransform: "uppercase" }}>
                  {project?.name ? project?.name : ""}
                </h3>
              </>
            ) : (
              <></>
            )}

            <div className="flex justify-center gap-2 items-center xs:gap-4">
              <div>
                <Dropdown
                  menu={{ items: profileDropdownItems }}
                  trigger={["click"]}
                  className="profile-dropdown"
                  placement="bottomRight"
                  overlayClassName="position-fixed"
                >
                  <Space className="profile-dropdown-space">
                    <Avatar
                      src={IMAGES.PERSON_IMG}
                      size={40}
                      className="cursor-pointer"
                      icon={<UserOutlined />}
                    />
                    <p className="text-black cursor-pointer dark:text-white font-bold hidden mb-0 user-name xs:block">
                      {user?.fullName}
                    </p>
                    <GoChevronDown className="d-flex align-items-center cursor-pointer" />
                  </Space>
                </Dropdown>
              </div>
            </div>
          </Header>
        ) : (
          <></>
        )}

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
        {!isAllowed ? (
          <footer
            className="text-center text-white py-3"
            style={{ background: "#2E3383" }}
          >
            <p className="text-sm">
              Copyright © {new Date().getFullYear()} S.A Enterprises, Powered
              by S.A Enterprises. All Rights Reserved.
            </p>
          </footer>
        ) : (
          <></>
        )}
      </Layout>
    </Layout>
  );
}
export default PrivateLayout;
