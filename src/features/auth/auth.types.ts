export interface SignUpRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export type UserRole = 'director' | 'user';

export interface AuthUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    companyId: string | null;
}

export interface SignUpResponse {
    user: AuthUser;
}

export type LoginResponse = SignUpResponse;

export type AuthApiError =
    | {
    code: "VALIDATION_ERROR";
    message: string;
    missingFields: string[];
}
    | {
    code: "EMAIL_ALREADY_REGISTERED";
    message: string;
}
    | {
    code: "INVALID_CREDENTIALS";
    message: string;
} | {
    code: "UNAUTHENTICATED";
    message: string;
};

export interface AuthApiErrorResponse {
    status: number;
    data: AuthApiError;
}

export interface CheckAuthResponse {
    user: AuthUser;
}
