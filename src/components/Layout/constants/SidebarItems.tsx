import PATH from "../../../navigation/Path";
// import { RiCoupon3Fill, RiMoneyDollarCircleFill } from "react-icons/ri";
import STRINGS from "../../../utils/strings";
import { Link } from "react-router-dom";
import { MdDashboard, MdPerson } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa6";
// import { FaBookOpen, FaHandHoldingDollar } from "react-icons/fa6";
import { IoBookSharp, IoDocumentText } from "react-icons/io5";
import { PiUsersFill } from "react-icons/pi";
import { LOOKUP_TYPES } from "../../../utils/lookup";
import { TiUserAdd } from "react-icons/ti";
import { FaFolderPlus } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
// import { RiCoupon3Fill, RiMoneyDollarCircleFill } from "react-icons/ri";

export const items = [
	
	{
		key: PATH.STUDENT_DASHBOARD,
		icon: <MdDashboard />,
		label: <Link to={PATH.STUDENT_DASHBOARD}>{STRINGS.STUDENT_DASHBOARD}</Link>,
		show: true,
	},
	{
		key: PATH.TEACHER_DASHBOARD,
		icon: <MdDashboard />,
		label: <Link to={PATH.TEACHER_DASHBOARD}>{STRINGS.TEACHER_DASHBOARD}</Link>,
		show: true,
	},

	{
		key: PATH.STUDENT_ASSIGNMENTS,
		icon: <IoDocumentText />,
		label: (
			<Link to={PATH.STUDENT_ASSIGNMENTS}>{STRINGS.STUDENT_ASSIGNMENTS}</Link>
		),
		show: true,
	},
	// {
	// 	key: PATH.STUDENT_QUIZZES,
	// 	icon: <MdQuiz />,
	// 	label: <Link to={PATH.STUDENT_QUIZZES}>{STRINGS.STUDENT_QUIZZES}</Link>,
	// 	show: true,
	// },
	{
		key: PATH.STUDENT_COURSES_LIST,
		icon: <IoBookSharp />,
		label: <Link to={PATH.STUDENT_COURSES_LIST}>{STRINGS.COURSES}</Link>,
		show: true,
	},
	
	{
		key: PATH.COURSES,
		icon: <IoBookSharp />,
		label: <Link to={PATH.COURSES}>{STRINGS.COURSES}</Link>,
		show: true,
	},
	{
		key: PATH.STUDENTS,
		icon: <PiUsersFill />,
		label: <Link to={PATH.STUDENTS}>{STRINGS.STUDENTS}</Link>,
		show: true,
	},
	{
		key: PATH.MANAGE_TEACHER,
		icon: <MdPerson />,
		label: <Link to={PATH.MANAGE_TEACHER}>{STRINGS.MANAGE_TEACHER}</Link>,
		show: true,
	},
	// {
	// 	key: PATH.MANAGE_STUDENTS,
	// 	icon: <PiUsersFill />,
	// 	label: <Link to={PATH.MANAGE_STUDENTS}>{STRINGS.MANAGE_STUDENTS}</Link>,
	// 	show: true,
	// },
	
	{
		key: STRINGS.USERNAME,
		icon: <PiUsersFill />,
		label: STRINGS.MANAGE_STUDENTS,
		show: true,
		children: [
			{
				key: PATH.MANAGE_STUDENTS,
				icon:<PiUsersFill />,
				label:<Link to={PATH.MANAGE_STUDENTS}>{STRINGS.USER}</Link>,
			},
			{
				key: PATH.CREATE_USER,
				icon: <FaFolderPlus />,
				label: <Link to={PATH.CREATE_USER}>{STRINGS.ADD_USER}</Link>,
			},
		],
	},
	{
		key: STRINGS.OPRATIONNAME,
		icon: <PiUsersFill />,
		label: STRINGS.MANAGE_OPRATION,
		show: true,
		children: [
			{
				key: PATH.MANAGE_OPRATION,
				icon:<PiUsersFill />,
				label:<Link to={PATH.MANAGE_OPRATION}>{STRINGS.OPRATION}</Link>,
			},
			{
				key: PATH.MANAGE_OPRATION_CREATE,
				icon: <FaFolderPlus />,
				label: <Link to={PATH.MANAGE_OPRATION_CREATE}>{STRINGS.MANAGE_OPRATION_CREATE}</Link>,
			},
		],
	},
	{
		key: STRINGS.REQUESTS,
		icon: <FaFolderPlus />,
		label: STRINGS.REQUESTS,
		show: true,
		children: [
			{
				key: PATH.REGISTRATION_REQUEST,
				icon: <TiUserAdd size={18} />,
				label: (
					<Link to={PATH.REGISTRATION_REQUEST}>
						{STRINGS.REGISTRATION_REQUEST}
					</Link>
				),
			},
			{
				key: PATH.COURSE_REQUEST,
				icon: <FaBookOpen size={18} />,
				label: <Link to={PATH.COURSE_REQUEST}>{STRINGS.COURSE_REQUEST}</Link>,
			},
		],
	},
	{
		key: PATH.INSTITUTE_SETTINGS,
		icon: <CiSettings size={18} />,
		label: (
			<Link to={PATH.INSTITUTE_SETTINGS}>{STRINGS.INSTITUTE_SETTINGS}</Link>
		),
		show: true,
	},
	// {
	// 	key: STRINGS.STUDENT_GRADING,
	// 	icon: <MdAssessment />,
	// 	label: STRINGS.STUDENT_GRADING,
	// 	show: true,
	// 	children: [
	// 		{
	// 			key: PATH.STUDENT_GRADE_ASSIGNMENTS,
	// 			icon: <IoDocumentText size={18}/>,
	// 			label: <Link to={PATH.STUDENT_GRADE_ASSIGNMENTS}>{STRINGS.STUDENT_GRADE_ASSIGNMENTS}</Link>,
	// 		},
	// 		{
	// 			key: PATH.STUDENT_GRADE_QUIZZES,
	// 			icon: <MdQuiz size={18} />,
	// 			label: <Link to={PATH.STUDENT_GRADE_QUIZZES}>{STRINGS.STUDENT_GRADE_QUIZZES}</Link>,
	// 		},
	// 	],
	// },
];

export const roleBasedItems = {
	/** INSTITUTE */
	[LOOKUP_TYPES.Role.SUPER_ADMIN]: [
		PATH.MANAGE_STUDENTS,
		PATH.CREATE_USER,
		PATH.TEACHER_DASHBOARD,
		PATH.MANAGE_OPRATION,
		PATH.MANAGE_OPRATION_CREATE,
		// PATH.COUPONS,
		PATH.EARNINGS,
		// PATH.REGISTRATION_REQUEST,
		// PATH.COURSE_REQUEST,
		 PATH.COURSES,

		// PATH.INSTITUTE_SETTINGS,
	],
	/** STUDENT */
	[LOOKUP_TYPES.Role.STUDENT]: [
		// PATH.STUDENT_DASHBOARD,
		PATH.STUDENT_ENROLLED_COURSES,

	],
	/** TEACHER */
	[LOOKUP_TYPES.Role.TEACHER]: [
		PATH.COURSES,
		PATH.STUDENTS,
	],
	/** INDIVIDUAL */
	[LOOKUP_TYPES.Role.INDIVIDUAL]: [PATH.COURSES],
	/** SUPER ADMIN */
	// [LOOKUP_TYPES.Role.SUPER_ADMIN]: [],
	/** TEACHING ASSISTANT */
	// [LOOKUP_TYPES.Role.TEACHING_ASSISTANT]: [],
};
