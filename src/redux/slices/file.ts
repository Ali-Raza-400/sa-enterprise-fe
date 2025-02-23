import { API_PATHS } from "../../utils/apiPaths";
import { rtkQApi } from "../rtkQApi";
import { ApiResponse } from "../type";

// interface FileData {
// 	key: string;
// 	url: string;
// }

// type FileUploadResponse = ApiResponse<FileData[]>;
type EmptyDataResponse = ApiResponse<Record<string, never>>;
interface DeleteFileRequest {
	file: string;
}

const fileApi = rtkQApi.injectEndpoints({
	endpoints: (builder) => ({
		uploadFile: builder.mutation<any, unknown>({
			query: (data) => {
				return {
					url: API_PATHS.FILE_UPLOAD,
					method: "POST",
					customHeader: {
						"Content-Type": "multipart/form-data",
					},
					data: data,
				};
			},
		}),
		deleteFile: builder.mutation<EmptyDataResponse, DeleteFileRequest>({
			query: ({ file }) => {
				return {
					url: `${API_PATHS.DELETE_FILE}/${file}`,
					method: "DELETE",
				};
			},
		}),
	}),
});

export const { useUploadFileMutation, useDeleteFileMutation } = fileApi;
