import { API_PATHS } from "../../utils/apiPaths";
// import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
// import { RTK_TAGS } from "../tags";

const userApi = rtkQApi.injectEndpoints({
    endpoints: (builder) => ({
        getTilesInfo: builder.query<any, any>({
            query: () => {
                return {
                    url: API_PATHS.DASHBOARD_COUNTS,
                    method: "GET",
                };
            },
            // providesTags: (result) => providesList(result?.data, RTK_TAGS.TRUCK),
        }),

    }),
});

export const {
    useGetTilesInfoQuery,
} = userApi;
