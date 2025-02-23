import { GetInstituteTeacherParams } from "../../pages/Institute/type";
import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const instituteApi = rtkQApi.injectEndpoints({
	endpoints: (builder) => ({
		getInstitutes: builder.query<any, any>({
			query: (params) => {
				return {
					url: API_PATHS.INSTITUTE,
					method: "GET",
					params: params,
				};
			},
			providesTags: (result) => providesList(result?.data, RTK_TAGS.INSTITUTE),
		}),
		getInstituteById: builder.query<any, string>({
			query: (id) => ({
				url: `${API_PATHS.INSTITUTE}/${id}`,
				method: "GET",
			}),
		}),

		getInstituteTeacher: builder.query<any, GetInstituteTeacherParams>({
			query: ({ id, tableOptions }) => {
				const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.page,
					limit: tableOptions.pagination.pageSize,
				};

				return {
					url: `${API_PATHS.INSTITUTE}/${id}/teachers`,
					method: "GET",
					params: params,
				};
			},
			providesTags: (result) => providesList(result?.data, RTK_TAGS.TEACHERS),
		}),
	}),
});

export const {
	useGetInstitutesQuery,
	useLazyGetInstitutesQuery,
	useGetInstituteByIdQuery,
	useLazyGetInstituteTeacherQuery,
	useGetInstituteTeacherQuery,
} = instituteApi;
