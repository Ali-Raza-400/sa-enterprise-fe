import { API_PATHS } from "../../utils/apiPaths";
import { rtkQApi } from "../rtkQApi";

const userApi = rtkQApi.injectEndpoints({
  endpoints: (builder) => ({
    getTilesInfo: builder.query<any, { project_id: number }>({
      query: ({ project_id }) => {
        return {
          url: `${API_PATHS.DASHBOARD_COUNTS}?project_id=${project_id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetTilesInfoQuery } = userApi;
