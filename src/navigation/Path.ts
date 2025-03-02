const PATH = {
	NOPAGE: "*",
	CLOSED: "/closed",
	CREATE_USER:'/create-user',

	//  AUTH PATHS
	LOGIN: "/",
	SIGNUP: "/signup",
	INSTITUTE_SIGNUP: "/institute/signup",
	FORGOT_PASSWORD: "/forgot-password",
	UPDATE_PASSWORD: "/update-password",
	OTP_SCREEN: "/otp-screen",

	INSTITUTE_PROFILE: "/institute-profile",
	INSTITUTE_SETTINGS: "/institute/settings",
	MANAGE_STUDENTS: "/user/list",
	MANAGE_OPRATION: "/operation/list",
	MANAGE_OPRATION_CREATE: "/manage-operation/create",
	MANAGE_OPRATION_UPDATE: "/manage-operation/update",
	COURSES: "/truck/list",
	COURSE_VIEW: "/course/view/:id",
	COURSE_VIEW_STUDENT: "/student/course/view/:id",
	NEW_COURSE: "/course/create",

	ITEM_DASHBOARD: "/item-dashboard",
	CARD_DASHBOARD: "/card-dashboard",
	SAVED_CARDS: "/saved-card",
	PREPARE_CARDS: "/prepare-card",
	PREPARE_CARD_EDIT: "/prepare-card/:id/edit",
	MY_KEYS: "/my-keys",
	SIGNED_CARDS: "/signed-cards",
	SIGNED_CARD_EDIT: "/signed-card/:id/edit",
	SIGNED_CARD_PUBLISH_ITEMS: "/signed-card/:id/publish-items",

	//Teacher
	MANAGE_TEACHER: "/manage-teacher/list",
	STUDENTS: "/student/list",
	MANAGE_TEACHER_CREATE: "/manage-teacher/create",
	TEACHER_PROFILE: "/teacher-profile/:id",
	TEACHER_DASHBOARD: "/admin-dashboard",
	TEACHER_STUDENT_PROFILE_VIEW: "/teacher/student-profile-view/:id",

	//Finance
	COUPONS: "/finance/coupons",
	REGISTRATION_REQUEST: "/request/registration",
	COURSE_REQUEST: "/request/courses",
	COUPONS_CREATE: "/finance/coupons/create",
	EARNINGS: "/finance/earnings",
	VIEW_EARNINGS: "/finance/earnings/view/:id",
	STUDENTS_EARNINGS: "/finance/students-earnings/view/:id",

	//Students
	STUDENT_PROFILE: "/student/info/:tab",
	STUDENT_DASHBOARD: "/student/dashboard",
	STUDENT_COURSE_VIEW: "/student/course/:id/view",
	STUDENT_COURSES_LIST: "/student/courses",
	STUDENT_ASSIGNMENTS: "/student/assignments",
	STUDENT_QUIZZES: "/student/quizzes",
	STUDENT_GRADE_ASSIGNMENTS: "/student/grade/assignments",
	STUDENT_GRADE_QUIZZES: "/student/grade/quizzes",
	STUDENT_ENROLLED_COURSES: "/opration/list",
};

export default PATH;
