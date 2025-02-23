import { AuthResponseDTO } from "../../pages/Auth/type";
import { GetCoursesParams } from "../../pages/Courses/type";
import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const studentApi = rtkQApi.injectEndpoints({
	endpoints: (builder) => ({
		getStudentAnalytics: builder.query<any, void>({
			query: () => ({
				url: API_PATHS.STUDENT_ANALYTICS,
				method: "GET",
			}),
			providesTags: [{ type: RTK_TAGS.STUDENTS }],
		}),

		getStudentCompletedCoursesAnalytics: builder.query<any, string>({
			query: (value) => ({
				url: `${API_PATHS.STUDENT_COMPLETED_COURSES_ANALYTICS}?type=${value}`,
				method: "GET",
			}),
			providesTags: [{ type: RTK_TAGS.STUDENTS_COURSE_ANALYTICS }],
		}),

		updateStudentProfile: builder.mutation<AuthResponseDTO, any>({
			query: ({ payload, userId }) => {
				console.log(payload, "UPDATE USER PAYLOAD");
				return {
					url: `${API_PATHS.UPDATE_STUDENT_PROFILE}/${userId}`,
					method: "PATCH",
					data: payload,
				};
			},
			invalidatesTags: [{ type: RTK_TAGS.TEACHERS_PROFILE, id: "LIST" }],
		}),

		getCompletedCourses: builder.query<any, GetCoursesParams>({
			query: ({ tableOptions }) => {
				const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.page,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					url: API_PATHS.STUDENT_COURSES,
					method: "GET",
					params: params,
				};
			},
			providesTags: (result) =>
				providesList(result?.data, RTK_TAGS.STUDENTS_COURSES),
		}),

		subscribeCourse: builder.mutation<any, string>({
			query: (courseId) => ({
				url: `${API_PATHS.STUDENT_SUBSCRIBE_COURSE}/${courseId}`,
				method: "POST",
			}),
			invalidatesTags: [{ type: RTK_TAGS.STUDENTS_COURSES, id: "LIST" }],
		}),
		getSubmittedAssignments: builder.query<any, void>({
			query: () => ({
				url: API_PATHS.STUDENT_SUBMITTED_ASSIGNMENTS,
				method: "GET",
			}),
		}),
		saveStudentInterest: builder.mutation<any, any>({
			query: (payload) => ({
				url: `${API_PATHS.STUDENT_INTERESTS}`,
				method: "POST",
				data: payload,
			}),
			invalidatesTags: [{ type: RTK_TAGS.STUDENT_INTEREST, id: "LIST" }],
		}),

		getStudentInterest: builder.query<any, void>({
			query: () => ({
				url: API_PATHS.STUDENT_INTERESTS,
				method: "GET",
			}),
		}),
		updateStudentInterestById: builder.mutation<
			any,
			{ id?: string; payload: string[] }
		>({
			query: ({ id, payload }) => ({
				url: `${API_PATHS.STUDENT_INTERESTS}/${id}`,
				method: "PATCH",
				data: payload,
			}),
			invalidatesTags: [{ type: RTK_TAGS.STUDENTS_COURSES, id: "LIST" }],
		}),
		getStudentAssignmentsWithLectures: builder.query<any, any>({
			query: ({ tableOptions }) => {
				const params = {
					// ...tableOptions.filters,
					page: tableOptions.pagination.page,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					url: API_PATHS.STUDENT_ASSIGNMENTS_WITH_LECTURES,
					method: "GET",
					params: params,
				};
			},
			providesTags: (result) =>
				providesList(result?.data, RTK_TAGS.STUDENT_ASSIGNMENTS),
		}),

		saveStdAssignmentSub: builder.mutation<any, any>({
			query: (payload) => ({
				url: `${API_PATHS.STUDENT_ASSIGNMENTS_SUBMISSIONS}`,
				method: "POST",
				data: payload,
			}),
			invalidatesTags: [{ type: RTK_TAGS.STUDENT_ASSIGNMENTS, id: "LIST" }],
		}),

		getInterestedCourses: builder.query<any, any>({
			query: ({ tableOptions }) => {
				const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.page,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					url: API_PATHS.STUDENT_INTERESTED_COURSES,
					method: "GET",
					params: params,
				};
			},
		}),
		submitQuiz: builder.mutation<any, any>({
			query: (payload) => ({
				url: `${API_PATHS.STUDENT_QUIZ_SUBMISSION}`,
				method: "POST",
				data: payload,
			}),
			// invalidatesTags: [{ type: RTK_TAGS.STUDENT_ASSIGNMENTS, id: "LIST" }],
		}),
	}),
});

export const {
	useLazyGetStudentAnalyticsQuery,
	useLazyGetStudentCompletedCoursesAnalyticsQuery,
	useUpdateStudentProfileMutation,
	useGetCompletedCoursesQuery,
	useSubscribeCourseMutation,
	useGetSubmittedAssignmentsQuery,
	useSaveStudentInterestMutation,
	useLazyGetStudentInterestQuery,
	useUpdateStudentInterestByIdMutation,
	useGetStudentAssignmentsWithLecturesQuery,
	useSaveStdAssignmentSubMutation,
	useGetInterestedCoursesQuery,
	useSubmitQuizMutation,
} = studentApi;
