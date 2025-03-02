import React from "react";

const LOGIN = React.lazy(() => import("./Auth/SignIn"));
const OTP_SCREEN = React.lazy(() => import("./Auth/OptScreen"));
const SIGNUP = React.lazy(() => import("./Auth/SignUp"));
const INSTITUTE_SIGNUP = React.lazy(() => import("./Auth/InstititeSignUp"));
const FORGOT_PASSWORD = React.lazy(() => import("./Auth/ForgotPassword"));
const UPDATE_PASSWORD = React.lazy(() => import("./Auth/UpdatePassword"));
const ITEM_DASHBOARD = React.lazy(() => import("./ItemDashboard"));
const NO_PAGE_FOUND = React.lazy(() => import("./NoPageFound"));
const NO_ACCESS = React.lazy(() => import("./NoAccess"));

const INSTITUTE_PROFILE = React.lazy(() => import("./Institute/Profile/Index"));
const REGISTRATION_REQUEST = React.lazy(
	() => import("./Institute/Requests/Registration/index")
);
const COURSE_REQUEST = React.lazy(
	() => import("./Institute/Requests/Courses/index")
);
const MANAGE_STUDENTS = React.lazy(
	() => import("./Institute/ManageStudents/Index")
);
const ADD_USER = React.lazy(
	() => import("./Institute/ManageStudents/createUser")
);
const INSTITUTE_SETTINGS = React.lazy(
	() => import("./Institute/Settings/Index")
);

//Manage-Teacher
const MANAGE_TEACHER = React.lazy(() => import("./ManageTeachers/Index"));
const MANAGE_OPRATION = React.lazy(() => import("./ManageOprations/Index"));
const MANAGE_OPRATION_CREATE = React.lazy(() => import("./ManageOprations/Create"));
const MANAGE_OPRATION_UPDATE = React.lazy(() => import("./ManageOprations/Update"));
const STUDENTS = React.lazy(() => import("./ManageTeachers/Students/index"));
const MANAGE_TEACHER_CREATE = React.lazy(
	() => import("./ManageTeachers/Create")
);
const TEACHER_PROFILE = React.lazy(
	() => import("./ManageTeachers/Profile/Index")
);
const TEACHER_DASHBOARD = React.lazy(
	() => import("./ManageTeachers/dashboard/index")
);
const TEACHER_STUDENT_PROFILE_VIEW = React.lazy(
	() => import("../pages/Finance/Earnings/StudentsWise/View")
); 

//Finance
const COUPONS = React.lazy(() => import("./Finance/Coupons/Index"));
const COUPONS_CREATE = React.lazy(
	() => import("./Finance/Coupons/CreateUpdate")
);
const EARNINGS = React.lazy(() => import("./Finance/Earnings/Index"));
const VIEW_EARNINGS = React.lazy(
	() => import("./Finance/Earnings/CourseWise/View")
);
const STUDENTS_EARNINGS = React.lazy(
	() => import("./Finance/Earnings/StudentsWise/View")
);
const STUDENT_PROFILE = React.lazy(
	() => import("../pages/Students/Profile/Index")
);
const STUDENT_DASHBOARD = React.lazy(
	() => import("../pages/Students/Dashboard/Index")
);
const STUDENT_QUIZZES = React.lazy(() => import("./Students/Quizzes/Index"));
const STUDENT_ASSIGNMENTS = React.lazy(
	() => import("./Students/Assignments/Index")
);
const STUDENT_GRADE_QUIZZES = React.lazy(
	() => import("./Students/Grades/Quizzes/Index")
);
const STUDENT_GRADE_ASSIGNMENTS = React.lazy(
	() => import("./Students/Grades/Assignments/Index")
);
const STUDENT_COURSE_VIEW = React.lazy(
	() => import("../pages/Students/Courses/ContentView/Index")
);
const STUDENT_ENROLLED_COURSES = React.lazy(
	() => import("../pages/Students/Courses/EnrolledCourses/Index")
);


//Courses
const COURSES = React.lazy(() => import("./Courses/List/Index"));
const COURSE_VIEW = React.lazy(() => import("./Courses/View/View"));
const NEW_COURSE = React.lazy(() => import("./Courses/Generate/Index"));
const STUDENT_COURSES_LIST = React.lazy(
	() => import("./Students/Courses/Index")
);

const CLOSED = React.lazy(() => import("./Auth/ClosedScreen"));
// APP PAGES
const WEB_PAGES = {
	// AUTH PAGES
	LOGIN,
	SIGNUP,
	INSTITUTE_SIGNUP,
	FORGOT_PASSWORD,
	UPDATE_PASSWORD,

	// PROTECTED PAGES
	ITEM_DASHBOARD,

	// CREATE COURSE
	NEW_COURSE,

	INSTITUTE_PROFILE,
	INSTITUTE_SETTINGS,
	MANAGE_STUDENTS,
	ADD_USER,
	OTP_SCREEN,

	// No page found
	NO_PAGE_FOUND,

	// No access page
	NO_ACCESS,

	//Manage-opration
	MANAGE_OPRATION,
	MANAGE_OPRATION_CREATE,
	MANAGE_OPRATION_UPDATE,
	//Manage-teacher
	MANAGE_TEACHER,
	STUDENTS,
	MANAGE_TEACHER_CREATE,
	TEACHER_PROFILE,
	TEACHER_DASHBOARD,
	TEACHER_STUDENT_PROFILE_VIEW,

	//Finance
	COUPONS,
	REGISTRATION_REQUEST,
	COURSE_REQUEST,
	COUPONS_CREATE,
	EARNINGS,
	VIEW_EARNINGS,
	STUDENTS_EARNINGS,

	//Courses
	COURSES,
	COURSE_VIEW,

	//STUDENT
	STUDENT_PROFILE,
	STUDENT_DASHBOARD,
	STUDENT_QUIZZES,
	STUDENT_GRADE_QUIZZES,
	STUDENT_ASSIGNMENTS,
	STUDENT_GRADE_ASSIGNMENTS,
	STUDENT_COURSE_VIEW,
	STUDENT_COURSES_LIST,
	STUDENT_ENROLLED_COURSES,

	CLOSED,
};
export default WEB_PAGES;
