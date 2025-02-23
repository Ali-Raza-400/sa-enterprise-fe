// import { useNavigate } from "react-router-dom";
import GenericTabs, { Tab } from "../../../../components/UI/GenericTabs";
import { Flex } from "antd/lib";
// import GenericButton from "../../../../components/UI/GenericButton";
import SearchFilter from "../../../../components/UI/SearchFilter";
// import { FaPlus } from "react-icons/fa6";
// import PATH from "../../../../navigation/Path";
import GenericCard from "../../../../components/UI/GenericCard";
// import New from "./components/new";
import Approved from "./components/approved";
import UnApproved from "./components/unApproved";

const Index = () => {
	//   const navigate = useNavigate();
	const tabs: Tab[] = [
		// {
		//   name: "New",
		//   content: <New />,
		// },

		{
			name: "Unapproved / New",
			content: <UnApproved />,
		},
		{
			name: "Approved",
			content: <Approved />,
		},
	];
	return (
		<div>
			<Flex className="justify-between">
				<SearchFilter position="end" />
				{/* <GenericButton
          icon={<FaPlus size={20} />}
          label="Add Teacher / Assistant Teacher"
          onClick={() => navigate(PATH.MANAGE_TEACHER_CREATE)}
        /> */}
			</Flex>
			<GenericCard>
				<GenericTabs tabs={tabs} />
			</GenericCard>
		</div>
	);
};

export default Index;
