import { AuthResponseDTO, UserFormValues } from "../../pages/Auth/type";
import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const userApi = rtkQApi.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<any, any>({

			query: (tableOptions) => {
				const params = {
					...tableOptions.filters,
					skip: `${tableOptions.pagination.page-1}0`,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					url: 'users',
					method: "GET",
					params: params,
				};
			},
			providesTags: (result) => providesList(result?.data, RTK_TAGS.USER),
		}),
		getUserByRole: builder.query<any, any>({
			query: (params) => {
				return {
					url: API_PATHS.USER_BY_ROLE,
					method: "GET",
					params: params,
				};
			},
		}),
		getUserById: builder.query<any, string>({
			query: (id) => ({
				url: `${API_PATHS.USER}/${id}`,
				method: "GET",
			}),
		}),
		updateUser: builder.mutation<UserFormValues, any>({
			query: ({ payload, userId }) => {
				console.log("userId::>", userId);
				return {
					url: `${API_PATHS.USER}/${userId}`,
					method: "PUT",
					data: payload,
				};
			},
			invalidatesTags: [{ type: RTK_TAGS.USER, id: "LIST" }],
		}),
		updateUserProfile: builder.mutation<AuthResponseDTO, any>({
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

		getFilteredUsers: builder.query<any, any>({
			query: ({ tableOptions }) => {
				const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.page,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					url: `${API_PATHS.FILTERED_USERS}`,
					method: "GET",
					params: params,
				};
			},
			providesTags: (result) =>
				providesList(result?.data, RTK_TAGS.FILTERED_USERS),
		}),
		bulkApproveUnapprove: builder.mutation<any, any>({
			query: ({ payload }) => {
				return {
					url: `${API_PATHS.USER_BULK_APPROVE_UNAPPROVE}`,
					method: "PATCH",
					data: payload,
				};
			},
			invalidatesTags: [{ type: RTK_TAGS.FILTERED_USERS, id: "LIST" }],
		}),
		getCountries: builder.query<any, any>({
			query: ({ tableOptions }) => {
				const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.page,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					url: `${API_PATHS.COUNTRIES}`,
					method: "GET",
					params: params,
				};
			},
			// providesTags: (result) =>
			// 	providesList(result?.data, RTK_TAGS.COUNTRIES),
		}),
		getStates: builder.query<any, any>({
			query: ({ id, tableOptions }) => {
				const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.page,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					url: `world/${id}/states`,
					method: "GET",
					params: params,
				};
			},
			// providesTags: (result) =>
			// 	providesList(result?.data, RTK_TAGS.COUNTRIES),
		}),
		getCities: builder.query<any, any>({
			query: ({ id, tableOptions }) => {
				const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.page,
					limit: tableOptions.pagination.pageSize,
				};
				return {
					url: `world/${id}/cities`,
					method: "GET",
					params: params,
				};
			},
			// providesTags: (result) =>
			// 	providesList(result?.data, RTK_TAGS.COUNTRIES),
		}),
	}),
});

export const {
	useGetUsersQuery,
	useGetUserByRoleQuery,
	useLazyGetUsersQuery,
	useGetUserByIdQuery,
	useUpdateUserMutation,
	useUpdateUserProfileMutation,
	useGetFilteredUsersQuery,
	useBulkApproveUnapproveMutation,
	useLazyGetCountriesQuery,
	useLazyGetStatesQuery,
	useGetCitiesQuery,
	useLazyGetCitiesQuery,
} = userApi;
