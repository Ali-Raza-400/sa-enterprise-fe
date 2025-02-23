import { useRef } from "react";
import { CSVLink } from "react-csv";

interface DownloadCSVProps {
	data: any[];
	filename: string;
	children: React.ReactNode;
	separator?: string;
	headers?: string[];
	enclosingCharacter?: string;
	onDownloadStart?: () => void;
	onDownloadComplete?: () => void;
}

export const useDownloadCSV = () => {
	const csvLinkRef = useRef<any>(null);

	const DownloadCSVComponent: React.FC<DownloadCSVProps> = ({
		data,
		filename,
		children,
		separator = ",",
		headers,
		enclosingCharacter = '"',
		onDownloadStart,
		onDownloadComplete,
	}) => {
		const handleDownload = () => {
			if (csvLinkRef.current) {
				onDownloadStart?.();
				csvLinkRef.current.link.click();
				onDownloadComplete?.();
			}
		};

		return (
			<>
				<div onClick={handleDownload}>{children}</div>
				<CSVLink
					data={data}
					filename={filename}
					ref={csvLinkRef}
					style={{ display: "none" }}
					separator={separator}
					headers={headers}
					enclosingCharacter={enclosingCharacter}
				/>
			</>
		);
	};

	return { DownloadCSVComponent };
};
