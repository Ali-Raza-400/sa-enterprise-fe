import { Form, Radio, RadioGroupProps } from "antd";
import React from "react";
import { FormItemUniqueProps } from "./FormFieldGroup";

export interface RadioGroupUniqueProps extends RadioGroupProps {
	radioGroupProps?: RadioGroupProps;
	items?: { value: string; label: string }[];
}

type RadioGroupCustomProps = RadioGroupUniqueProps & FormItemUniqueProps;

export default function RadioGroup(
	props: RadioGroupCustomProps
): React.ReactNode {
	const {
		label,
		name,
		rules,
		fieldClassName,
		margin,
		itemClassName,
		hidden,
		labelCol,
		wrapperCol,
		labelAlign,
		labelClass,
		items,
	} = props;

	return (
		<>
			<Form.Item
				label={label ? <span className={labelClass}>{label}</span> : null}
				name={name}
				rules={rules}
				labelCol={labelCol || { span: 24 }}
				wrapperCol={wrapperCol || { span: 24 }}
				className={`${itemClassName} ${margin === "none" ? "mb-0" : margin === "medium" ? "mb-[1.25rem]" : margin === "small" ? "mb-[0.75rem]" : "mb-[1rem]"}`}
				colon={false}
				hidden={hidden}
				labelAlign={labelAlign}
			>
				<Radio.Group
					name="radiogroup"
					className={`radio-group-custom ${fieldClassName} grid grid-cols-2 gap-6 `}
				>
					{items?.map(
						(item: { value: string; label: string }, index: number) => (
							<Radio
								value={item.value}
								key={`radio${index}`}
								className="w-full text-center"
							>
								{item.label}
							</Radio>
						)
					)}
				</Radio.Group>
			</Form.Item>
		</>
	);
}
