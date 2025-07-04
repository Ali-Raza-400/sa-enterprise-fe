import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const userApi = rtkQApi.injectEndpoints({
  endpoints: (builder) => ({
    getZones: builder.query<any, any>({
      query: (tableOptions) => {
        const params = {
          ...tableOptions.filters,
          skip: `${tableOptions.pagination.page - 1}0`,
          limit: tableOptions.pagination.pageSize,
        };
        return {
          url: API_PATHS.ZONE,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result) => providesList(result?.data, RTK_TAGS.ZONE),
    }),
    addZone: builder.mutation<any, any>({
      query: (payload) => ({
        url: API_PATHS.ZONE,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [{ type: RTK_TAGS.ZONE, id: "LIST" }],
    }),
    updateZone: builder.mutation<any, any>({
      query: ({ payload, fleetId }) => {
        return {
          url: `${API_PATHS.ZONE}/${fleetId}`,
          method: "PUT",
          data: payload,
        };
      },
      invalidatesTags: [{ type: RTK_TAGS.ZONE, id: "LIST" }],
    }),
    deleteZone: builder.mutation<any, string>({
      query: (id) => ({
        url: `${API_PATHS.ZONE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: RTK_TAGS.ZONE, id: "LIST" }],
    }),
  }),
});

export const {
  useGetZonesQuery,
  useAddZoneMutation,
  useUpdateZoneMutation,
  useDeleteZoneMutation,
} = userApi;
