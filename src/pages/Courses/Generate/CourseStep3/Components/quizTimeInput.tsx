import React from "react";
import { Form, Input } from "antd";
import { Rule } from "antd/lib/form";

interface TimeInputProps {
	maxTime: string; // in format "HH:mm:ss"
	onChange?: (timeInSeconds: number) => void;
	name: any;
	disabled?: boolean;
}

export const TimeInput: React.FC<TimeInputProps> = ({
	maxTime,
	onChange,
	name,
	disabled,
}) => {
	// Convert time string to seconds
	const timeToSeconds = (time: string): number => {
		const [hours, minutes, seconds] = time.split(":").map(Number);
		return hours * 3600 + minutes * 60 + seconds;
	};

	//   // Convert seconds to time string
	//   const secondsToTime = (totalSeconds: number): string => {
	//     const hours = Math.floor(totalSeconds / 3600);
	//     const minutes = Math.floor((totalSeconds % 3600) / 60);
	//     const seconds = totalSeconds % 60;

	//     return [hours, minutes, seconds]
	//       .map(val => val.toString().padStart(2, '0'))
	//       .join(':');
	//   };
	const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;

	// Validate time format and max time
	const validateTime = (_: any, value: string): Promise<void> => {
		if (!value) {
			return Promise.reject("Please input time");
		}

		if (!timeRegex.test(value)) {
			return Promise.reject("Please input time in format HH:mm:ss");
		}

		const inputSeconds = timeToSeconds(value);
		const maxSeconds = timeToSeconds(maxTime);

		if (inputSeconds > maxSeconds) {
			return Promise.reject(`Time cannot be greater than ${maxTime}`);
		}
		if (value === "00:00:00") {
			return Promise.reject("Time cannot be 00:00:00");
		}
		if (inputSeconds === 0) {
			return Promise.reject("Time must be greater than 00:00:00");
		}
		return Promise.resolve();
	};

	const rules: Rule[] = [
		{
			required: true,
			validator: validateTime,
		},
	];

	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		// Only allow numbers and colons
		const sanitizedValue = value.replace(/[^\d:]/g, "");

		// Auto-format as user types
		let formattedValue = sanitizedValue;
		if (sanitizedValue.length === 2 || sanitizedValue.length === 5) {
			formattedValue += ":";
		}

		// Update form value
		e.target.value = formattedValue;

		// If we have a complete valid time, call onChange with seconds
		if (timeRegex.test(formattedValue)) {
			onChange?.(timeToSeconds(formattedValue));
		}
	};

	return (
		<Form.Item name={name} rules={rules} className="!mb-0">
			<Input
				placeholder="HH:mm:ss"
				maxLength={8}
				onChange={handleTimeChange}
				className="custom-input"
				disabled={disabled}
			/>
		</Form.Item>
	);
};
