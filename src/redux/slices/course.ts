import {
	CreateCourseDTO,
	CreateCourseResponseDTO,
	GetAllCoursesResponse,
} from "../../pages/Courses/Generate/CourseStep3/type";
import { GetCoursesParams } from "../../pages/Courses/type";
import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";
import { ApiResponse } from "../type";

type AllCoursesResponse = ApiResponse<GetAllCoursesResponse>;
type AssignCourseToTeacherArgs = {
	teacherId: string;
	courseId: string;
};
const courseApi = rtkQApi.injectEndpoints({
	endpoints: (builder) => ({
		createCourse: builder.mutation<CreateCourseResponseDTO, CreateCourseDTO>({
			query: (data) => {
				return {
					url: API_PATHS.COURSE,
					method: "POST",
					data: data,
				};
			},
			invalidatesTags: [{ type: RTK_TAGS.INSTITUTE_COURSES, id: "LIST" }],
		}),
		getCourses: builder.query<AllCoursesResponse, GetCoursesParams>({
			query: ({ tableOptions }) => {
				const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.page,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					url: API_PATHS.COURSE,
					method: "GET",
					params: params,
				};
			},
		}),
		getInstituteCourses: builder.query<any, GetCoursesParams>({
			query: ({ id, tableOptions }) => {
				const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.page,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					url: `${API_PATHS.INSTITUTE_COURSES}/${id}`,
					method: "GET",
					params: params,
				};
			},
			providesTags: (result) =>
				providesList(result?.data, RTK_TAGS.INSTITUTE_COURSES),
		}),
		getCourseById: builder.query<any, string>({
			query: (id) => ({
				url: `${API_PATHS.COURSE}/${id}`,
				method: "GET",
			}),
		}),
		assignCourseToTeacher: builder.mutation<any, AssignCourseToTeacherArgs>({
			query: ({ teacherId, courseId }) => ({
				url: `${API_PATHS.COURSE}/assign-course-to-teacher/${teacherId}/${courseId}`,
				method: "POST",
			}),
		}),
		deleteCourse: builder.mutation<any, string>({
			query: (id) => ({
				url: `${API_PATHS.DELETE_COURSE}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: RTK_TAGS.INSTITUTE_COURSES, id: "LIST" }],
		}),
		getQuizByAttachmentId: builder.query<any, string>({
			query: (id) => ({
				url: `${API_PATHS.COURSE}/${id}/quizzes`,
				method: "GET",
			}),
		}),
		getCourseLimit: builder.query<any, any>({
			query: ({ tableOptions }) => {
				const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.page,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					url: API_PATHS.COURSE_LIMIT,
					method: "GET",
					params: params,
				};
			},
			providesTags: (result) =>
				providesList(result?.data, RTK_TAGS.COURSE_LIMIT_UPDATE),
		}),

		updateCourseLimit: builder.mutation<any, any>({
			query: ({ payload, courseId }) => {
				//   console.log(payload, "UPDATE USER PAYLOAD");
				return {
					url: `${API_PATHS.COURSE}/${courseId}/courseUserLimit`,
					method: "PATCH",
					data: payload,
				};
			},
			invalidatesTags: [{ type: RTK_TAGS.COURSE_LIMIT_UPDATE, id: "LIST" }],
		}),
		toggleMandatory: builder.mutation<any, any>({
			query: ({ type, courseId }) => {
				return {
					url: `${API_PATHS.COURSE}/${courseId}/markCourseAsMendatory?isMendatory=${type}`,
					method: "PATCH",
				};
			},
			invalidatesTags: [{ type: RTK_TAGS.INSTITUTE_COURSES, id: "LIST" }],
		}),

		getCoursesRequest: builder.query<any, any>({
			query: ({ tableOptions }) => {
				const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.page,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					url: API_PATHS.STUDENT_COURSE_REQUEST,
					method: "GET",
					params: params,
				};
			},
			providesTags: (result) =>
				providesList(result?.data, RTK_TAGS.STUDENT_COURSE_REQUEST),
		}),
		bulkCoursesApproveUnapprove: builder.mutation<any, any>({
			query: ({ payload }) => {
				return {
					url: `${API_PATHS.COURSES_BULK_APPROVE_UNAPPROVE}`,
					method: "PATCH",
					data: payload,
				};
			},
			invalidatesTags: [{ type: RTK_TAGS.STUDENT_COURSE_REQUEST, id: "LIST" }],
		}),
	}),
});

export const {
	useCreateCourseMutation,
	useGetCoursesQuery,
	useLazyGetCoursesQuery,
	useGetInstituteCoursesQuery,
	useLazyGetInstituteCoursesQuery,
	useGetCourseByIdQuery,
	useDeleteCourseMutation,
	useAssignCourseToTeacherMutation,
	useGetQuizByAttachmentIdQuery,
	useLazyGetQuizByAttachmentIdQuery,
	useGetCourseLimitQuery,
	useUpdateCourseLimitMutation,
	useToggleMandatoryMutation,
	useGetCoursesRequestQuery,
	useLazyGetCoursesRequestQuery,
	useBulkCoursesApproveUnapproveMutation,
} = courseApi;
