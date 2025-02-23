import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Form, Upload } from "antd";
import type { FormInstance } from "antd";
import { useUploadFileMutation } from "../../redux/slices/file";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import useNotification from "./Notification";

interface GenericUploadProps {
	form?: FormInstance;
	name: string;
	maxFileSizeMB?: number;
}

const GenericUpload: React.FC<GenericUploadProps> = ({
	form,
	name,
	maxFileSizeMB = 5,
}) => {
	const [uploadFile, { isLoading: loading }] = useUploadFileMutation();
	const { openNotification, contextHolder } = useNotification();
	const [fileUrls, setFileUrls] = useState<string[]>([]); // State to store multiple file URLs

	const beforeUpload = (file: RcFile) => {
		const isLtSize = file.size / 1024 / 1024 < maxFileSizeMB;
		if (!isLtSize) {
			openNotification({
				type: "error",
				title: `File must be smaller than ${maxFileSizeMB}MB!`,
			});
			return false;
		}
		return true;
	};

	const handleUpload = async (file: RcFile) => {
		uploadFile({ file })
			.unwrap()
			.then((response) => {
				console.log("res:::", response);
				if (response.status === 500) {
					openNotification({
						type: "error",
						title: response.error,
					});
				} else {
					openNotification({
						type: "success",
						title: `File uploaded successfully!`,
					});
					const url = response?.[0]?.url;
					if (url) {
						const newFileUrls = [...fileUrls, url];
						form?.setFieldsValue({ [name]: newFileUrls });
						setFileUrls(newFileUrls); // Add the uploaded file URL to the list
					}
				}
			})
			.catch((err) => {
				console.log("err", err);
				openNotification({
					type: "error",
					title: `Upload failed. Please try again.`,
				});
			});
	};

	const handleRemoveFile = (url: string) => {
		const updatedFileUrls = fileUrls.filter((fileUrl) => fileUrl !== url);
		setFileUrls(updatedFileUrls);
		form?.setFieldsValue({ [name]: updatedFileUrls });
	};

	return (
		<>
			{contextHolder}
			<div className="custom-uploader-style flex justify-between items-center">
				<div className="text-white font-bold text-xs">
					Upload your educational or technical <br /> certificates if you want
					to (optional).
				</div>
				<Form.Item
					// name={name}
					rules={[
						{ required: false, message: "Please upload at least one file!" },
					]}
					className="!mb-2"
				>
					<Upload
						name="fileUpload"
						multiple
						accept="image/jpeg,image/gif,image/png,application/pdf"
						listType="text"
						showUploadList={false}
						beforeUpload={beforeUpload}
						customRequest={({ file }) => {
							handleUpload(file as RcFile);
						}}
					>
						<div className="flex justify-center items-center  cursor-pointer bg-white p-2 rounded-lg">
							<div>Upload Certificates </div>
							{loading ? (
								<LoadingOutlined />
							) : (
								<UploadOutlined style={{ marginLeft: "10px" }} />
							)}
							<div></div>
						</div>
					</Upload>
				</Form.Item>

				{/* Display the uploaded files with a remove icon */}
			</div>
			{fileUrls.length > 0 && (
				<div className="mt-2">
					<ul>
						{fileUrls.map((url, index) => (
							<li
								key={index}
								className="flex items-center justify-between  space-x-2 "
							>
								<a
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									className="!text-white"
								>
									{`${url.substring(url.lastIndexOf("/") + 1)?.substring(0, 35)}...`}
								</a>
								<MdDelete
									size={20}
									onClick={() => handleRemoveFile(url)}
									className="text-white cursor-pointer"
									color="red"
								/>
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
};

export default GenericUpload;
