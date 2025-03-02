import WEB_PAGES from "../pages/index.ts";
import PATH from "./Path.ts";
import ProtectedRoute from "./Routes/ProtectedRoute.tsx";
import PublicRoute from "./Routes/PublicRoute.tsx";
import { RouteType } from "./type";
import STRINGS from "../utils/strings";

const PRIVATE_ROUTES: RouteType[] = [
	{
		name: STRINGS.ITEM_DASHBOARD,
		path: PATH.ITEM_DASHBOARD,
		page: <WEB_PAGES.ITEM_DASHBOARD />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.MANAGE_TEACHER,
		path: PATH.MANAGE_TEACHER,
		page: <WEB_PAGES.MANAGE_TEACHER />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.MANAGE_OPRATION,
		path: PATH.MANAGE_OPRATION,
		page: <WEB_PAGES.MANAGE_OPRATION />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.STUDENTS,
		path: PATH.STUDENTS,
		page: <WEB_PAGES.STUDENTS />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.MANAGE_STUDENTS,
		path: PATH.MANAGE_STUDENTS,
		page: <WEB_PAGES.MANAGE_STUDENTS />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.MANAGE_TEACHER_CREATE,
		path: PATH.MANAGE_TEACHER_CREATE,
		page: <WEB_PAGES.MANAGE_TEACHER_CREATE />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.MANAGE_OPRATION_CREATE,
		path: PATH.MANAGE_OPRATION_CREATE,
		page: <WEB_PAGES.MANAGE_OPRATION_CREATE />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.MANAGE_OPRATION_UPDATE,
		path: PATH.MANAGE_OPRATION_UPDATE,
		page: <WEB_PAGES.MANAGE_OPRATION_UPDATE />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.MANAGE_TEACHER_CREATE,
		path: PATH.MANAGE_TEACHER_CREATE,
		page: <WEB_PAGES.MANAGE_TEACHER_CREATE />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.TEACHER_DASHBOARD,
		path: PATH.TEACHER_DASHBOARD,
		page: <WEB_PAGES.TEACHER_DASHBOARD />,
		routeType: ProtectedRoute,
		layout: "private",
	},

	{
		name: STRINGS.INSTITUTE_PROFILE,
		path: PATH.INSTITUTE_PROFILE,
		page: <WEB_PAGES.INSTITUTE_PROFILE />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.INSTITUTE_SETTINGS,
		path: PATH.INSTITUTE_SETTINGS,
		page: <WEB_PAGES.INSTITUTE_SETTINGS />,
		routeType: ProtectedRoute,
		layout: "private",
	},

	{
		name: STRINGS.COUPONS,
		path: PATH.COUPONS,
		page: <WEB_PAGES.COUPONS />,
		routeType: ProtectedRoute,
		layout: "private",
	},

	{
		name: STRINGS.COUPONS_CREATE,
		path: PATH.COUPONS_CREATE,
		page: <WEB_PAGES.COUPONS_CREATE />,
		routeType: ProtectedRoute,
		layout: "private",
	},

	{
		name: STRINGS.EARNINGS,
		path: PATH.EARNINGS,
		page: <WEB_PAGES.EARNINGS />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.REGISTRATION_REQUEST,
		path: PATH.REGISTRATION_REQUEST,
		page: <WEB_PAGES.REGISTRATION_REQUEST />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.COURSE_REQUEST,
		path: PATH.COURSE_REQUEST,
		page: <WEB_PAGES.COURSE_REQUEST />,
		routeType: ProtectedRoute,
		layout: "private",
	},

	{
		name: STRINGS.VIEW_EARNINGS,
		path: PATH.VIEW_EARNINGS,
		page: <WEB_PAGES.VIEW_EARNINGS />,
		routeType: ProtectedRoute,
		layout: "private",
	},

	{
		name: STRINGS.STUDENTS_EARNINGS,
		path: PATH.STUDENTS_EARNINGS,
		page: <WEB_PAGES.STUDENTS_EARNINGS />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.COURSES,
		path: PATH.COURSES,
		page: <WEB_PAGES.COURSES />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.COURSE_VIEW,
		path: PATH.COURSE_VIEW_STUDENT,
		page: <WEB_PAGES.COURSE_VIEW />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.COURSE_VIEW,
		path: PATH.COURSE_VIEW,
		page: <WEB_PAGES.COURSE_VIEW />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.NEW_COURSE,
		path: PATH.NEW_COURSE,
		page: <WEB_PAGES.NEW_COURSE />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.TEACHER_PROFILE,
		path: PATH.TEACHER_PROFILE,
		page: <WEB_PAGES.TEACHER_PROFILE />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.STUDENT_PROFILE,
		path: PATH.STUDENT_PROFILE,
		page: <WEB_PAGES.STUDENT_PROFILE />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.STUDENT_DASHBOARD,
		path: PATH.STUDENT_DASHBOARD,
		page: <WEB_PAGES.STUDENT_DASHBOARD />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.STUDENT_ASSIGNMENTS,
		path: PATH.STUDENT_ASSIGNMENTS,
		page: <WEB_PAGES.STUDENT_ASSIGNMENTS />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.STUDENT_QUIZZES,
		path: PATH.STUDENT_QUIZZES,
		page: <WEB_PAGES.STUDENT_QUIZZES />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.STUDENT_GRADE_ASSIGNMENTS,
		path: PATH.STUDENT_GRADE_ASSIGNMENTS,
		page: <WEB_PAGES.STUDENT_GRADE_ASSIGNMENTS />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.STUDENT_GRADE_QUIZZES,
		path: PATH.STUDENT_GRADE_QUIZZES,
		page: <WEB_PAGES.STUDENT_GRADE_QUIZZES />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.STUDENT_ENROLLED_COURSES,
		path: PATH.STUDENT_ENROLLED_COURSES,
		page: <WEB_PAGES.STUDENT_ENROLLED_COURSES />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.STUDENT_COURSE_VIEW,
		path: PATH.STUDENT_COURSE_VIEW,
		page: <WEB_PAGES.STUDENT_COURSE_VIEW />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.COURSES,
		path: PATH.STUDENT_COURSES_LIST,
		page: <WEB_PAGES.STUDENT_COURSES_LIST />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	//
	{
		name: STRINGS.TEACHER_STUDENT_PROFILE_VIEW,
		path: PATH.TEACHER_STUDENT_PROFILE_VIEW,
		page: <WEB_PAGES.TEACHER_STUDENT_PROFILE_VIEW />,
		routeType: ProtectedRoute,
		layout: "private",
	},
	{
		name: STRINGS.ADD_USER,
		path: PATH.CREATE_USER,
		page: <WEB_PAGES.ADD_USER />,
		routeType: ProtectedRoute,
		layout: "private",
	},
];

const AUTH_ROUTES: RouteType[] = [
	{
		name: "Login",
		path: PATH.LOGIN,
		page: <WEB_PAGES.LOGIN />,
		routeType: PublicRoute,
		layout: "auth",
	},
	{
		name: "Otp",
		path: PATH.OTP_SCREEN,
		page: <WEB_PAGES.OTP_SCREEN />,
		routeType: PublicRoute,
		layout: "auth",
	},

	{
		name: "Closed",
		path: PATH.CLOSED,
		page: <WEB_PAGES.CLOSED />,
		routeType: PublicRoute,
		layout: "auth",
	},
	{
		name: "SignUp",
		path: PATH.SIGNUP,
		// page: <WEB_PAGES.CLOSED />, //for temporary close signups
		page: <WEB_PAGES.SIGNUP />,
		routeType: PublicRoute,
		layout: "auth",
	},
	{
		name: "SignUp",
		path: PATH.INSTITUTE_SIGNUP,
		page: <WEB_PAGES.INSTITUTE_SIGNUP />,
		routeType: PublicRoute,
		layout: "auth",
	},

	{
		name: "ForgotPassword",
		path: PATH.FORGOT_PASSWORD,
		page: <WEB_PAGES.FORGOT_PASSWORD />,
		routeType: PublicRoute,
		layout: "auth",
	},

	{
		name: "UpdatePassword",
		path: PATH.UPDATE_PASSWORD,
		page: <WEB_PAGES.UPDATE_PASSWORD />,
		routeType: PublicRoute,
		layout: "auth",
	},
];

const ROUTES: RouteType[] = [...AUTH_ROUTES, ...PRIVATE_ROUTES];

export default ROUTES;
