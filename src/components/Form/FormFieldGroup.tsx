import { Col, FormItemProps, Row, Skeleton } from "antd";
import InputField, { InputFieldUniqueProps } from "./InputField";
import CheckboxField, { CheckboxFieldUniqueProps } from "./CheckboxField";
import SelectField, { SelectFieldUniqueProps } from "./SelectField";
import React from "react";
import DateField, { DateFieldUniqueProps } from "./DateField";
import RadioGroup, { RadioGroupUniqueProps } from "./RadioGroup";

export type OptionsType = {
	label: string;
	value: boolean | string | number;
}[];

export type Rules =
	| {
			validator: (
				_: any,
				value: string[],
				callback: (error?: string) => void
			) => void;
	  }[]
	| {
			[key: string]:
				| string
				| boolean
				| number
				| RegExp
				| ((value: any) => string)
				| ((_: any, value: string) => void);
	  }[];

type fieldMarginType = "large" | "medium" | "small" | "none";
type colBreakPointsType = {
	xs?: number;
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
	xxl?: number;
};
export interface FormItemUniqueProps extends FormItemProps {
	margin?: fieldMarginType;
	itemClassName?: string;
	fieldClassName?: string;
	labelClass?: string;
}

type FieldCommonProps = FormItemUniqueProps & {
	colSpan?: number;
	colBreakPoints?: colBreakPointsType;
	type:
		| "input"
		| "number"
		| "textarea"
		| "password"
		| "date"
		| "checkboxGroup"
		| "checkbox"
		| "select"
		| "custom-component"
		| "datepicker"
		| "radioGroup";
	show?: boolean;
	customComponent?: React.ReactNode;
	colCustomClass?: string;
};

export type FieldProps = FieldCommonProps &
	InputFieldUniqueProps &
	CheckboxFieldUniqueProps &
	SelectFieldUniqueProps &
	DateFieldUniqueProps &
	RadioGroupUniqueProps;

export type FormFieldGroupProps = {
	fieldsConfig: FieldProps[];
	fieldsColSpan?: number;
	fieldsColBreakPoints?: colBreakPointsType;
	gutter?: number;
	isLoading?: boolean;
	fieldsMargin?: fieldMarginType;
	rowCustomClass?: string;
};

export default function FormFieldGroup({
	fieldsConfig,
	fieldsColSpan,
	gutter,
	isLoading,
	fieldsMargin,
	fieldsColBreakPoints,
	rowCustomClass,
}: FormFieldGroupProps) {
	return (
		<Row gutter={gutter ? gutter : 24} className={rowCustomClass}>
			{fieldsConfig?.map((fieldProps: FieldProps, fieldIndex) => {
				const {
					type,
					colSpan,
					options,
					margin,
					colBreakPoints,
					show,
					customComponent,
					colCustomClass,
				} = fieldProps;

				return (
					(show === true || show === undefined) && (
						<Col
							span={colSpan || fieldsColSpan}
							xs={colBreakPoints?.xs || fieldsColBreakPoints?.xs}
							sm={colBreakPoints?.sm || fieldsColBreakPoints?.sm}
							md={colBreakPoints?.md || fieldsColBreakPoints?.md}
							lg={colBreakPoints?.lg || fieldsColBreakPoints?.lg}
							xl={colBreakPoints?.xl || fieldsColBreakPoints?.xl}
							xxl={colBreakPoints?.xxl || fieldsColBreakPoints?.xxl}
							key={fieldIndex}
							className={`${isLoading && "mb-10"} ${colCustomClass}`}
						>
							{isLoading ? (
								<Skeleton.Input active block />
							) : (
								<>
									{type === "input" ||
									type === "password" ||
									type === "textarea" ||
									type === "number" ? (
										<InputField
											{...fieldProps}
											inputType={type}
											margin={margin || fieldsMargin}
										/>
									) : type === "checkboxGroup" || type === "checkbox" ? (
										<CheckboxField
											{...fieldProps}
											type={type}
											options={options}
										/>
									) : type === "select" ? (
										<SelectField
											{...fieldProps}
											margin={margin || fieldsMargin}
											labelCol={fieldProps.labelCol}
											wrapperCol={fieldProps.wrapperCol}
										/>
									) : type === "datepicker" ? (
										<DateField
											{...fieldProps}
											margin={margin || fieldsMargin}
											labelCol={fieldProps.labelCol}
											wrapperCol={fieldProps.wrapperCol}
										/>
									) : type === "radioGroup" ? (
										<RadioGroup
											{...fieldProps}
											margin={margin || fieldsMargin}
											labelCol={fieldProps.labelCol}
											wrapperCol={fieldProps.wrapperCol}
										/>
									) : type === "custom-component" && customComponent ? (
										customComponent
									) : null}
								</>
							)}
						</Col>
					)
				);
			})}
		</Row>
	);
}
