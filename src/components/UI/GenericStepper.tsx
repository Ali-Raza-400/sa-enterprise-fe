import React, { useState } from "react";
import { Divider, Flex, message, Steps } from "antd";
import GenericButton from "./GenericButton";

interface Step {
	title: string;
	content: React.ReactNode;
	onNext?: (next: () => void) => void;
	onPrev?: () => void;
}

interface ButtonProps {
	label?: string;
	htmlType?: "button" | "submit" | "reset";
	disabled?: boolean;
	onClick?: () => void;
}

interface GenericStepperProps {
	steps: Step[];
	nextButtonProps?: ButtonProps;
	prevButtonProps?: ButtonProps;
	publishButtonProps?: ButtonProps;
	draftButtonProps?: ButtonProps;
	marginTop?: "sm" | "lg" | "xl" | string;
}

const GenericStepper: React.FC<GenericStepperProps> = ({
	steps,
	nextButtonProps = { label: "Next" },
	prevButtonProps = { label: "Previous" },
	publishButtonProps = { label: "Publish" },
	draftButtonProps = { label: "Save as Draft" },
	marginTop = "24px",
	...props
}) => {
	const [current, setCurrent] = useState(0);

	const next = () => {
		setCurrent((prev) => prev + 1);
	};

	const prev = () => {
		if (steps[current].onPrev) {
			steps[current].onPrev!();
		}
		setCurrent((prev) => prev - 1);
	};

	const items = steps.map((item) => ({ key: item.title, title: item.title }));
	const getMarginTopClass = (marginTop: string | number): string => {
		switch (marginTop) {
			case "sm":
				return "mt-2";
			case "lg":
				return "mt-4";
			case "xl":
				return "mt-8";
			default:
				return typeof marginTop === "number" ? `mt-${marginTop}` : marginTop;
		}
	};

	return (
		<>
			<Steps
				current={current}
				items={items}
				className="custom-stepper"
				{...props}
			/>
			<div className={`${getMarginTopClass(marginTop)} min-h-[64vh]`}>
				{steps[current].content}
			</div>
			{current !== steps.length - 1 && <Divider />}
			<div
				className={`flex ${current === 0 ? "justify-end" : "justify-between"}`}
			>
				{current > 0 && current !== steps.length - 1 && (
					<GenericButton
						htmlType={prevButtonProps.htmlType || "button"}
						disabled={prevButtonProps.disabled}
						onClick={() => {
							prevButtonProps.onClick ? prevButtonProps.onClick() : prev();
						}}
						label={prevButtonProps.label}
						color="primary"
					/>
				)}
				{current < steps.length - 2 && (
					<GenericButton
						htmlType={nextButtonProps.htmlType || "button"}
						disabled={nextButtonProps.disabled}
						onClick={() => {
							if (nextButtonProps.onClick) {
								nextButtonProps.onClick();
							} else if (steps[current].onNext) {
								steps[current].onNext(next);
							} else {
								next();
							}
						}}
						label={nextButtonProps.label}
					/>
				)}
				<Flex gap={12}>
					{current === steps.length - 2 && (
						<GenericButton
							htmlType={draftButtonProps.htmlType || "button"}
							disabled={draftButtonProps.disabled}
							onClick={() => {
								draftButtonProps.onClick
									? draftButtonProps.onClick()
									: message.success("Processing complete!");
							}}
							label={draftButtonProps.label}
							variant="outlined"
						/>
					)}
					{current === steps.length - 2 && (
						<GenericButton
							htmlType={publishButtonProps.htmlType || "submit"}
							disabled={publishButtonProps.disabled}
							onClick={() => {
								if (publishButtonProps.onClick) {
									publishButtonProps.onClick();
								} else if (steps[current].onNext) {
									steps[current].onNext(next);
								} else {
									next();
								}
							}}
							label={publishButtonProps.label}
						/>
					)}
				</Flex>
			</div>
		</>
	);
};

export default GenericStepper;
