import { AuthResponseDTO, truckFormValues } from "../../pages/Auth/type";
import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const userApi = rtkQApi.injectEndpoints({
    endpoints: (builder) => ({
        getOprations: builder.query<any, any>({
            query: (params) => {
                return {
                    url: API_PATHS.OPRATION,
                    method: "GET",
                    params: params,
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.OPRATION),
        }),
        uploadFileData: builder.mutation<any, FormData>({
            query: (formData) => {
                return {
                    url: API_PATHS.OPRATION,
					method: "POST",
					// customHeader: {
					// 	"Content-Type": "multipart/form-data",
					// },
					data: formData,
				};
            }
        }),
        updateOpration: builder.mutation<any, any>({
            query: ({ payload, oprationId }) => {
                console.log("userId::>", oprationId);
                return {
                    url: `${API_PATHS.OPRATION}/${oprationId}`,
                    method: "PUT",
                    data: payload,
                };
            },
              invalidatesTags: [{ type: RTK_TAGS.OPRATION, id: "LIST" }],
        }),
        deleteOpration: builder.mutation<any, string>({
            query: (id) => ({
                url: `${API_PATHS.OPRATION}/${id}`,
                method: "DELETE",
            }),
              invalidatesTags: [{ type: RTK_TAGS.OPRATION, id: "LIST" }],
        }),
    }),
});

export const {
    useGetOprationsQuery,
    useUploadFileDataMutation,
    useUpdateOprationMutation,
    useDeleteOprationMutation
} = userApi;
