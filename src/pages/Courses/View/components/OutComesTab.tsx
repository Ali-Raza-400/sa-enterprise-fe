import InfoCard, { dataType } from "../../Shared/InfoCard";

const OutComesTab = () => {
	const dataList: dataType[] = [
		{
			title: "Learn, practice, and apply job-ready skills in less than 2 hours",
			type: "list",
			items: [
				"Receive training from industry experts",
				"Gain hands-on experience solving real-world job tasks",
				"Build confidence using the latest tools and technologies",
			],
		},
	];

	return <InfoCard data={dataList} />;
};

export default OutComesTab;
