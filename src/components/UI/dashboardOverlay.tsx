import React from "react";

interface ScreenOverlayProps {
	children: React.ReactNode;
}

const DashboardOverlay: React.FC<ScreenOverlayProps> = ({ children }) => {
	return (
		<div style={{ position: "relative" }}>
			{/* Background blur */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					filter: "blur(12px)",
					backgroundColor: "rgba(255, 255, 255, 0.7)", // Optional for dimming effect
					zIndex: 1,
					pointerEvents: "none",
                    // filter:"blur(2px)",
				}}
			/>
			{/* Foreground content */}
			<div style={{ position: "relative", zIndex: 2 }}>
				{children}
			</div>
		</div>
	);
};

export default DashboardOverlay;
