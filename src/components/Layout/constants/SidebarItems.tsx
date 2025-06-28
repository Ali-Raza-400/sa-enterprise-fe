import PATH from "../../../navigation/Path";
// import { RiCoupon3Fill, RiMoneyDollarCircleFill } from "react-icons/ri";
import STRINGS from "../../../utils/strings";
import { Link } from "react-router-dom";
import { RiTimeZoneFill, RiTruckFill } from "react-icons/ri";
import { MdDashboard, MdLocalShipping, MdPerson } from "react-icons/md";
// import { FaBookOpen, FaHandHoldingDollar } from "react-icons/fa6";
import { IoBookSharp, IoDocumentText } from "react-icons/io5";
import { PiUsersFill } from "react-icons/pi";
import { LOOKUP_TYPES } from "../../../utils/lookup";
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
	{
		key: PATH.STUDENT_COURSES_LIST,
		icon: <IoBookSharp />,
		label: <Link to={PATH.STUDENT_COURSES_LIST}>{STRINGS.COURSES}</Link>,
		show: true,
	},
	
	{
		key: PATH.STUDENTS,
		icon: <PiUsersFill />,
		label: <Link to={PATH.STUDENTS}>{STRINGS.STUDENTS}</Link>,
		show: true,
	},
	
	
	// {
	// 	key: PATH.STUDENT_QUIZZES,
	// 	icon: <MdQuiz />,
	// 	label: <Link to={PATH.STUDENT_QUIZZES}>{STRINGS.STUDENT_QUIZZES}</Link>,
	// 	show: true,
	// },
	


	{
		key: PATH.MANAGE_TEACHER,
		icon: <MdPerson />,
		label: <Link to={PATH.MANAGE_TEACHER}>{STRINGS.MANAGE_TEACHER}</Link>,
		show: true,
	},
	{
			key: PATH.MANAGE_STUDENTS,
				icon: <PiUsersFill />,
				label: <Link to={PATH.MANAGE_STUDENTS}>{STRINGS.USER}</Link>,
	},
	{
		key: PATH.MANAGE_PROJECT,
				icon: <RiTimeZoneFill />,
				label: <Link to={PATH.MANAGE_PROJECT}>{STRINGS.PROJECTS}</Link>,
					show: true,
	},
    {
		key: PATH.MANAGE_FLEETS,
		icon: <RiTruckFill />,
		label: <Link to={PATH.MANAGE_FLEETS}>{STRINGS.FLEETNAME}</Link>,
		show: true,
	},
	{
	key: PATH.TRUCK,
				icon: <MdLocalShipping />,
				label: <Link to={PATH.TRUCK}>{STRINGS.TRUCKS}</Link>,
	},
	{
		key: STRINGS.OPRATIONNAME,
		icon: <PiUsersFill />,
		label: STRINGS.MANAGE_OPRATION,
		show: true,
		children: [
			{
				key: PATH.MANAGE_OPRATION,
				icon: <PiUsersFill />,
				label: <Link to={PATH.MANAGE_OPRATION}>{STRINGS.OPRATION}</Link>,
			},
			{
				key: PATH.MANAGE_OPRATION_CREATE,
				icon: <FaFolderPlus />,
				label: <Link to={PATH.MANAGE_OPRATION_CREATE}>{STRINGS.MANAGE_OPRATION_CREATE}</Link>,
			},
		],
	},
	{
		key: PATH.MANAGE_OPRATION,
				icon: <PiUsersFill />,
				label: <Link to={PATH.MANAGE_OPRATION}>{STRINGS.OPRATION}</Link>,
	},
	
	
	// {
	// 	key: PATH.TRUCK,
	// 	icon: <IoBookSharp />,
	// 	label: <Link to={PATH.TRUCK}>{STRINGS.TRUCK}</Link>,
	// 	show: true,
	// },
	
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
		PATH.EARNINGS,
		PATH.TRUCK,
		PATH.ADD_TRUCK,
		PATH.MANAGE_FLEETS,
		PATH.MANAGE_FLEET_CREATE,
		PATH.MANAGE_ZONE,
		PATH.MANAGE_ZONE_CREATE,
		PATH.MANAGE_PROJECT,
		// PATH.MANAGE_ZONE_CREATE,
	],
	[LOOKUP_TYPES.Role.TEACHER]: [
		PATH.MANAGE_STUDENTS,
		PATH.CREATE_USER,
		PATH.TEACHER_DASHBOARD,
		PATH.MANAGE_OPRATION,
		PATH.MANAGE_OPRATION_CREATE,
		// PATH.COUPONS,
		PATH.EARNINGS,
		// PATH.REGISTRATION_REQUEST,
		// PATH.COURSE_REQUEST,
		PATH.TRUCK,
		// PATH.VIEW_TRUCK,
		PATH.ADD_TRUCK,
		PATH.MANAGE_FLEETS,
		PATH.MANAGE_FLEET_CREATE

		// PATH.INSTITUTE_SETTINGS,
	],
	/** STUDENT */
	[LOOKUP_TYPES.Role.STUDENT]: [
		// PATH.STUDENT_DASHBOARD,
		PATH.TRUCK,
		PATH.MANAGE_OPRATION,
		PATH.MANAGE_OPRATION_CREATE,
		PATH.ADD_TRUCK,

	],
	/** TEACHER */
	/** INDIVIDUAL */
	[LOOKUP_TYPES.Role.INDIVIDUAL]: [PATH.TRUCK],
	/** SUPER ADMIN */
	// [LOOKUP_TYPES.Role.SUPER_ADMIN]: [],
	/** TEACHING ASSISTANT */
	// [LOOKUP_TYPES.Role.TEACHING_ASSISTANT]: [],
};
