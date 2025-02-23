import { ReactElement } from "react";
import { Flex } from "antd";
import GenericButton from "../../components/UI/GenericButton";
import SearchFilter from "../../components/UI/SearchFilter";
import { FaPlus } from "react-icons/fa6";
import GenericCard from "../../components/UI/GenericCard";
import GenericTabs, { Tab } from "../../components/UI/GenericTabs";
import PATH from "../../navigation/Path";
import { useNavigate } from "react-router-dom";
import TeachersTab from "./Components/TeachersTab";
import AssistantTeachersTab from "./Components/AssistantTeachersTab";

const Index = (): ReactElement => {
	const navigate = useNavigate();
	const tabs: Tab[] = [
		{
			name: "Teacher",
			content: <TeachersTab />,
		},
		{
			name: "Assistant Teacher",
			content: <AssistantTeachersTab />,
		},
	];

	return (
		<>
			<Flex className="justify-between">
				<SearchFilter position="end" />
				<GenericButton
					icon={<FaPlus size={20} />}
					label="Add Teacher / Assistant Teacher"
					onClick={() => navigate(PATH.MANAGE_TEACHER_CREATE)}
				/>
			</Flex>
			<GenericCard>
				<GenericTabs tabs={tabs} />
			</GenericCard>
		</>
	);
};

export default Index;
