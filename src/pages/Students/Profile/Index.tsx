import React, { ReactNode, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row, Tabs, Grid } from "antd";
import GenericCard from "../../../components/UI/GenericCard";
import Introduction from "./Components/Introduction";
import ClearedCourses from "./Components/ClearedCourses";
import CurrentCourses from "./Components/CurrentCourses";
// import Payment from "./Components/Payment";
import ChangePassword from "./Components/ChangePassword";
// import PurchaseHistory from "./Components/PurchaseHistory";
import CourseInterest from "./Components/CourseInterest";
import PATH from "../../../navigation/Path";
import SelectField from "../../../components/Form/SelectField";
import CertificationCard from "./Components/Certifications";

interface TabItem {
	label: string;
	key: string;
	content: ReactNode;
}

const App: React.FC = () => {
	const navigate = useNavigate();
	const { tab } = useParams<{ tab: string }>();
	const screens = Grid.useBreakpoint();

	const tabItems: TabItem[] = [
		{ label: "My Profile", key: "profile", content: <Introduction /> },
		{ label: "Courses Cleared", key: "completed", content: <ClearedCourses /> },
		{ label: "Current Courses", key: "current", content: <CurrentCourses /> },
		{
			label: "Certification",
			key: "certificate",
			content: <CertificationCard />,
		},
		// { label: "Payment", key: "payment", content: <Payment /> },
		{ label: "Change Password", key: "password", content: <ChangePassword /> },
		// { label: "Purchase History", key: "history", content: <PurchaseHistory /> },
		{ label: "Interests", key: "interest", content: <CourseInterest /> },
	];

	const initialKey = tab || "profile";
	const [activeKey, setActiveKey] = useState<string>(initialKey);

	const handleTabChange = (key: string) => {
		setActiveKey(key);
		navigate(PATH.STUDENT_PROFILE.replace(":tab", key));
	};

	const categoryOptions = tabItems.map((tab) => ({
		label: tab.label,
		value: tab.key,
	}));

	return (
		<Row gutter={[24, 24]}>
			<Col span={24} lg={9} xl={6}>
				<GenericCard className="!p-0" noMargin={true}>
					{screens.lg || screens.xl || screens.xxl ? (
						<Tabs
							className="custom-vertical-tabs min-h-[60vh]"
							activeKey={activeKey}
							tabPosition="left"
							onChange={handleTabChange}
							items={tabItems.map((tab) => ({
								label: tab.label,
								key: tab.key,
							}))}
						/>
					) : (
						<SelectField
							options={categoryOptions}
							value={activeKey}
							onChange={(value) => handleTabChange(value as string)}
							placeholder="Select Tab"
						/>
					)}
				</GenericCard>
			</Col>

			<Col span={24} lg={15} xl={18}>
				<div>{tabItems.find((tab) => tab.key === activeKey)?.content}</div>
			</Col>
		</Row>
	);
};

export default App;
