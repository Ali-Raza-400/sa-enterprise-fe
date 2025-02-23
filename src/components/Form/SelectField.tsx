import { Form, Select, SelectProps } from "antd";
import React from "react";
import { FormItemUniqueProps } from "./FormFieldGroup";

export interface SelectFieldUniqueProps extends SelectProps {
	selectMode?: SelectProps["mode"];
}

type SelectFieldProps = SelectFieldUniqueProps & FormItemUniqueProps;

export default function SelectField(
	selectProps: SelectFieldProps
): React.ReactNode {
	const {
		label,
		name,
		rules,
		margin,
		fieldClassName,
		itemClassName,
		labelCol,
		wrapperCol,
		labelAlign,
		labelClass,
		filterOption,
		selectMode,
	} = selectProps;
	return (
		<>
			<Form.Item
				label={label ? <span className={labelClass}>{label}</span> : null}
				name={name}
				rules={rules}
				labelCol={labelCol || { span: 24 }}
				wrapperCol={wrapperCol || { span: 24 }}
				className={`${itemClassName} ${margin === "none" ? "mb-0" : margin === "medium" ? "mb-[1.25rem]" : margin === "small" ? "mb-[0.75rem]" : "mb-[2.2rem]"}`}
				colon={false}
				labelAlign={labelAlign}
			>
				<Select
					{...selectProps}
					className={`custom-input ${fieldClassName}`}
					optionFilterProp="label"
					mode={selectMode}
					popupMatchSelectWidth={false}
					filterOption={
						filterOption ||
						((input, option) =>
							(option?.label?.toString() ?? "")
								.toLowerCase()
								.includes(input.toLowerCase()))
					}
				/>
			</Form.Item>
		</>
	);
}
