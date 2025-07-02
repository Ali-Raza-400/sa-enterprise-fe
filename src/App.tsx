import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import FullScreenLoader from "./components/Loader/FullScreenLoader";
import RouterConfig from "./navigation/RouterConfig.tsx";
import { ConfigProvider, theme as ANTD_THEME } from "antd";
import { useSelector } from "react-redux";
import { THEME } from "./utils/constants.tsx";
// import packageJson from "../package.json";
// import ScreenOverlay from "./components/UI/ScreenOverlay.tsx";

function App() {
  const { theme } = useSelector((state: any) => state.auth);
  const { defaultAlgorithm, darkAlgorithm } = ANTD_THEME;

  return (
    // <ScreenOverlay isApproved={user?.isApproved}>
    <ConfigProvider
      theme={{
        algorithm: theme === THEME.DARK ? darkAlgorithm : defaultAlgorithm,
        ...(theme === THEME.DARK && {
          token: {
            colorBgBase: "#2A2E32",
            colorBgContainer: "#2A2E32",
            colorTextBase: "#ffffff",
            colorText: "#ffffff",
            colorTextPlaceholder: "#bfbfbf",
          },
        }),
      }}
    >
      <Suspense fallback={<FullScreenLoader />}>
        <BrowserRouter>
          <RouterConfig />
        </BrowserRouter>
      </Suspense>
    </ConfigProvider>
    // </ScreenOverlay>
  );
}

export default App;
