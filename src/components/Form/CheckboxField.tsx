import { Checkbox, CheckboxProps, Col, Form, Row } from "antd";
import { FormItemUniqueProps, OptionsType } from "./FormFieldGroup";

export interface CheckboxFieldUniqueProps extends CheckboxProps {
	options?: OptionsType;
}

type CheckboxFieldProps = CheckboxFieldUniqueProps &
	FormItemUniqueProps & {
		type: "checkboxGroup" | "checkbox";
		defaultValue?: string[];
	};

export default function CheckboxField(props: CheckboxFieldProps) {
	const {
		label,
		name,
		rules,
		type,
		fieldClassName,
		options,
		margin,
		defaultValue,
		hidden,
	} = props;
	return (
		<Form.Item
			label={type === "checkboxGroup" && label ? label : null}
			name={name}
			rules={rules}
			className={` ${margin === "none" ? "mb-0" : margin === "medium" ? "mb-[1.25rem]" : margin === "small" ? "mb-[0.75rem]" : "mb-[1rem]"}`}
			labelCol={{ span: 24 }}
			wrapperCol={{ span: 24 }}
			colon={false}
			valuePropName="checked"
			hidden={hidden}
		>
			{type === "checkboxGroup" ? (
				<Checkbox.Group style={{ width: "100%" }} defaultValue={defaultValue}>
					<Row gutter={24} className="gap-y-5">
						{options?.map((options, optionKey) => {
							return (
								<Col xs={24} md={12}>
									<Checkbox
										key={optionKey}
										value={options?.value}
										className={`custom-checkbox ${fieldClassName}`}
									>
										{options?.label}
									</Checkbox>
								</Col>
							);
						})}
					</Row>
				</Checkbox.Group>
			) : (
				type === "checkbox" && (
					<Checkbox className={fieldClassName} {...props}>
						{label}
					</Checkbox>
				)
			)}
		</Form.Item>
	);
}
