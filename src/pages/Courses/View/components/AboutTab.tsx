import { ReactElement } from "react";
import InfoCard, { dataType } from "../../Shared/InfoCard";

const AboutTab = (): ReactElement => {
	const dataList: dataType[] = [
		{
			title: "What you'll learn",
			type: "list",
			items: [
				"User Research and Personas",
				"Wireframing and Prototyping",
				"Usability Testing and Feedback",
			],
		},
		{
			title: "Skills you'll learn",
			type: "tags",
			items: [
				"Proficiency in Design Tools",
				"User Research and Analysis",
				"Usability Testing",
			],
		},
		{
			title: "Details to know",
			type: "list",
			items: [
				"You will get certificate",
				"Will be taught in English language",
				"No download or installation required (only available on desktop)",
			],
		},
	];

	return <InfoCard data={dataList} />;
};

export default AboutTab;
