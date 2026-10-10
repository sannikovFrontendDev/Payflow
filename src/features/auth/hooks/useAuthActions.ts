import { useState } from "react";
import { useLoginMutation, useSignUpMutation } from "@/features/auth/auth.api.ts";
import type {
    AuthUser,
    LoginRequest,
    SignUpRequest,
} from "@/features/auth/auth.types.ts";

// Безопасно извлекает сообщение API из ошибки RTK Query.
function getAuthErrorMessage(error: unknown): string {
    if (typeof error === "object" && error !== null && "data" in error) {
        const responseData = error.data;

        if (
            typeof responseData === "object" &&
            responseData !== null &&
            "message" in responseData &&
            typeof responseData.message === "string"
        ) {
            return responseData.message;
        }
    }

    return "Не удалось выполнить запрос. Попробуйте ещё раз.";
}

// Объединяет запросы входа и регистрации, их состояния загрузки и обработку ошибок.
export function useAuthActions() {
    const [signUpMutation, { isLoading: isSignUpLoading }] = useSignUpMutation();
    const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
    const [errorMessage, setErrorMessage] = useState("");

    // Выполняет auth-запрос, возвращая пользователя либо null при ошибке.
    async function executeAuthRequest(
        request: () => Promise<AuthUser>,
    ): Promise<AuthUser | null> {
        setErrorMessage("");

        try {
            return await request();
        } catch (error: unknown) {
            setErrorMessage(getAuthErrorMessage(error));
            return null;
        }
    }

    // Регистрирует пользователя и возвращает его данные при успехе.
    function signUp(input: SignUpRequest): Promise<AuthUser | null> {
        return executeAuthRequest(async () => {
            const response = await signUpMutation(input).unwrap();
            return response.user;
        });
    }

    // Авторизует пользователя и возвращает его данные при успехе.
    function login(input: LoginRequest): Promise<AuthUser | null> {
        return executeAuthRequest(async () => {
            const response = await loginMutation(input).unwrap();
            return response.user;
        });
    }

    return {
        signUp,
        login,
        isLoading: isSignUpLoading || isLoginLoading,
        errorMessage,
    };
}
