import { useParams } from "react-router-dom";
import {
	useGetCourseByIdQuery,
	useLazyGetQuizByAttachmentIdQuery,
} from "../../../../redux/slices/course";

import { Col, Divider, Progress, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { TbPlayerPlay } from "react-icons/tb";
import { IoBookOutline } from "react-icons/io5";
import { BiDislike, BiLike } from "react-icons/bi";
import { FiFlag } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import GenericCard from "../../../../components/UI/GenericCard";
import Typography from "../../../../components/UI/Typography";
import { Attachment, Lecture } from "../../../Courses/type";
import { FULL_DATE_TIME_FORMAT } from "../../../../utils/constants";
import dayjs from "dayjs";
import QuizModal from "./components/QuizModal";
import PageLoader from "../../../../components/Loader/PageLoader";
import { timeToSeconds } from "../../../../utils/helper";

const ContentView = () => {
	const { id } = useParams();
	const { data, isLoading } = useGetCourseByIdQuery(id as string);
	const [quizOpen, setQuizOpen] = useState(false);
	const [videoPlaying, setVideoPlaying] = useState(false);
	const [quizLinkClicked, setQuizLinkClicked] = useState(false);
	const [selectedAttachment, setSelectedAttachment] = useState<string | null>(
		null
	);
	const [getQuizes, { data: quizData }] = useLazyGetQuizByAttachmentIdQuery();
	useEffect(() => {
		if (selectedAttachment) {
			getQuizes(selectedAttachment);
		}
	}, [selectedAttachment]);

	useEffect(() => {
		if (quizOpen) {
			setVideoPlaying(false);
		}
	}, [quizOpen]);

	const [selectedLecture, setSelectedLecture] = useState<string | null>(null);
	const [expandedLectures, setExpandedLectures] = useState<Set<string>>(
		new Set()
	);
	const playerRef = useRef<ReactPlayer | null>(null);

	const getFileType = (filePath: string) => {
		const extension = filePath.split(".").pop()?.toLowerCase();
		if (extension === "pdf") return "pdf";
		if (["mp4", "webm", "ogg"].includes(extension || "")) return "video";
		return "unknown";
	};

	const toggleLecture = (lectureId: string) => {
		const newExpanded = new Set(expandedLectures);
		if (newExpanded.has(lectureId)) {
			newExpanded.delete(lectureId);
		} else {
			newExpanded.add(lectureId);
		}
		setExpandedLectures(newExpanded);
	};

	const handleAttachmentSelect = (lectureId: string, attachmentId: string) => {
		setSelectedLecture(lectureId);
		setSelectedAttachment(attachmentId);
	};
	// const handleSeek = (newTime: number) => {
	// 	if (playerRef.current) {
	// 		playerRef.current.seekTo(newTime, "seconds");
	// 		setVideoPlaying(true);
	// 	}
	// };

	const quizTimestamp = timeToSeconds(quizData?.[0]?.quizTime) || undefined;
	console.log(quizTimestamp, "TIME QIZ");

	const handleProgress = (state: any) => {
		const currentTime = state?.playedSeconds;
		if (
			Math.floor(currentTime) === quizTimestamp &&
			!quizLinkClicked &&
			quizData?.length !== 0
		) {
			setQuizOpen(true);
			setVideoPlaying(false);
		}
	};

	const renderContent = () => {
		if (!selectedLecture || !selectedAttachment) return null;

		const currentLecture = data?.lectures.find(
			(l: Lecture) => l.id === selectedLecture
		);
		const selectedFile = currentLecture?.attachments.find(
			(a: Attachment) => a.id === selectedAttachment
		);

		if (!selectedFile) return null;

		const fileType = getFileType(selectedFile.filePath);

		switch (fileType) {
			case "video":
				return (
					<ReactPlayer
						ref={playerRef}
						url={selectedFile.filePath}
						playing={videoPlaying && !quizOpen}
						controls={true}
						onProgress={handleProgress}
						className="!w-full"
						onPlay={() => {
							if (quizOpen) {
								setVideoPlaying(false);
							} else {
								setVideoPlaying(true);
							}
						}}
						onStart={() => {
							setVideoPlaying(false);
						}}
						// onSeek={handleSeek}
					/>
				);
			case "pdf":
				return (
					<div>
						<iframe
							src={`${selectedFile.filePath}#toolbar=0&view=FitH`}
							style={{
								width: "100%",
								height: "63vh",
								border: "none",
								background: "transparent",
							}}
							title="PDF Viewer"
						/>
					</div>
				);
			default:
				return <div>Unsupported file type</div>;
		}
	};

	useEffect(() => {
		if (data?.lectures.length > 0 && !selectedLecture) {
			const firstLecture = data?.lectures[0];
			setSelectedLecture(firstLecture.id);
			if (firstLecture.attachments.length > 0) {
				setSelectedAttachment(firstLecture.attachments[0].id);
				setExpandedLectures(new Set([firstLecture.id]));
			}
		}
	}, [data?.lectures, selectedLecture]);

	const getFileName = (url: string): string => {
		const parts = url?.split("/");
		const fileName = parts[parts?.length - 1];
		return decodeURIComponent(
			fileName.replace(/[-_]/g, " ").replace(/\.[^/.]+$/, "")
		);
	};

	return isLoading ? (
		<PageLoader />
	) : (
		<div className="relative">
			<div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-50 flex items-start justify-center">
				<Typography
					variant="headingOne"
					className="text-[#2F3237] relative top-64"
				>
					COMING SOON
				</Typography>
			</div>
			<Row gutter={[32, 32]}>
				<Col span={24} lg={8} xl={6}>
					<GenericCard className="!p-0" noMargin>
						<div>
							<Typography variant="headingFour" className="px-5 pt-5">
								{data?.name}
							</Typography>
							<Typography
								variant="bodyMediumRegular"
								className="px-5  "
								noMargin
							>
								Created by:{" "}
								<span className="!text-[#8970D6]">
									{data?.creator?.fullName}
								</span>
							</Typography>
							<Typography
								variant="bodySmallRegular"
								className="px-5 !text-[#FF8B06]"
								noMargin
							>
								Updated at:{" "}
								<span>
									{dayjs(data?.updatedAt).format(FULL_DATE_TIME_FORMAT)}
								</span>
							</Typography>
						</div>

						<div>
							<Progress
								percent={60}
								percentPosition={{ align: "end", type: "outer" }}
								size="small"
								className="px-5 mt-5 progress"
							/>
							<Typography
								variant="bodyMediumRegular"
								className="flex justify-start px-5 mb-5 !text-[#9297A0]"
							>
								{data?.lectures.length} Lectures Available
							</Typography>
						</div>

						<div className="lecture-list">
							{data?.lectures.map((lecture: any, lectureIndex: number) => (
								<div key={lecture.id} className="lecture-section">
									<div
										className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50"
										onClick={() => toggleLecture(lecture.id)}
									>
										<Typography variant="bodyLargeMedium" className="flex-1">
											Lecture {lectureIndex + 1}: {lecture.name}
										</Typography>
										{expandedLectures.has(lecture.id) ? (
											<IoIosArrowUp />
										) : (
											<IoIosArrowDown />
										)}
									</div>

									{expandedLectures.has(lecture.id) && (
										<div className="pl-5">
											{lecture.attachments.map(
												(attachment: any, index: any) => (
													<div key={attachment.id}>
														<div
															onClick={() =>
																handleAttachmentSelect(
																	lecture.id,
																	attachment.id
																)
															}
															className={`flex items-center gap-7 p-5 cursor-pointer transition-colors duration-300 
                            ${
															selectedAttachment === attachment.id
																? "text-[#8970D6]"
																: "text-black"
														}`}
														>
															<div
																className={`text-2xl bg-[#EFEBF9] p-3 rounded-md ${
																	selectedAttachment === attachment.id
																		? "text-[#8970D6]"
																		: "text-[#9297A0]"
																}`}
															>
																{getFileType(attachment.filePath) === "pdf" ? (
																	<IoBookOutline />
																) : (
																	<TbPlayerPlay />
																)}
															</div>
															<div>
																<div className="font-semibold">
																	{/* {getFileType(attachment.filePath) === "pdf"
																? "PDF Document"
																: "Video Content"} */}
																	{getFileName(attachment.filePath)}
																</div>
																<div className="text-xs">
																	{getFileType(
																		attachment.filePath
																	).toUpperCase()}{" "}
																	File {index + 1}
																</div>
															</div>
														</div>
														{index < lecture.attachments.length - 1 && (
															<Divider className="!m-0" />
														)}
													</div>
												)
											)}
										</div>
									)}
									{lectureIndex < data?.lectures.length - 1 && (
										<Divider className="!m-0" />
									)}
								</div>
							))}
						</div>
					</GenericCard>
				</Col>

				<Col span={24} lg={16} xl={18}>
					<GenericCard noMargin>
						{renderContent()}

						<Typography
							variant="bodyMediumRegular"
							className="!text-[#9297A0] mt-5"
						>
							{selectedLecture &&
								data?.lectures.find((l: any) => l.id === selectedLecture)?.name}
						</Typography>
						<Divider />

						<div className="flex text-lg gap-20">
							<div className="flex items-center gap-2 cursor-pointer">
								<BiLike /> Like
							</div>
							<div className="flex items-center gap-2 cursor-pointer">
								<BiDislike /> Dislike
							</div>
							<div className="flex items-center gap-2 cursor-pointer">
								<FiFlag /> Report an Issue
							</div>
						</div>
					</GenericCard>
				</Col>
				<QuizModal
					quizOpen={quizOpen}
					onClose={() => {
						setQuizOpen(false);
						setVideoPlaying(false);
					}}
					handleQuizLinkClick={() => {
						setQuizLinkClicked(true);
						setQuizOpen(false);
						setVideoPlaying(false);
					}}
					quizData={quizData}
				/>
			</Row>
		</div>
	);
};

export default ContentView;
