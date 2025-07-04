import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const userApi = rtkQApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<any, any>({
      query: (tableOptions) => {
        const params = {
          ...tableOptions.filters,
          skip: `${tableOptions.pagination.page - 1}0`,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: API_PATHS.PROJECTS,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) => providesList(result?.data, RTK_TAGS.PROJECT),
    }),
    addProject: builder.mutation<any, any>({
      query: (payload) => ({
        url: API_PATHS.PROJECTS,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [{ type: RTK_TAGS.PROJECT, id: "LIST" }],
    }),
    updateProject: builder.mutation<any, any>({
      query: ({ payload, fleetId }) => {
        return {
          url: `${API_PATHS.PROJECTS}/${fleetId}`,
          method: "PUT",
          data: payload,
        };
      },
      invalidatesTags: [{ type: RTK_TAGS.PROJECT, id: "LIST" }],
    }),
    deleteProject: builder.mutation<any, string>({
      query: (id) => ({
        url: `${API_PATHS.PROJECTS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: RTK_TAGS.PROJECT, id: "LIST" }],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = userApi;
