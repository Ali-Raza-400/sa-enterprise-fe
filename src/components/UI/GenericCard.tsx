import { ReactNode } from "react";

interface GenericCardProps {
	children: ReactNode;
	className?: string;
	noMargin?: boolean;
	onClick?: () => void;
}

const GenericCard: React.FC<GenericCardProps> = ({
	children,
	className = "", // default value to avoid undefined
	noMargin,
	onClick,
}) => {
	return (
		<div
			className={`bg-white rounded-lg p-5 ${className ? className : ""} ${!noMargin ? "mt-5" : ""}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default GenericCard;
