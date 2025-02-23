import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";

interface AccordionItem {
	key?: string;
	label?: string;
	content?: React.ReactNode;
}

interface GenericAccordionProps extends CollapseProps {
	items: AccordionItem[];
	className?: string;
}

const GenericAccordion: React.FC<GenericAccordionProps> = ({
	items,
	className,
	...props
}) => {
	const collapseItems: CollapseProps["items"] = items.map((item) => ({
		key: item.key,
		label: item.label,
		children: item.content,
	}));

	return (
		<Collapse
			accordion
			items={collapseItems}
			className={className}
			{...props}
		/>
	);
};

export default GenericAccordion;
