import React, { useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaChevronDown, FaListUl } from "react-icons/fa6";

export interface Tab {
	name: string;
	content?: React.ReactNode;
	listContent?: React.ReactNode;
	gridContent?: React.ReactNode;
}

interface GenericTabsProps {
	tabs: Tab[];
	showViewToggle?: boolean;
}

const GenericTabs: React.FC<GenericTabsProps> = ({
	tabs,
	showViewToggle = false,
}) => {
	const [activeTab, setActiveTab] = useState<number>(0);
	const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const renderContent = () => {
		const currentTab = tabs[activeTab];
		if (showViewToggle) {
			if (viewMode === "list" && currentTab.listContent) {
				return currentTab.listContent;
			}
			if (viewMode === "grid" && currentTab.gridContent) {
				return currentTab.gridContent;
			}
		}
		return currentTab?.content;
	};

	// Mobile dropdown for tabs
	const renderMobileTabDropdown = () => (
		<div className="relative md:hidden w-full">
			<button
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				className="w-full px-4 py-2 flex items-center justify-between bg-white border border-[#e4dcf9] rounded-md"
			>
				<span className="text-[#8970D6] font-medium">
					{tabs[activeTab]?.name}
				</span>
				<FaChevronDown
					className={`transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
				/>
			</button>

			{isDropdownOpen && (
				<div className="absolute z-10 w-full mt-1 bg-white border border-[#e4dcf9] rounded-md shadow-lg">
					{tabs.map((tab, index) => (
						<button
							key={index}
							className={`w-full px-4 py-2 text-left hover:bg-[#f8f5ff] ${
								index === activeTab
									? "bg-[#f8f5ff] text-[#8970D6]"
									: "text-gray-700"
							}`}
							onClick={() => {
								setActiveTab(index);
								setIsDropdownOpen(false);
							}}
						>
							{tab.name}
						</button>
					))}
				</div>
			)}
		</div>
	);

	return (
		<div className="w-full mx-auto">
			<div className="flex gap-5 md:flex-row justify-between items-center md:items-center my-3 border-b border-solid border-[#e4dcf9]">
				{/* Mobile Dropdown */}
				{renderMobileTabDropdown()}

				{/* Desktop Tabs */}
				<div className="hidden md:flex space-x-1 overflow-x-auto">
					{tabs.map((tab, index) => (
						<button
							key={index}
							className={`px-2 lg:px-4 h-[3rem] min-w-[6rem] lg:min-w-[8.6875rem] text-center rounded-t-md font-medium text-sm lg:text-base border-solid border-b-0 border-[1px] border-[#e4dcf9] transition-colors duration-150 whitespace-nowrap ${
								index === activeTab
									? "bg-[#8970D6] text-white"
									: "text-[#8970D6]"
							}`}
							onClick={() => setActiveTab(index)}
						>
							{tab.name}
						</button>
					))}
				</div>

				{showViewToggle && (
					<div className="flex space-x-1 mt-2 md:mt-0">
						<button
							className={`p-2 rounded-md transition-colors duration-150 ${
								viewMode === "list"
									? "bg-[#8970D6] text-white"
									: "text-[#8970D6] hover:bg-[#f8f5ff]"
							}`}
							onClick={() => setViewMode("list")}
						>
							<FaListUl size={20} />
						</button>
						<button
							className={`p-2 rounded-md transition-colors duration-150 ${
								viewMode === "grid"
									? "bg-[#8970D6] text-white"
									: "text-[#8970D6] hover:bg-[#f8f5ff]"
							}`}
							onClick={() => setViewMode("grid")}
						>
							<BsFillGrid3X3GapFill size={20} />
						</button>
					</div>
				)}
			</div>
			<div className="mt-4">{renderContent()}</div>
		</div>
	);
};

export default GenericTabs;
