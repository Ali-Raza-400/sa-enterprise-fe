import { DatePicker, DatePickerProps, Form } from "antd";
import React from "react";
import { FormItemUniqueProps } from "./FormFieldGroup";

export interface DateFieldUniqueProps extends DatePickerProps {
	dateMode?: DatePickerProps["mode"];
	name: any;
}

type DateFieldProps = DateFieldUniqueProps & FormItemUniqueProps;

export default function DateField(props: DateFieldProps): React.ReactNode {
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
		dateMode,
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
				<DatePicker
					className={`custom-input w-full ${fieldClassName}`}
					{...props}
					mode={dateMode}
				/>
			</Form.Item>
		</>
	);
}
