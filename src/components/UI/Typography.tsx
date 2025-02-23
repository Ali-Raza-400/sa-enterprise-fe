import { ReactNode } from "react";

export type TypographyProps = {
	variant:
		| "pageHeading"
		| "headingOne"
		| "headingOneLight"
		| "headingTwo"
		| "headingThree"
		| "headingThreeLight"
		| "headingFour"
		| "headingFourLight"
		| "headingFive"
		| "headingFiveLight"
		| "headingSix"
		| "description"
		| "dateLarge"
		| "title"
		| "titleTwo"
		| "titleOne"
		| "titleThree"
		| "bodyXLargeBold"
		| "bodyXLargeSemibold"
		| "bodyXLargeMedium"
		| "bodyXLargeRegular"
		| "bodyLargeBold"
		| "bodyLargeSemibold"
		| "bodyLargeMedium"
		| "bodyLargeRegular"
		| "bodyMediumBold"
		| "bodyMediumSemibold"
		| "bodyMediumMedium"
		| "bodyMediumRegular"
		| "bodySmallBold"
		| "bodySmallSemibold"
		| "bodySmallMedium"
		| "bodySmallRegular"
		| "bodyXSmallBold"
		| "bodyXSmallSemibold"
		| "bodyXSmallMedium"
		| "bodyXSmallRegular";
	color?: "white" | "black" | "lightGrey" | "grey";
	children: ReactNode;
	noMargin?: boolean;
	className?: string;
	onClick?: () => void;
};

// Typography Component
export default function Typography(props: TypographyProps) {
	const {
		variant,
		children,
		color = "black",
		noMargin = "false",
		className,
		onClick,
	} = props;

	let typoStyle = "";
	if (variant === "pageHeading") {
		typoStyle = `text-[2rem] not-italic font-bold leading-[110%] ${!noMargin && "mb-[1.1rem]"} `;
	}
	if (variant === "headingOne") {
		typoStyle = "text-[1.75rem] font-bold ";
	}
	if (variant === "headingOneLight") {
		typoStyle = "text-[1.75rem] font-semibold ";
	}
	if (variant === "headingTwo") {
		typoStyle = "text-[1.625rem] font-bold ";
	}
	if (variant === "headingThree") {
		typoStyle = "text-[1.5rem] font-bold ";
	}
	if (variant === "headingThreeLight") {
		typoStyle = "text-[1.5rem] font-semibold ";
	}
	if (variant === "headingFour") {
		typoStyle = "text-[1.375rem] font-semibold ";
	}
	if (variant === "headingFourLight") {
		typoStyle = "text-[1.375rem] font-medium";
	}
	if (variant === "headingFive") {
		typoStyle = "text-[1.25rem] font-semibold ";
	}
	if (variant === "headingFiveLight") {
		typoStyle = "text-[1.25rem] font-medium ";
	}
	if (variant === "headingSix") {
		typoStyle = "text-[1.125rem] font-semibold ";
	}
	if (variant === "description") {
		typoStyle = "text-[1rem] font-medium";
	}
	if (variant === "titleOne") {
		typoStyle = `text-[4.5rem] font-[400] ${!noMargin && "mb-[1.1rem]"} `;
	}
	if (variant === "titleTwo") {
		typoStyle = `text-[3rem] font-[400] ${!noMargin && "mb-[1.1rem]"} `;
	}
	if (variant === "titleThree") {
		typoStyle = `text-[2.1rem] font-[400] ${!noMargin && "mb-[1.1rem]"} `;
	}

	if (variant.startsWith("body")) {
		const size = variant.match(/XLarge|Large|Medium|Small|XSmall/)?.[0];
		const weight = variant.match(/Bold|Semibold|Medium|Regular/)?.[0];

		let fontSize = "";
		let fontWeight = "";

		switch (size) {
			case "XLarge":
				fontSize = "text-[18px]";
				break;
			case "Large":
				fontSize = "text-[16px]";
				break;
			case "Medium":
				fontSize = "text-[14px]";
				break;
			case "Small":
				fontSize = "text-[12px]";
				break;
			case "XSmall":
				fontSize = "text-[10px]";
				break;
		}

		switch (weight) {
			case "Bold":
				fontWeight = "font-bold";
				break;
			case "Semibold":
				fontWeight = "font-semibold";
				break;
			case "Medium":
				fontWeight = "font-medium";
				break;
			case "Regular":
				fontWeight = "font-normal";
				break;
		}

		typoStyle = `${fontSize} ${fontWeight}`;
	}

	const textColor =
		color === "white"
			? "text-white"
			: color === "black"
				? "text-black"
				: color === "lightGrey"
					? "text-lightGrey"
					: "";
	return (
		<h1
			className={`${textColor} ${typoStyle} ${className} ${onClick && "cursor-pointer"} flex items-center gap-2`}
			onClick={onClick}
		>
			{children}
		</h1>
	);
}
