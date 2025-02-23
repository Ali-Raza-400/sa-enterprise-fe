// import { Switch } from "antd";
import { LayoutProps } from "./type";
// import { MdDarkMode, MdLightMode } from "react-icons/md";
// import { THEME } from "../../utils/constants";
import { useSelector } from "react-redux";
// import { setThemeInLS } from "../../utils/helper";
// import { setTheme } from "../../redux/features/authSlice";

function AuthLayout({ children }: LayoutProps) {
	const { theme } = useSelector((state: any) => state.auth);
	// const dispatch = useDispatch();

	// const switchTheme = () => {
	// 	const newTheme = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
	// 	dispatch(setTheme(newTheme));
	// 	setThemeInLS(newTheme as "DARK" | "LIGHT");
	// };

	return (
		<div
			className={` h-screen flex flex-col justify-center dark:bg-[#212529] ${theme.toLowerCase()}`}
		>
			<div className="h-full justify-center flex flex-col">{children}</div>
			{/* <div>
				<Switch
					className={`theme-switch mb-[2rem] ${theme === THEME.LIGHT ? "light-switch" : "dark-switch"}`}
					unCheckedChildren={<MdDarkMode size={18} fill="black" />}
					checkedChildren={<MdLightMode size={18} />}
					defaultChecked={theme === THEME.LIGHT}
					onChange={switchTheme}
				/>
			</div> */}
		</div>
	);
}

export default AuthLayout;
