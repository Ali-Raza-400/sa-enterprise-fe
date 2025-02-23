import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, {
	AxiosRequestConfig,
	ResponseType as AxiosResponseType,
} from "axios";
import { getUser, removeUser } from "../utils/helper";
import { RTK_TAGS } from "./tags";
import PATH from "../navigation/Path";

type AxiosBaseQueryArgs = {
	url: string;
	method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
	data?: any;
	params?: any;
	body?: any;
	customBaseUrl?: string;
	customHeader?: { [key: string]: string };
	responseType?: AxiosResponseType;
};

const axiosBaseQuery: BaseQueryFn<AxiosBaseQueryArgs> = async (
	{
		url,
		method,
		data,
		params,
		customBaseUrl,
		customHeader,
		responseType,
	}: AxiosBaseQueryArgs
	// api: any
) => {
	let headers: { [key: string]: string } = {
		"Content-type": "application/json; charset=UTF-8",
		...customHeader,
	};

	const token = getUser()?.access_token || null;
	if (token) {
		headers = {
			...headers,
			Authorization: `Bearer ${token}`,
		};
	}
	try {
		const resp = await axios({
			url: customBaseUrl
				? customBaseUrl + url
				: import.meta.env.VITE_BASE_URL + url,
			method,
			data,
			params,
			headers,
			responseType,
		} as AxiosRequestConfig);
		if (resp.data) {
			if (resp.data.metadata) {
				return {
					data: {
						list: resp.data.data,
						pagination: resp.data.metadata,
					},
				};
			}

			return { data: resp.data.data };
		}
		throw resp.data;
	} catch (error: any) {
		if (error.response?.status === 401 && token) {
			removeUser();
			window.location.href = PATH.LOGIN;
		}
		return {
			error,
		};
	}
};

// export const getErrorMessage = (error: unknown) => {
// 	if (!error) return "";

// 	if (typeof error === "object" && "message" in error) {
// 		return error?.message as string;
// 	}

// 	return "Something went wrong";
// };

export const rtkQApi = createApi({
	reducerPath: "rtkQApi",
	baseQuery: axiosBaseQuery,
	endpoints: () => ({}),
	tagTypes: [...Object.values(RTK_TAGS)],
});
