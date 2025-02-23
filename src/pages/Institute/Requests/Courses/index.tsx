import GenericTabs, { Tab } from "../../../../components/UI/GenericTabs";
import { Flex } from "antd/lib";
import SearchFilter from "../../../../components/UI/SearchFilter";
import GenericCard from "../../../../components/UI/GenericCard";
import Approved from "./components/approved";
import UnApproved from "./components/unApproved";

const Index = () => {
	const tabs: Tab[] = [
		// {
		//   name: "New",
		//   content: <h1>New</h1>,
		// },

		{
			name: "Unapproved / New",
			content: (
				<h1>
					<UnApproved />
				</h1>
			),
		},
		{
			name: "Approved",
			content: (
				<h1>
					<Approved />
				</h1>
			),
		},
	];
	return (
		<div>
			<Flex className="justify-between">
				<SearchFilter position="end" />
			</Flex>
			<GenericCard>
				<GenericTabs tabs={tabs} />
			</GenericCard>
		</div>
	);
};

export default Index;
