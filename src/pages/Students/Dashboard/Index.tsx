import {
	Avatar,
	Col,
	Empty,
	Flex,
	Form,
	Row,
	Skeleton,
	TableProps,
	Tag,
} from "antd";
import Typography from "../../../components/UI/Typography";
import GenericCard from "../../../components/UI/GenericCard";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiCertificateBold } from "react-icons/pi";
import { MdLibraryBooks, MdOutlineIncompleteCircle } from "react-icons/md";
import CourseCard from "../../Courses/Shared/CourseCard";
import IMAGES from "../../../assets/images";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import {
	useLazyGetStudentAnalyticsQuery,
	useLazyGetStudentCompletedCoursesAnalyticsQuery,
	useSaveStudentInterestMutation,
} from "../../../redux/slices/student";
import Card from "./Components/Card";
import { useEffect, useState } from "react";
import GenericModal from "../../../components/UI/GenericModal";
import { CheckCircleOutlined, EyeOutlined } from "@ant-design/icons";
// import { COURSE_CATEGORIES } from "../../../utils/constants";
import SelectField from "../../../components/Form/SelectField";
import useNotification from "../../../components/UI/Notification";
import { TeacherDetail, UpcomingAssignments } from "./typs";
import dayjs from "dayjs";
import { FULL_DATE_TIME_FORMAT } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import PATH from "../../../navigation/Path";
import { useNavigate } from "react-router-dom";
import GenericTable from "../../../components/UI/GenericTable";
import { getUser, setUser } from "../../../utils/helper";
import { AuthResponseDTO } from "../../Auth/type";
import { setCredentials } from "../../../redux/features/authSlice";
import { courseData } from "../../Courses/View/components/RecommendationsTab";

interface InterestModalState {
	show: boolean;
	interests: { value: string; label: string }[];
	selectedInterests: string[];
}
const Index = () => {
	const [
		getStudentAnalytics,
		{ data: studentAnalytics, isLoading: stdAnaLoading },
	] = useLazyGetStudentAnalyticsQuery();
	const [showAnalytics, setShowAnalytics] = useState<boolean>(false);
	const { openNotification, contextHolder } = useNotification();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// const { user } = useSelector((state: any) => state.auth);
	const navigate = useNavigate();
	const [interestModal, setInterestModal] = useState<InterestModalState>({
		show: false,
		interests: [],
		selectedInterests: [],
	});
	const dispatch = useDispatch();
	const [saveStudentInterest] = useSaveStudentInterestMutation();
	const [form] = Form.useForm();

	// useEffect(() => {
	// 	if (user?.interest === undefined) {
	// 		setInterestModal({
	// 			show: true,
	// 			interests: COURSE_CATEGORIES,
	// 			selectedInterests: [],
	// 		});
	// 	}
	// }, []);

	const closeModal = () => {
		setInterestModal({ ...interestModal, show: false }); // Close the modal
	};
	const closeAnalyticsModal = () => {
		setShowAnalytics((prev) => !prev); // Close the modal
	};

	const handleTagClick = (interestValue: string) => {
		setInterestModal((prevState) => {
			const isSelected = prevState.selectedInterests.includes(interestValue);
			return {
				...prevState,
				selectedInterests: isSelected
					? prevState.selectedInterests.filter((tag) => tag !== interestValue) // Deselect
					: [...prevState.selectedInterests, interestValue], // Select
			};
		});
	};
	//
	const [getStudentCompletedCoursesAnalytics, { data, isLoading }] =
		useLazyGetStudentCompletedCoursesAnalyticsQuery();

	const [type, setType] = useState<string>("month");
	useEffect(() => {
		if (type) {
			getStudentAnalytics();

			getStudentCompletedCoursesAnalytics(type);
		}
	}, [type]);

	// const videoData = [
	// 	{
	// 		id: 1,
	// 		title: "Web Development",
	// 		deadline: "15-9-1024",
	// 		number: "1",
	// 	},
	// 	{
	// 		id: 2,
	// 		title: "Data Science",
	// 		deadline: "17-9-1024",
	// 		number: "2",
	// 	},
	// 	{
	// 		id: 3,
	// 		title: "Machine Learning",
	// 		deadline: "19-9-1024",
	// 		number: "3",
	// 	},
	// 	{
	// 		id: 4,
	// 		title: "Machine Learning",
	// 		deadline: "19-9-1024",
	// 		number: "4",
	// 	},
	// ];

	// const handleFilterChange = (e: any) => {
	//   setFilter(e.target.value);
	// };

	const chartData = {
		series: [
			{
				name: "Free Cash Flow",
				data: data?.y,
			},
		],
		options: {
			chart: {
				type: "bar" as const,
				height: 350,
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: "55%",
					endingShape: "rounded",
				},
			},
			xaxis: {
				categories: data?.x,
			},
			yaxis: {
				title: {
					text: "$ (thousands)",
				},
			},
			fill: {
				opacity: 1,
			},
			tooltip: {
				y: {
					formatter: function (val: number) {
						return `$ ${val} thousands`;
					},
				},
			},
		} as ApexOptions,
	};

	const cardData = [
		{
			title: "Teachers",
			count: studentAnalytics?.totalTeacher,
			icon: <FaChalkboardTeacher fontSize={80} color="#8970D6" />,
			onClick: () => setShowAnalytics((prev) => !prev),
		},
		{
			title: "Enrolled",
			count: studentAnalytics?.totalCourses,
			icon: <MdLibraryBooks fontSize={80} color="#8970D6" />,
			onClick: () => navigate(PATH.STUDENT_ENROLLED_COURSES),
		},
		{
			title: "Completed",
			count: studentAnalytics?.completedCourses,
			icon: <PiCertificateBold fontSize={80} color="#8970D6" />,
			path: "completed",
		},
		{
			title: "Ongoing",
			count: studentAnalytics?.incompleteCourses,
			icon: <MdOutlineIncompleteCircle fontSize={80} color="#8970D6" />,
			path: "current",
		},
	];

	interface DataType {
		key: string;
		name: string;
		age: number;
		emailAddress: string;
		cnic: string;
	}

	const teacherTableColumns: TableProps<DataType>["columns"] = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (text) => (
				<Flex align="center" gap={6}>
					<Avatar shape="circle" size="large" src={IMAGES.SAMPLE_WEB} />
					{text}
				</Flex>
			),
			width: 100,
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			width: 100,
		},
		{
			title: "View Profile",
			key: "actions",
			align: "center",
			render: (_: any, record: any) => (
				<EyeOutlined
					style={{ color: "#8970D6", fontSize: "18px" }} // Customize color and size here
					onClick={() =>
						navigate(PATH.TEACHER_PROFILE.replace(":id", record?.id))
					}
				/>
			),
			width: 50,
		},
	];

	// const generateTabs = (): Tab[] => [
	//   {
	//     name: "All",
	//     content: <AllTab />,
	//   },
	//   {
	//     name: "Assignment",
	//     content: <AssignmentTab />,
	//   },
	//   {
	//     name: "Quizes",
	//     content: <QuizesTab />,
	//   },
	// ];
	const categoryOptions = [
		{ label: "Monthly", value: "month" },
		{ label: "Yearly", value: "year" },
	];

	const handleFilterChange = (value: any) => {
		setType(value);
		console.log("Type", value);
	};

	const handleFormFinish = async (values: any) => {
		try {
			await saveStudentInterest(interestModal.selectedInterests)
				.unwrap()
				.then((res) => {
					const existingUserData = getUser();
					const updatedUserData = {
						...existingUserData,
						interest: res?.interest,
					};
					setUser(updatedUserData as AuthResponseDTO);
					dispatch(setCredentials(updatedUserData));
					openNotification({
						type: "success",
						title: "Interests Saved successfully!",
					});
					closeModal();
				});
		} catch (error: any) {
			openNotification({
				type: "error",
				title: error?.response?.data?.message,
			});
		}
		console.log("Selected Interests:", interestModal.selectedInterests, values);
	};

	// const tabs = generateTabs();
	const downLoadFile = (url: string) => {
		const link = document.createElement("a");
		link.href = url;
		link.target = "_blank";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const uniqueTeacherDetails = studentAnalytics?.teacherDetails?.filter(
		(teacher: TeacherDetail, index: number, self: TeacherDetail[]) =>
			index === self.findIndex((t) => t.email === teacher.email)
	);

	return (
		<>
			{contextHolder}
			<div className="relative">
				<div className="absolute inset-0 bg-white/10 backdrop-blur-sm !z-[1] flex items-start justify-center">
					<Typography
						variant="headingOne"
						className="text-[#2F3237] relative top-64 text-center"
					>
						Your data will be displayed here once your courses begin.
					</Typography>
				</div>
				<Row gutter={[32, 32]} justify="start" className="mt-5">
					{cardData.map((card, index) => (
						<Col key={index} span={24} sm={12} md={12} lg={12} xl={6}>
							{isLoading ? (
								<Skeleton.Node
									active
									className="!w-full !h-[127px]"
								></Skeleton.Node>
							) : (
								<GenericCard
									className="flex justify-around !mt-0 cursor-pointer"
									onClick={
										card?.path
											? () =>
													navigate(
														PATH.STUDENT_PROFILE.replace(":tab", card?.path)
													)
											: card?.onClick
												? card?.onClick
												: undefined
									}
								>
									<>
										<div>
											<Typography
												variant="headingFourLight"
												className="text-[#666666]"
											>
												{card.title}
											</Typography>
											<span className="text-[33px] font-semibold">
												{card.count}
											</span>
										</div>
										<div className="flex items-center">{card.icon}</div>
									</>
								</GenericCard>
							)}
						</Col>
					))}
				</Row>

				<Row gutter={[32, 32]} className="mt-3">
					<Col span={24} xl={9}>
						{isLoading ? (
							<Skeleton.Node
								active
								className="!w-full !mt-3 !h-[485px]"
							></Skeleton.Node>
						) : (
							<GenericCard className="">
								<Typography
									variant="headingThreeLight"
									className="text-[#2F3237] mb-10"
								>
									Upcoming Deadlines
								</Typography>
								<div className="h-[372px] overflow-scroll pe-2">
									{studentAnalytics?.upCommingAssignments?.length > 0 ? (
										studentAnalytics.upCommingAssignments.map(
											(item: UpcomingAssignments, index: number) => (
												<Card
													key={index}
													deadline={dayjs(item.dueDate).format(
														FULL_DATE_TIME_FORMAT
													)}
													number={`${index + 1}`}
													title={item.name}
													className="mt-5"
													onClick={() => downLoadFile(item.filePath)}
												/>
											)
										)
									) : (
										<Empty className="mt-24" />
									)}
								</div>
								{/* <GenericTabs tabs={tabs} /> */}
							</GenericCard>
						)}
					</Col>

					<Col span={24} xl={15}>
						{isLoading ? (
							<Skeleton.Node
								active
								className="!w-full !mt-3 !h-[485px]"
							></Skeleton.Node>
						) : (
							<GenericCard>
								<div className="flex justify-between">
									<Typography
										variant="headingThreeLight"
										className="text-[#2F3237] !-mt-9 "
									>
										Completed Courses
									</Typography>
									<div className="w-16 xs:w-52">
										<SelectField
											options={categoryOptions}
											value={type}
											onChange={handleFilterChange}
											placeholder="Select"
										/>
									</div>
								</div>
								<ReactApexChart
									options={chartData.options}
									series={chartData.series}
									type="bar"
									height={350}
								/>
							</GenericCard>
						)}
					</Col>
				</Row>

				<Typography
					variant="headingThreeLight"
					className="text-[#2F3237] mt-8 mb-6"
				>
					Recently Viewed Courses
				</Typography>

				{/* Course Cards Row */}
				<Row gutter={[32, 32]}>
					{courseData?.map((course, index) => (
						<Col key={index} xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
							<CourseCard courseData={course as any} />
						</Col>
					))}
				</Row>
				{/* interest modal  */}
				<GenericModal
					onClose={closeModal}
					show={interestModal.show}
					title="Select Interests"
					maskClosable={false}
					closable={false}
					onOk={() => form.validateFields().then(handleFormFinish)} // Call handleFormFinish on OK
				>
					<Form form={form} className="custom-interest-modal">
						{/* Render selectable tags */}
						{interestModal.interests.map(({ value, label }) => (
							<Tag
								key={value}
								className={`interest-tag ${interestModal.selectedInterests.includes(value) ? "selected" : "default"}`}
								onClick={() => handleTagClick(value)}
								icon={
									interestModal.selectedInterests.includes(value) ? (
										<CheckCircleOutlined
											className="text-[#8970D6]"
											color="#8970D6"
											style={{ marginRight: 4 }}
										/>
									) : null
								}
							>
								{label}
							</Tag>
						))}
					</Form>
				</GenericModal>
				<GenericModal
					width={750}
					onClose={closeAnalyticsModal}
					show={showAnalytics}
					title="Teacher Details"
					showFooter={false}
					onOk={() => form.validateFields().then(handleFormFinish)} // Call handleFormFinish on OK
				>
					<GenericTable
						columns={teacherTableColumns}
						data={uniqueTeacherDetails}
						loading={stdAnaLoading}
					/>
				</GenericModal>
			</div>
		</>
	);
};

export default Index;
