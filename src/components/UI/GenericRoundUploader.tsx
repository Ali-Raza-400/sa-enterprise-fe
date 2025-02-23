import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Flex, Form, message, Upload } from "antd";
import type { FormInstance } from "antd";
import { useUploadFileMutation } from "../../redux/slices/file";
import { RcFile } from "antd/es/upload";
import IMAGES from "../../assets/images";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useState } from "react";
import GenericButton from "./GenericButton";

interface GenericUploadProps {
	form?: FormInstance;
	name: string;
	uploadType?: "doc" | "img"; // Added uploadType prop
	allowedFileTypes?: string[];
	maxFileSizeMB?: number;
}

const GenericUpload: React.FC<GenericUploadProps> = ({
	form,
	name,
	uploadType = "img", // Default to image upload
	allowedFileTypes,
	maxFileSizeMB = 5,
}) => {
	const [uploadFile, { isLoading: loading }] = useUploadFileMutation();
	const [pdfUrl, setPdfUrl] = useState<string | null>(null); // State for PDF URL
	const defaultFileTypes =
		uploadType === "doc"
			? ["application/pdf"] // Only allow PDF for document uploads
			: ["image/jpeg", "image/png", "image/jpg"]; // Allow these for image uploads

	const beforeUpload = (file: RcFile) => {
		const isAllowedType = (allowedFileTypes || defaultFileTypes).includes(
			file.type
		);
		if (!isAllowedType) {
			message.error(
				`You can only upload ${allowedFileTypes?.join("/") || defaultFileTypes.join("/")} files!`
			);
			return false;
		}
		const isLtSize = file.size / 1024 / 1024 < maxFileSizeMB;
		if (!isLtSize) {
			message.error(`File must be smaller than ${maxFileSizeMB}MB!`);
			return false;
		}
		return true;
	};

	const onFileChange = (file: RcFile) => {
		if (uploadType === "img") {
			const img = new Image();
			img.src = URL.createObjectURL(file);
			img.onload = () => {
				// if (img.width > 1200 || img.height > 800) {
				//   message.error(
				//     "Image dimensions should not exceed 1200px width and 800px height."
				//   );
				// } else {
				uploadFile({ file })
					.unwrap()
					.then((res) => {
						form?.setFieldsValue({ [name]: res?.[0]?.url });
					});
				// }
			};
		} else if (uploadType === "doc") {
			uploadFile({ file })
				.unwrap()
				.then((res) => {
					const url = res?.[0]?.url;
					form?.setFieldsValue({ [name]: url });
					setPdfUrl(url); // Set PDF URL for display
				});
		}
	};

	const uploadButton = (
		<span className="text-black w-full flex justify-center p-1 z-10 absolute bottom-0">
			{loading ? (
				<LoadingOutlined />
			) : (
				<div className="bg-[#FCAB60] absolute -top-32 right-0 p-[5px] rounded-[50%]">
					<AiOutlineCloudUpload size={22} color="white" />
				</div>
			)}
		</span>
	);

	return (
		<div>
			<Flex
				gap="middle"
				className={` ${uploadType === "doc" ? "justify-end" : "justify-center uploader-ant"} `}
				wrap
			>
				<Form.Item
					name={name}
					rules={[{ required: false, message: "*Required" }]}
				>
					{uploadType === "doc" ? (
						<div className=" w-[100%]">
							<div className="flex justify-end w-[100%] ">
								<Upload
									name="fileUpload"
									showUploadList={false}
									beforeUpload={beforeUpload}
									customRequest={({ file, onSuccess }) => {
										onFileChange(file as RcFile);
										if (onSuccess) {
											onSuccess("ok"); // Call onSuccess only if it is defined
										}
									}}
								>
									<GenericButton
										variant="link"
										label="Upload Doc"
										icon={<UploadOutlined />}
									/>
								</Upload>
							</div>
						</div>
					) : (
						<Upload
							name="fileUpload"
							listType="picture-circle"
							className="avatar-uploader customButton-overlay"
							showUploadList={false}
							beforeUpload={beforeUpload}
							customRequest={({ file, onSuccess }) => {
								onFileChange(file as RcFile);
								if (onSuccess) {
									onSuccess("ok"); // Call onSuccess only if it is defined
								}
							}}
						>
							<>
								<img
									className="rounded-full z-0 object-contain min-h-[150px] max-h-[150px]  p-1"
									src={form?.getFieldValue([name]) || IMAGES.FAULT_IMG}
								/>
							</>

							{uploadButton}
						</Upload>
					)}
				</Form.Item>
			</Flex>
			<div
				className={`flex justify-start relative ml-4 ${pdfUrl} relative text-sm font-medium text-blue-600`}
			>
				{uploadType === "doc" && form?.getFieldValue("uploadedDocument") && (
					<a
						href={form?.getFieldValue("uploadedDocument")}
						target="_blank"
						className="absolute top-0 left-0 w-full h-full"
						style={{
							display: "block",
							backgroundColor: "rgba(0, 0, 0, 0)", // Transparent overlay
						}}
					>
						<p
							className="underline absolute -top-14"
							style={{ cursor: "pointer", color: "inherit" }}
						>
							{form
								?.getFieldValue("uploadedDocument")
								.substring(
									form?.getFieldValue("uploadedDocument").lastIndexOf("/") + 1
								)}
						</p>
					</a>
				)}
			</div>
		</div>
	);
};

export default GenericUpload;
