import {
  AuthResponseDTO,
  ForgotResponseDTO,
  LoginRequestDTO,
  RegisterRequestDTO,
  UpdatePasswordRequestDTO,
  UpdatePasswordResponseDTO,
} from "../../pages/Auth/type";
import { API_PATHS } from "../../utils/apiPaths";
import { rtkQApi } from "../rtkQApi";
 import { RTK_TAGS } from "../tags";

const authApi = rtkQApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponseDTO, LoginRequestDTO>({
      query: (payload) => {
        return {
          url: API_PATHS.LOGIN,
          method: "POST",
          data: payload,
        };
      },
    }),
    register: builder.mutation<AuthResponseDTO, RegisterRequestDTO>({
      query: (payload) => ({
        url: API_PATHS.REGISTER,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [{ type: RTK_TAGS.USER, id: "LIST" }],
    }),
    deleteUser: builder.mutation<any, string>({
			query: (id) => ({
				url: `${API_PATHS.DELETE_USER}/${id}`,
				method: "DELETE",
			}),
      invalidatesTags: [{ type: RTK_TAGS.USER, id: "LIST" }],
		}),
    forgot: builder.mutation<ForgotResponseDTO, string>({
      query: (email) => {
        return {
          url: `forgot-password/${email}`,
          method: "POST",
        };
      },
    }),
    
    updatePassword: builder.mutation<
      UpdatePasswordResponseDTO,
      UpdatePasswordRequestDTO
    >({
      query: (payload) => {
        return {
          url: API_PATHS.UPDATE_PASSWORD,
          method: "POST",
          data: payload,
        };
      },
    }),
    verifyOtp: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: API_PATHS.OTP,
          method: "POST",
          data: payload,
        };
      },
    }),
    resendOtp: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: `${API_PATHS.RESEND_OTP}/${payload.email}`,
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useDeleteUserMutation,
  useForgotMutation,
  useUpdatePasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation
} = authApi;
