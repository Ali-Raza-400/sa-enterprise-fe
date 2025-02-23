import {
	Card,
	Rate,
	Dropdown,
	Menu,
	Grid,
	Divider,
	Col,
	Row,
	Popover,
	Skeleton,
	Avatar,
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import Typography from "../../../components/UI/Typography";
import IMAGES from "../../../assets/images";
import { useSelector } from "react-redux";
import { LOOKUP_TYPES } from "../../../utils/lookup";
import { MdDeleteForever } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import useBuyCourse from "../../../components/Hooks/BuyButton";
import dayjs from "dayjs";
import { FULL_DATE_TIME_FORMAT } from "../../../utils/constants";
import { Course } from "../type";
import { CourseData } from "../../Students/Profile/type";
import { FaCircleExclamation } from "react-icons/fa6";
import { Tag } from "antd";
import { TruncatedText } from "../../../components/UI/TruncatedText";
import PATH from "../../../navigation/Path";

interface CourseCardProps {
	courseData: Course | CourseData;
	status?: boolean;
	showStatus?: boolean;
	onCardClick?: () => void;
	loading?: boolean;
	onDelete?: (id: string) => void;
	assignCourseToTeacher?: (id: string) => void;
	toggleMandatory?: (id: string, status: boolean | null) => void;
}

const ResponsiveCourseCard = ({
	status,
	showStatus,
	onCardClick,
	loading = false,
	onDelete,
	courseData,
	assignCourseToTeacher,
	toggleMandatory,
}: CourseCardProps) => {
	const screens = Grid.useBreakpoint();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { user } = useSelector((state: any) => state.auth);
	const {
		courseThumbnail: imageSrc,
		name: title,
		price,
		isMendatory,
		categories: category,
		description,
		id: courseId,
	} = isCourseData(courseData) ? courseData.course : courseData;
	const buyCourseButton = useBuyCourse(courseId, true);
	const [videosCount, rating, reviewsCount] = [11, 4, 9];

	function isCourseData(data: Course | CourseData): data is CourseData {
		return (data as CourseData).course !== undefined;
	}

	const handleDelete = () => {
		if (onDelete && courseId) {
			onDelete(courseId);
		}
	};

	const handleAssignToTeacher = () => {
		if (assignCourseToTeacher && courseId) {
			assignCourseToTeacher(courseId);
		}
	};
	const handleMandatoryToggele = () => {
		if (toggleMandatory && courseId) {
			toggleMandatory(courseId, isMendatory);
		}
	};

	const menu = (
		<Menu>
			<Menu.Item key="3">
				<div
					onClick={(e) => {
						e.stopPropagation();
						handleDelete();
					}}
					className="flex items-center"
				>
					<MdDeleteForever size={25} fill="#BA2A2A" />
					<Typography
						variant="bodyMediumRegular"
						className="text-[#4D4D4D] ml-1"
					>
						Delete
					</Typography>
				</div>
			</Menu.Item>
			{user?.role === LOOKUP_TYPES.Role.INSTITUTE && assignCourseToTeacher && (
				<Menu.Item key="4">
					<div
						onClick={(e) => {
							e.stopPropagation();
							handleAssignToTeacher();
						}}
						className="flex items-center"
					>
						<FaUserCheck size={25} fill="#8970D6" />
						<Typography
							variant="bodyMediumRegular"
							className="text-[#4D4D4D] ml-1"
						>
							Assign to Teacher
						</Typography>
					</div>
				</Menu.Item>
			)}
			{user?.role === LOOKUP_TYPES.Role.INSTITUTE && toggleMandatory && (
				<Menu.Item key="5">
					<div
						onClick={(e) => {
							e.stopPropagation();
							handleMandatoryToggele();
						}}
						className="flex items-center"
					>
						<FaCircleExclamation size={20} fill="#FCAB60" />
						<Typography
							variant="bodyMediumRegular"
							className="text-[#4D4D4D] ml-2"
						>
							{isMendatory ? "Unmark Mandatory" : "Mark Mandatory"}
						</Typography>
					</div>
				</Menu.Item>
			)}
		</Menu>
	);

	const popoverContent = (
		<div>
			<div className="text-[#22C55E]">
				Updated at:{" "}
				<span>
					{dayjs(courseData?.updatedAt).format(FULL_DATE_TIME_FORMAT)}
				</span>
			</div>
			<div className="my-3" dangerouslySetInnerHTML={{ __html: description }} />
			{buyCourseButton}
		</div>
	);

	const courseCardContent = (
		<Card
			hoverable
			className="h-[29rem] course-card rounded-lg"
			onClick={onCardClick}
		>
			<div className="relative">
				{loading ? (
					<Skeleton.Image active className="!h-[16.1rem] !w-full" />
				) : (
					<img
						alt="example"
						src={imageSrc ? imageSrc : IMAGES.FAULT_IMG}
						className="h-[16.1rem] w-full object-fill rounded-t-lg thumbnail-responsive"
					/>
				)}
				{isMendatory && !loading && (
					<div className="absolute top-3 right-3 flex justify-center items-center w-[5rem] bg-[#CCCCCC] rounded-full">
						<Typography
							variant="bodySmallRegular"
							className="text-[#2F3237] p-1"
						>
							Mandatory
						</Typography>
					</div>
				)}
			</div>
			<div className="p-5">
				<div className="flex justify-between items-center ">
					<Typography variant="bodyXLargeSemibold" className="text-[#1C1C1C]">
						{TruncatedText({ text: title, width: 250 })}
					</Typography>
					{user?.role !== LOOKUP_TYPES.Role.STUDENT && (
						<Dropdown overlay={menu} placement="bottomRight">
							<EllipsisOutlined
								className="text-2xl cursor-pointer transform rotate-90"
								onClick={(e) => e.stopPropagation()}
							/>
						</Dropdown>
					)}
				</div>
				{/* <div className="flex gap-2 mt-2">
					{category?.map((cat: string) => (
						<div key={cat} className="inline-flex mt-1 me-2">
							<Typography
								variant="bodySmallMedium"
								className="bg-[#E6E6E6] p-2 rounded-lg text-[#5F646D]"
							>
								{cat}
							</Typography>
						</div>
					))}
				</div> */}

				<div className="flex flex-wrap gap-2 mt-2">
					<Avatar.Group maxCount={2} shape="square" className="show-more">
						{category?.map((cat: string) => (
							<Tag
								key={cat}
								color="default"
								className="mt-1 bg-[#E6E6E6] border-0 p-1 px-2 flex justify-center items-center text-center"
							>
								{TruncatedText({ text: cat, width: 100 })}
							</Tag>
						))}
					</Avatar.Group>
				</div>

				<div className="flex justify-between mt-3">
					<Typography variant="bodyMediumRegular" className="text-[#999999]">
						{videosCount} Videos
					</Typography>
					{showStatus && (
						<Typography
							variant="bodyXLargeRegular"
							className={`${status ? "!text-[#22c55e]" : "!text-[#FF8B06]"}`}
						>
							{status ? "Completed" : "Ongoing"}
						</Typography>
					)}
				</div>
				<Divider className="my-3" />
				<div className="flex items-center justify-between">
					<div className="flex gap-2">
						<Typography variant="bodyMediumRegular" className="text-[#5F646D]">
							{rating}
						</Typography>
						<Rate className="text-lg text-[#FADB14]" value={rating} />
						<Typography variant="bodyMediumRegular" className="text-[#5F646D]">
							({reviewsCount})
						</Typography>
					</div>
					<Typography
						variant={
							screens.xs || screens.sm
								? "headingThreeLight"
								: "headingFourLight"
						}
						className="!text-[#8970D6]"
					>
						{price ? price : "Free"}
					</Typography>
				</div>
			</div>
		</Card>
	);

	const showPopover =
		!PATH.STUDENT_ENROLLED_COURSES &&
		courseData &&
		user?.role === LOOKUP_TYPES.Role.STUDENT;

	const genericCardContent = (
		// <Col className="flex justify-center">
		<Card
			hoverable
			className="hover:border-[1px] hover:border-[#8970D6]"
			onClick={onCardClick}
		>
			<Row>
				<Col sm={7} xs={24} className="flex items-center justify-center mb-2">
					{imageSrc ? (
						<img
							src={imageSrc}
							className="w-full h-[13rem] rounded-lg"
							alt={title}
						/>
					) : (
						<div className="text-5xl bg-[#EFEBF9] p-1 flex items-center justify-center w-28 h-28">
							{title?.charAt(0)}
						</div>
					)}
				</Col>
				<Col sm={17} xs={24} className="p-3">
					<div>
						<Typography
							variant={
								screens.xs || screens.sm
									? "bodyMediumBold"
									: "bodyLargeSemibold"
							}
							className="!font-bold"
						>
							{title}
						</Typography>
						<div className="flex gap-2 flex-wrap mt-2">
							<Avatar.Group maxCount={2} shape="square" className="show-more ">
								{category?.map((cat: string) => (
									<Tag
										key={cat}
										color="default"
										className="mt-1 bg-[#E6E6E6] border-0 p-1 px-2 flex justify-center items-center text-center"
									>
										{TruncatedText({ text: cat, width: 80 })}
									</Tag>
								))}
							</Avatar.Group>
						</div>
					</div>
					<div className="flex items-center justify-between my-3">
						<div className="flex items-center gap-2">
							{/* <Typography
								variant="bodyMediumRegular"
								className="text-[#5F646D]"
							>
								{rating}
							</Typography> */}
							<Rate
								className="
											text-[10px] 
											xs:text-xs 
											sm:text-sm 
											md:text-base 
											lg:text-lg 
											xl:text-xl 
											2xl:text-2xl 
											text-[#FADB14]
  "
								value={rating}
							/>
							<Typography
								variant="bodyMediumRegular"
								className="text-[#5F646D]"
							>
								({reviewsCount})
							</Typography>
						</div>

						<Typography variant="bodyLargeRegular" className="!text-[#8970D6]">
							{price ? price : "Free"}
						</Typography>
					</div>
					<div>{showPopover && buyCourseButton}</div>
				</Col>
			</Row>
		</Card>
		// </Col>
	);

	return screens.sm ? (
		showPopover ? (
			<Popover
				placement="right"
				title={title}
				content={popoverContent}
				rootClassName="custom-popover"
			>
				{courseCardContent}
			</Popover>
		) : (
			courseCardContent
		)
	) : (
		genericCardContent
	);
};

export default ResponsiveCourseCard;
