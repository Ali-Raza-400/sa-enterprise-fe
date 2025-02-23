import { useEffect, useState } from "react";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Card, Col, Flex, Row, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { MdPictureAsPdf } from "react-icons/md";
import Typography from "../../../../../components/UI/Typography";
import GenericButton from "../../../../../components/UI/GenericButton";
import { useUploadFileMutation } from "../../../../../redux/slices/file";
import { Assignment, AssignmentFile, CourseTabsProps } from "../type";
import DateField from "../../../../../components/Form/DateField";
import { Dayjs } from "dayjs";
import useNotification from "../../../../../components/UI/Notification";
import dayjs from "dayjs";
const AssignmentTab = ({ lectureIndex, form }: CourseTabsProps) => {
	const [uploadFile] = useUploadFileMutation();
	const [formRender, setFormRerender] = useState(false);
	const { openNotification, contextHolder } = useNotification();
	useEffect(() => {
		const currentLectures = form.getFieldValue("lectures") || [];
		if (!currentLectures[lectureIndex]) {
			currentLectures[lectureIndex] = {
				attachments: [],
				assignments: [],
				name: "",
			};
			form.setFieldsValue({ lectures: currentLectures });
		}
	}, [lectureIndex, form]);

	const handleUpload = async (file: UploadFile) => {
		const currentLectures = form.getFieldValue("lectures") || [];
		const currentAssignments = currentLectures[lectureIndex].assignments || [];

		try {
			const response = await uploadFile({ file }).unwrap();
			const url = response?.[0]?.url;

			if (url) {
				currentAssignments.push({
					filePath: url,
					name: file.name,
					uid: file?.uid,
					dueDate: null,
				});
				currentLectures[lectureIndex].assignments = currentAssignments;

				form.setFieldsValue({ lectures: currentLectures });
			} else {
				openNotification({
					type: "error",
					title: "Upload failed",
				});
			}
		} catch (error) {
			openNotification({
				type: "error",
				title: `Upload failed ${error}`,
			});
		}
	};

	const handleRemove = (file: UploadFile) => {
		const currentLectures = form.getFieldValue("lectures") || [];

		if (currentLectures[lectureIndex]) {
			currentLectures[lectureIndex].assignments = currentLectures[
				lectureIndex
			].assignments.filter(
				(assignment: Assignment) => assignment.uid !== file.uid
			);

			form.setFieldsValue({ lectures: currentLectures });
			setFormRerender(!formRender);
		}
	};

	const handleDateChange = (date: Dayjs, fileIndex: string | number) => {
		const currentLectures = form.getFieldValue("lectures") || [];
		if (currentLectures[lectureIndex]?.assignments?.[fileIndex]) {
			currentLectures[lectureIndex].assignments[fileIndex].dueDate = date;
			form.setFieldsValue({ lectures: currentLectures });
		}
	};

	const props: UploadProps = {
		onRemove: (file) => handleRemove(file),
		beforeUpload: (file) => {
			const isImageOrPDF =
				file.type.startsWith("image/") || file.type === "application/pdf";

			if (!isImageOrPDF) {
				openNotification({
					type: "error",
					title: "You can only upload PDF or image files!",
				});
				return Upload.LIST_IGNORE;
			}

			const isValidSize = file.size / 1024 / 1024 < 5;
			if (!isValidSize) {
				openNotification({
					type: "error",
					title: "File must be smaller than 5MB!",
				});
				return Upload.LIST_IGNORE;
			}

			handleUpload(file);
			return false;
		},
		fileList: form.getFieldValue(`lectures.${lectureIndex}.assignments`) || [],
		accept: ".pdf,image/*",
	};

	return (
		<>
			{contextHolder}
			<div className="flex justify-between">
				<Typography variant="bodyXLargeSemibold">Upload Assignments</Typography>
				<Upload {...props}>
					<GenericButton
						icon={<UploadOutlined />}
						label="Select File"
						color="primary"
						variant="outlined"
					/>
				</Upload>
			</div>

			<Row gutter={[0, 18]} className="mt-10 flex flex-wrap gap-5">
				{(
					form.getFieldValue(["lectures", lectureIndex, "assignments"]) || []
				).map((file: AssignmentFile, fileIndex: string | number) => (
					<div key={file.filePath}>
						<Flex>
							<Card
								hoverable
								className="w-[200px] h-[200px] border-[#FCAB60] hover:border-[#FCAB60] flex items-center justify-center"
							>
								<Flex
									vertical
									className="items-center"
									onClick={() =>
										window.open(file?.filePath, "_blank", "noopener,noreferrer")
									}
								>
									<MdPictureAsPdf size={80} color="#FCAB60" className="mb-2" />
									<span>{file.name}</span>
								</Flex>
								<DeleteOutlined
									className="absolute right-3 top-2 text-white bg-[#BA2A2A] rounded-full p-2 cursor-pointer"
									onClick={(e) => {
										e.stopPropagation();
										handleRemove(file);
									}}
									title="Delete"
								/>
							</Card>
						</Flex>

						{/* Due Date Field */}
						<Row className="mt-2">
							<Col span={24}>
								<DateField
									name={[
										"lectures",
										lectureIndex,
										"assignments",
										fileIndex,
										"dueDate",
									]}
									value={file.dueDate || null}
									placeholder="Select Due Date"
									onChange={(date) => handleDateChange(date, fileIndex)}
									disabledDate={(current) =>
										current && current < dayjs().startOf("day")
									}
								/>
							</Col>
						</Row>
					</div>
				))}
			</Row>
		</>
	);
};

export default AssignmentTab;
