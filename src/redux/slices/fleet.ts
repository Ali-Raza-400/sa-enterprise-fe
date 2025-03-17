import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const userApi = rtkQApi.injectEndpoints({
    endpoints: (builder) => ({
        getFleets: builder.query<any, any>({
            query: (tableOptions) => {
                const params = {
                    ...tableOptions.filters,
                    skip: `${tableOptions.pagination.page - 1}0`,
                    limit: tableOptions.pagination.pageSize,
                };
                return {
                    url: API_PATHS.FLEET,
                    method: "GET",
                    params: params,
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.FLEET),
        }),
        addFleet: builder.mutation<any, any>({
            query: (payload) => ({
                url: API_PATHS.FLEET,
                method: "POST",
                data: payload,
            }),
            invalidatesTags: [{ type: RTK_TAGS.FLEET, id: "LIST" }],
        }),
        updateFleet: builder.mutation<any, any>({
            query: ({ payload, fleetId }) => {
                console.log("userId::>", fleetId);
                return {
                    url: `${API_PATHS.FLEET}/${fleetId}`,
                    method: "PUT",
                    data: payload,
                };
            },
            invalidatesTags: [{ type: RTK_TAGS.FLEET, id: "LIST" }],
        }),

        deleteFleet: builder.mutation<any, string>({
            query: (id) => ({
                url: `${API_PATHS.FLEET}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: RTK_TAGS.FLEET, id: "LIST" }],
        }),
    }),
});

export const { 
    useGetFleetsQuery,
    useAddFleetMutation,
    useUpdateFleetMutation,
    useDeleteFleetMutation
} = userApi;
