import { Col, message, Row, Upload, UploadProps, Progress, Card } from "antd";
import { MdCloudUpload, MdPictureAsPdf } from "react-icons/md";
import { DeleteOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import Typography from "../../../../../components/UI/Typography";
import {
	useDeleteFileMutation,
	useUploadFileMutation,
} from "../../../../../redux/slices/file";
import { useState } from "react";
import { Attachment, CourseTabsProps } from "../type";
import { getErrorMessage } from "../../../../../utils/helper";
import useNotification from "../../../../../components/UI/Notification";
import ViewVideoModal from "./ViewVideoModal";

type FileType = RcFile;

const beforeUpload = (file: FileType) => {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	const isPdf = file.type === "application/pdf";
	const isVideo = file.type.startsWith("video/");
	if (!isJpgOrPng && !isPdf && !isVideo) {
		message.error("You can only upload JPG/PNG/PDF/Video files!");
		return false;
	}
	// const isLt100M = file.size / 1024 / 1024 < 100;
	// if (!isLt100M) {
	// 	message.error("File must be smaller than 100MB!");
	// 	return false;
	// }
	// const isLt10M = file.size / 1024 / 1024 < 10;
	// if (!isLt10M) {
	// 	message.error("File must be smaller than 10MB!");
	// 	return false;
	// }

	return true;
};

const ContentTab = ({ lectureIndex, form }: CourseTabsProps) => {
	console.log(
		form?.getFieldValue("lectures"),
		'form.getFieldValue("lectures")'
	);
	const [uploadFile] = useUploadFileMutation();
	const [deleteFile] = useDeleteFileMutation();
	const { openNotification, contextHolder } = useNotification();
	const [formRender, setFormRerender] = useState(false);
	const [viewModal, setViewModal] = useState({ show: false, url: "" });

	const handleDelete = async (uid: string, fileName: string) => {
		try {
			await deleteFile({
				file: fileName,
			})
				.unwrap()
				.then(() => {
					const currentLectures = form.getFieldValue("lectures") || [];
					if (currentLectures[lectureIndex]) {
						currentLectures[lectureIndex].attachments = currentLectures[
							lectureIndex
						].attachments.filter(
							(attachment: Attachment) => attachment.uid !== uid
						);
						form.setFieldsValue({ lectures: currentLectures });
					}
					setFormRerender(!formRender);
				});
		} catch (error) {
			message.error("Failed to delete the file. Please try again.");
		}
	};

	const updateFileInForm = (fileInfo: {
		uid: string;
		filePath?: string;
		name: string;
		progress: number;
		type: string | undefined;
		status?: string;
		duration?: string;
	}) => {
		const currentLectures = form.getFieldValue("lectures") || [];

		if (!currentLectures[lectureIndex]) {
			currentLectures[lectureIndex] = {
				attachments: [],
			};
		}

		if (!currentLectures[lectureIndex].attachments) {
			currentLectures[lectureIndex].attachments = [];
		}

		const fileIndex = currentLectures[lectureIndex].attachments.findIndex(
			(item: Attachment) => item.uid === fileInfo.uid
		);

		if (fileIndex > -1) {
			// File already exists in the form
			if (fileInfo.status === "done") {
				// Update with all information when upload is complete
				currentLectures[lectureIndex].attachments[fileIndex] = {
					...currentLectures[lectureIndex].attachments[fileIndex],
					...fileInfo,
				};
			} else if (fileInfo.status === "uploading") {
				// Update progress while uploading
				currentLectures[lectureIndex].attachments[fileIndex] = {
					...currentLectures[lectureIndex].attachments[fileIndex],
					progress: fileInfo.progress,
					status: fileInfo.status,
				};
			} else {
				// Remove file if status is error, removed, or anything else
				currentLectures[lectureIndex].attachments = currentLectures[
					lectureIndex
				].attachments.filter((item: Attachment) => item.uid !== fileInfo.uid);
			}
		} else {
			// New file
			if (fileInfo.status === "uploading" || fileInfo.status === "done") {
				// Show file while uploading or when done
				currentLectures[lectureIndex].attachments.push(fileInfo);
			}
		}

		form.setFieldsValue({
			lectures: currentLectures,
		});
		setFormRerender(!formRender);
	};
	const formatDuration = (durationInSeconds: number): string => {
		const hours = Math.floor(durationInSeconds / 3600);
		const minutes = Math.floor((durationInSeconds % 3600) / 60);
		const seconds = Math.floor(durationInSeconds % 60);

		return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
	};

	const customRequest = async (options: any) => {
		const { onSuccess, file } = options;

		try {
			updateFileInForm({
				uid: file.uid,
				name: file.name,
				type: file.type,
				progress: 0,
				status: "uploading",
			});

			const response = await uploadFile({ file }).unwrap();
			const url = response?.[0]?.url;

			if (!url) {
				throw new Error("Upload failed - No URL returned");
			}

			if (file.type.startsWith("video/")) {
				const videoElement = document.createElement("video");
				videoElement.src = url;

				await new Promise((resolve, reject) => {
					videoElement.onloadedmetadata = () => {
						const duration = videoElement.duration;
						updateFileInForm({
							uid: file.uid,
							filePath: url,
							name: file.name,
							type: file.type,
							progress: 100,
							status: "done",
							duration: formatDuration(duration),
						});
						resolve(null);
					};
					videoElement.onerror = () =>
						reject(new Error("Failed to load video metadata"));
				});
			} else if (file.type === "application/pdf") {
				updateFileInForm({
					uid: file.uid,
					filePath: url,
					name: file.name,
					type: file.type,
					progress: 100,
					status: "done",
				});
			} else {
				throw new Error(`Unsupported file type: ${file.type}`);
			}

			onSuccess("Ok");
		} catch (err) {
			updateFileInForm({
				uid: file.uid,
				name: file.name,
				type: file.type,
				progress: 0,
				status: "error",
			});
			console.log(err, "ERORR", getErrorMessage(err));
			openNotification({
				type: "error",
				title: getErrorMessage(err),
			});
		}
	};

	const handleChange: UploadProps["onChange"] = (info) => {
		const { file } = info;
		updateFileInForm({
			uid: file.uid,
			name: file.name,
			type: file.type,
			progress: Math.round(file.percent || 0),
			status: file.status,
		});
	};

	const uploadButton = (
		<button
			className="border-none bg-none flex flex-col items-center justify-center"
			type="button"
		>
			<MdCloudUpload size={100} color="#FCAB60" />
			<Typography variant="bodyXLargeMedium">Attach Lecture Files</Typography>
			<Typography variant="bodyMediumRegular">
				Drag and drop video lectures or other files here
			</Typography>
		</button>
	);

	// const renderFileIcon = (fileType: string | undefined) => {
	// 	if (fileType?.startsWith("video/")) {
	// 		return <MdVideocam size={50} color="#FCAB60" />;
	// 	} else if (fileType === "application/pdf") {
	// 		return <MdPictureAsPdf size={50} color="#FCAB60" />;
	// 	} else {
	// 		return <MdPictureAsPdf size={50} color="#FCAB60" />;
	// 	}
	// };

	const fileList =
		form.getFieldValue(["lectures", lectureIndex, "attachments"]) || [];

	return (
		<>
			{contextHolder}
			<Row>
				<Col span={12}>
					<Upload
						name="lecture"
						listType="picture-card"
						className="avatar-uploader w-full profile-upload"
						showUploadList={false}
						beforeUpload={beforeUpload}
						onChange={handleChange}
						customRequest={customRequest}
						accept="video/*,application/pdf"
					>
						{uploadButton}
					</Upload>
				</Col>

				<Col span={12}>
					{fileList?.length > 0 && (
						<Typography variant="bodyXLargeSemibold" className="text-[#666666]">
							Uploaded Lectures and Files
						</Typography>
					)}
					{fileList.map((file: Attachment) => (
						<Card
							hoverable
							key={file.uid}
							className="w-full mt-5 border border-[#FCAB60] hover:border-[#FCAB60]"
							// onClick={() => setViewModal({ show: true, url: file?.filePath })}
							onClick={() => {
								if (
									/\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i.test(file?.filePath)
								) {
									// Show modal for video files
									setViewModal({ show: true, url: file?.filePath });
								} else {
									// Open document in a new tab for non-video files
									window.open(file?.filePath, "_blank", "noopener,noreferrer");
								}
							}}
						>
							<div className="flex gap-5 items-center">
								{/* {renderFileIcon(file.type)} */}
								{/* {file.type?.startsWith("video/") && file.filePath && (
								<video
									src={file.filePath}
									style={{
										width: "50px",
										height: "50px",
										objectFit: "cover",
									}}
								/>
							)} */}
								{file.type?.startsWith("video/") && file.filePath && (
									<video
										src={file.filePath}
										style={{
											width: "50px",
											height: "50px",
											objectFit: "cover",
										}}
									/>
								)}

								{/* Image Thumbnail */}
								{file.type?.startsWith("image/") && file.filePath && (
									<img
										src={file.filePath}
										alt="image-thumbnail"
										style={{
											width: "50px",
											height: "50px",
											objectFit: "cover",
										}}
									/>
								)}

								{/* Document Thumbnail (PDF example) */}
								{file.type === "application/pdf" && file.filePath && (
									// <embed
									// 	src={file.filePath}
									// 	type="application/pdf"
									// 	style={{
									// 		width: "50px",
									// 		height: "50px",
									// 		objectFit: "cover",
									// 	}}
									// />
									<MdPictureAsPdf size={50} color="#FCAB60" />
								)}

								{/* Other Document Types */}
								{file.type?.startsWith("application/") &&
									file.filePath &&
									!file.type.includes("pdf") && (
										<div
											style={{
												width: "50px",
												height: "50px",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												backgroundColor: "#f0f0f0",
												borderRadius: "4px",
											}}
										>
											<span style={{ fontSize: "12px" }}>DOC</span>
										</div>
									)}

								<div className="w-full">
									<Typography variant="bodyMediumRegular">
										{file.name}
									</Typography>
									<Progress
										percent={file.progress}
										status={
											file.status === "done"
												? "success"
												: file.status === "error"
													? "exception"
													: "active"
										}
										style={{ marginTop: "4px" }}
									/>
								</div>

								<div className="mt-2">
									<DeleteOutlined
										className="text-white bg-[#BA2A2A] rounded-full p-2 cursor-pointer"
										onClick={(event) => {
											event.stopPropagation();
											handleDelete(file.uid, file.name);
										}}
										title="Delete"
									/>
								</div>
							</div>
						</Card>
					))}
				</Col>
			</Row>
			<ViewVideoModal
				data={viewModal}
				onClose={() => setViewModal({ show: false, url: "" })}
			/>
		</>
	);
};

export default ContentTab;
