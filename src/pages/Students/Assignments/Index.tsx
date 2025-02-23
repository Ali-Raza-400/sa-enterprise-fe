import { Empty, Flex, Spin, TableProps, Tag } from "antd";
import { useState } from "react";
import GenericTable from "../../../components/UI/GenericTable";
import {
	useGetStudentAssignmentsWithLecturesQuery,
	useSaveStdAssignmentSubMutation,
} from "../../../redux/slices/student";
import { FaFilePdf } from "react-icons/fa6";
import dayjs from "dayjs";
import ActionDropdown from "../../../components/UI/ActionDropdown";
import useGenericAlert from "../../../components/Hooks/GenericAlert";
import { useUploadFileMutation } from "../../../redux/slices/file";
import { FULL_DATE_TIME_FORMAT } from "../../../utils/constants";
import { TruncatedText } from "../../../components/UI/TruncatedText";
import Typography from "../../../components/UI/Typography";

interface DataType {
	key: string;
	name: string;
	lectureName: string;
	courseName: string;
	submitted: boolean;
	totalMarks: string;
	marks: string;
	submittedFileUrl: string;
}

const Index = () => {
	const { showAlert } = useGenericAlert();
	const [tableOptions, setTableOptions] = useState({
		pagination: {
			page: 1,
			pageSize: 10,
		},
	});
	const [saveStdAssignmentSub] = useSaveStdAssignmentSubMutation();

	const [uploadFile] = useUploadFileMutation();

	const { data, isLoading, isFetching } =
		useGetStudentAssignmentsWithLecturesQuery({
			tableOptions,
		});

	const handleFileUpload = (file: File, id: string) => {
		const formData = new FormData();
		formData.append("file", file);

		uploadFile(formData)
			.unwrap()
			.then((response) => {
				const payload = {
					fileUrl: response?.[0]?.url,
					assignmentId: id,
				};
				return saveStdAssignmentSub(payload);
			})
			.then(() => {
				showAlert({
					type: "success",
					title: "Upload Successful",
					message: `The Assignment submitted successfully.`,
				});
			})
			.catch((error) => {
				const errorMessage =
					error?.response?.data?.message ||
					"An error occurred during upload or submission.";
				console.error("Error:", error);
				showAlert({
					type: "error",
					title: "Action Failed",
					message: errorMessage,
				});
			});
	};

	const columns: TableProps<DataType>["columns"] = [
		{
			title: "Assignment",
			dataIndex: "name",
			key: "name",
			render: (text: string, record: any) => (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						width: 150,
						padding: "8px",
						margin: "0 auto",
						cursor: "pointer",
						border: "1px solid #d9d9d9",
						borderRadius: "4px",
						boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
					}}
					onClick={() =>
						window.open(
							record?.filePath ||
								"https://almsbe.xeventechnologies.com/api/s3/file/sample.pdf",
							"_blank"
						)
					}
				>
					<Flex align="center" gap={2}>
						<FaFilePdf style={{ marginRight: 8, color: "#ff4d4f" }} />{" "}
						{TruncatedText({ text, width: 100 })}
					</Flex>
				</div>
			),
			width: 150,
		},
		{
			title: "Course Name",
			dataIndex: ["course", "name"],
			key: "courseName",
			width: 150,
			render: (val) =>
				TruncatedText({ text: val, width: 120, lineClamp: true }) || "N/A",
		},
		{
			title: "Lecture Name",
			dataIndex: ["lecture", "name"],
			key: "lectureName",
			width: 150,
			render: (val) =>
				TruncatedText({ text: val, width: 120, lineClamp: true }) || "N/A",
		},
		{
			title: "Due Date",
			dataIndex: "dueDate",
			key: "dueDate",
			width: 200,
			render: (value) =>
				value ? dayjs(value).format(FULL_DATE_TIME_FORMAT) : "N/A",
		},
		{
			title: "Marks",
			dataIndex: "marks",
			key: "marks",
			width: 150,
			render: (_: any, record: any) => {
				return (
					<>
						{record?.studentAssignmentSubmitions?.[0]?.marksObtained || "N/A"}
					</>
				);
			},
		},
		{
			title: "Total Marks",
			dataIndex: "totalMarks",
			key: "totalMarks",
			width: 200,
			render: (value) => value || "N/A",
		},
		{
			title: "Submitted Date",
			dataIndex: "submissionDate",
			key: "submissionDate",
			width: 200,
			render: (_: any, record: any) => {
				const submission = record?.studentAssignmentSubmitions?.[0];
				return (
					<>
						{" "}
						{submission?.submitionDateTime
							? dayjs(submission.submitionDateTime).format("YYYY-MM-DD")
							: "N/A"}
					</>
				);
			},
		},
		{
			title: "Submitted File",
			dataIndex: "submissionFile",
			key: "submissionFile",
			width: 150,
			render: (_: string, record: any) => {
				const submission = record?.studentAssignmentSubmitions?.[0];
				const text =
					submission?.fileUrl?.substring(
						submission?.fileUrl?.lastIndexOf("/") + 1
					) || "N/A";
				return (
					<>
						{submission && submission.isSubmitted ? (
							<div
								style={{
									display: "flex",
									alignItems: "center",
									width: 150,
									padding: "8px",
									margin: "0 auto",
									cursor: "pointer",
									border: "1px solid #d9d9d9",
									borderRadius: "4px",
									boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
								}}
								onClick={() =>
									window.open(
										submission?.fileUrl ||
											"https://almsbe.xeventechnologies.com/api/s3/file/sample.pdf",
										"_blank"
									)
								}
							>
								<Flex align="center" gap={2}>
									<FaFilePdf style={{ marginRight: 8, color: "#ff4d4f" }} />{" "}
									{/* {} */}
									{TruncatedText({ text, width: 100 })}
								</Flex>
							</div>
						) : (
							"N/A"
						)}
					</>
				);
			},
		},
		{
			title: "Status",
			dataIndex: "submissionStatus",
			key: "submissionStatus",
			width: 150,
			render: (_: any, record: any) => {
				const submission = record?.studentAssignmentSubmitions?.[0];
				const dueDate = record?.dueDate; // assuming `dueDate` is available in `record`
				let tagColor;
				let tagText;

				if (submission && submission.isSubmitted) {
					tagColor = "#A8F0C2";
					tagText = "Submitted";
				} else if (dueDate && dayjs().isAfter(dayjs(dueDate))) {
					tagColor = "#E38282";
					tagText = "Expired";
				} else {
					tagColor = "#FFCF99";
					tagText = "Pending";
				}

				return (
					<Tag
						color={tagColor}
						className="flex justify-center items-center p-2 w-36"
					>
						<span className="text-[16px] text-black">{tagText}</span>
					</Tag>
				);
			},
		},
		{
			title: "Action",
			key: "action",
			fixed: "right",
			width: 100,
			render: (record) => {
				const dueDate = dayjs(record.dueDate);
				const currentDate = dayjs();

				const isDueDatePassed = dueDate.isBefore(currentDate);
				const isAssignmentSubmitted =
					record?.studentAssignmentSubmitions?.[0]?.isSubmitted;
				const handleUploadClick = () => {
					const input = document.createElement("input");
					input.type = "file";
					input.accept = "application/pdf";
					input.onchange = async (event: any) => {
						const file = event?.target?.files?.[0];
						if (file) await handleFileUpload(file, record.id);
					};
					input.click();
				};

				return (
					<ActionDropdown
						uploadOnClick={handleUploadClick}
						disable={
							isDueDatePassed || isAssignmentSubmitted ? ["uploadOnClick"] : []
						}
					/>
				);
			},
		},
	];

	return (
		<>
			{isLoading || isFetching ? (
				<Spin size="large" className="flex justify-center m-[250px]" />
			) : (
				<div className="relative">
					<div className="absolute inset-0 bg-white/10 backdrop-blur-sm !z-[1] flex items-start justify-center responsive-text">
						<Typography
							variant="headingOne"
							className="text-[#2F3237] relative top-64 text-center"
						>
							Your data will be displayed here once your courses begin.
						</Typography>
					</div>
					{data?.list?.length > 0 ? (
						<>
							<GenericTable
								columns={columns}
								data={data}
								enablePagination={true}
								updatePaginationFunc={(data) =>
									setTableOptions({ ...tableOptions, pagination: data })
								}
							/>
						</>
					) : (
						<div className="h-[45vh] flex justify-center items-center">
							<Empty />
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default Index;
