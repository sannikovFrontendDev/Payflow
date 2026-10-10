import { api } from "@/app/api.ts";
import type {
    CheckAuthResponse,
    LoginRequest,
    LoginResponse,
    SignUpRequest,
    SignUpResponse,
} from "@/features/auth/auth.types.ts";
import { AUTH_ENDPOINTS } from "@/features/auth/auth.endpoints.ts";

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        signUp: build.mutation<SignUpResponse, SignUpRequest>({
            invalidatesTags: ["Auth"],
            query: (body) => ({
                url: AUTH_ENDPOINTS.signUp,
                method: "POST",
                body,
            }),
        }),
        login: build.mutation<LoginResponse, LoginRequest>({
            invalidatesTags: ["Auth"],
            query: (body) => ({
                url: AUTH_ENDPOINTS.login,
                method: "POST",
                body,
            }),
        }),
        checkAuth: build.query<CheckAuthResponse, void>({
            providesTags: ["Auth"],
            query: () => ({
                url: AUTH_ENDPOINTS.checkAuth,
                method: "GET",
            }),
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: AUTH_ENDPOINTS.logout,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useSignUpMutation, useLoginMutation, useLogoutMutation, useCheckAuthQuery } = authApi;
