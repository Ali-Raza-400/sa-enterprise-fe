import {
  DeleteCertificationResponse,
  DeletePublicationResponse,
  DeleteQualificationResponse,
  GetAllStudentsParams,
  PublicationPayload,
  SaveCertificationPayload,
  SaveCertificationResponse,
  SavePublicationResponse,
  SaveQualificationPayload,
  SaveQualificationResponse,
  UpdateCertificationPayload,
  UpdateCertificationResponse,
  UpdatePublicationPayload,
  UpdatePublicationResponse,
  UpdateQualificationPayload,
  UpdateQualificationResponse,
} from "../../pages/ManageTeachers/Profile/Components/TeacherTypes";
import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
// import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

// interface TableOptions {
// 	filters: Record<string, any>;
// 	pagination: {
// 		page: number;
// 		pageSize: number;
// 	};
// }

// interface GetInstituteTeacherParams {
// 	id: string;
// 	tableOptions: TableOptions;
// }

const teacherApi = rtkQApi.injectEndpoints({
  endpoints: (builder) => ({
    //publication endpoint
    savePublication: builder.mutation<
      SavePublicationResponse,
      PublicationPayload
    >({
      query: (payload) => {
        return {
          url: API_PATHS.TEACHER_PUBLICATION,
          method: "POST",
          data: payload,
        };
      },
      invalidatesTags: [{ type: RTK_TAGS.TEACHERS_PROFILE, id: "LIST" }],
    }),
    updatePublication: builder.mutation<
      UpdatePublicationResponse,
      { payload: UpdatePublicationPayload; id: string }
    >({
      query: ({ payload, id }) => {
        return {
          url: `${API_PATHS.TEACHER_PUBLICATION}/${id}`,
          method: "PATCH",
          data: payload,
        };
      },
      invalidatesTags: [{ type: RTK_TAGS.TEACHERS_PROFILE, id: "LIST" }],
    }),
    deletePublication: builder.mutation<DeletePublicationResponse, string>({
      query: (id) => {
        return {
          url: `${API_PATHS.TEACHER_PUBLICATION}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: RTK_TAGS.TEACHERS_PROFILE, id: "LIST" }],
    }),

    //course

    saveQualification: builder.mutation<
      SaveQualificationResponse,
      SaveQualificationPayload
    >({
      query: (payload) => {
        return {
          url: API_PATHS.TEACHER_QUALIFICATION,
          method: "POST",
          data: payload,
        };
      },
      invalidatesTags: [{ type: RTK_TAGS.TEACHERS_PROFILE, id: "LIST" }],
    }),
    updateQualification: builder.mutation<
      UpdateQualificationResponse,
      { payload: UpdateQualificationPayload; id: string }
    >({
      query: ({ payload, id }) => {
        return {
          url: `${API_PATHS.TEACHER_QUALIFICATION}/${id}`,
          method: "PATCH",
          data: payload,
        };
      },
      invalidatesTags: [{ type: RTK_TAGS.TEACHERS_PROFILE, id: "LIST" }],
    }),
    deleteQualification: builder.mutation<DeleteQualificationResponse, string>({
      query: (id) => {
        return {
          url: `${API_PATHS.TEACHER_QUALIFICATION}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: RTK_TAGS.TEACHERS_PROFILE, id: "LIST" }],
    }),

    //certification

    saveCertification: builder.mutation<
      SaveCertificationResponse,
      SaveCertificationPayload
    >({
      query: (payload) => {
        return {
          url: API_PATHS.TEACHER_CERTIFICATION,
          method: "POST",
          data: payload,
        };
      },
      invalidatesTags: [{ type: RTK_TAGS.TEACHERS_PROFILE, id: "LIST" }],
    }),

    updateCertification: builder.mutation<
      UpdateCertificationResponse,
      { payload: UpdateCertificationPayload; id: string | undefined }
    >({
      query: ({ payload, id }) => ({
        url: `${API_PATHS.TEACHER_CERTIFICATION}/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [{ type: RTK_TAGS.TEACHERS_PROFILE, id: "LIST" }],
    }),
    deleteCertification: builder.mutation<DeleteCertificationResponse, string>({
      query: (id) => {
        return {
          url: `${API_PATHS.TEACHER_CERTIFICATION}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: RTK_TAGS.TEACHERS_PROFILE, id: "LIST" }],
    }),

    //@GET teacherById
    getTeacherById: builder.query<any, string>({
      query: (params) => {
        return {
          url: `${API_PATHS.TEACHER_INFO_BY_ID}/${params}`,
          method: "GET",
        };
      },
      providesTags: () => [{ type: RTK_TAGS.TEACHERS_PROFILE, id: "LIST" }],
    }),

    getTeacherStudents: builder.query<any, GetAllStudentsParams>({
      query: ({ tableOptions }) => {
        const params = {
          page: tableOptions.pagination.page,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: API_PATHS.TEACHER_STUDENTS,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) =>
        providesList(result?.data, RTK_TAGS.TEACHER_STUDENTS),
    }),

    getTeacherStudentProfile: builder.query<any, GetAllStudentsParams>({
      query: ({ tableOptions }) => {
        const params = {
          ...tableOptions.filters,
          page: tableOptions.pagination.page,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: `${API_PATHS.TEACHER_STUDENTS_PROFILE}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) =>
        providesList(result?.data, RTK_TAGS.TEACHER_STUDENTS_PROFILE),
    }),
  }),
});

export const {
  useSavePublicationMutation,
  useUpdatePublicationMutation,
  useDeletePublicationMutation,
  useSaveQualificationMutation,
  useUpdateQualificationMutation,
  useDeleteQualificationMutation,
  useSaveCertificationMutation,
  useUpdateCertificationMutation,
  useDeleteCertificationMutation,
  useGetTeacherByIdQuery,
  useGetTeacherStudentsQuery,
  useGetTeacherStudentProfileQuery,
} = teacherApi;
