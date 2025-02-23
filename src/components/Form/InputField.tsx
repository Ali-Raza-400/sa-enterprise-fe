import { Form, Input, InputNumber, InputNumberProps, InputProps } from "antd";
import React from "react";
import { FormItemUniqueProps } from "./FormFieldGroup";
import { TextAreaProps } from "antd/es/input";

type CombinedPropType = InputNumberProps & InputProps & TextAreaProps;

export interface InputFieldUniqueProps extends CombinedPropType {
	siblingNode?: React.ReactNode;
	inputType?: "input" | "number" | "textarea" | "password";
	inputPrefix?: React.ReactNode;
	name: any;
}

type InputFieldProps = InputFieldUniqueProps & FormItemUniqueProps;

export default function InputField(props: InputFieldProps): React.ReactNode {
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
		siblingNode,
		labelAlign,
		labelClass,
		inputType,
		inputPrefix,
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
				{inputType === "input" ? (
					<Input
						className={`custom-input ${fieldClassName}`}
						{...props}
						prefix={inputPrefix}
					/>
				) : inputType === "number" ? (
					<InputNumber
						className={`custom-input w-full ${fieldClassName}`}
						{...props}
					/>
				) : inputType === "textarea" ? (
					<Input.TextArea
						{...props}
						className={`custom-input ${fieldClassName}`}
					/>
				) : inputType === "password" ? (
					<Input.Password
						{...props}
						prefix={inputPrefix}
						className={`custom-input ${fieldClassName}`}
					/>
				) : (
					""
				)}
			</Form.Item>
			{siblingNode}
		</>
	);
}
