import { ReactElement } from "react";
import GenericTabs, { Tab } from "../../../components/UI/GenericTabs";
import { Flex } from "antd";
import SearchFilter from "../../../components/UI/SearchFilter";
import GenericCard from "../../../components/UI/GenericCard";
import CourseTab from "./CourseWise/CourseTab";
import StudentTab from "./StudentsWise/StudentsTab";

const Index = (): ReactElement => {
	const tabs: Tab[] = [
		{
			name: "Student",
			content: <StudentTab />,
		},
		{
			name: "Course ",
			content: <CourseTab />,
		},
	];

	return (
		<>
			<Flex className="justify-start">
				<SearchFilter position="end" />
			</Flex>
			<GenericCard>
				<GenericTabs tabs={tabs} />
			</GenericCard>
		</>
	);
};

export default Index;
