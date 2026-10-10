// Хранит стабильный API-контракт ошибок модуля авторизации.
export const AUTH_ERROR = {
    EMAIL_ALREADY_REGISTERED: {
        code: "EMAIL_ALREADY_REGISTERED",
        message: "Пользователь с таким email уже зарегистрирован.",
    },
    INVALID_CREDENTIALS: {
        code: "INVALID_CREDENTIALS",
        message: "Неверный email или пароль.",
    },
    UNAUTHENTICATED: {
        code: "UNAUTHENTICATED",
        message: "Требуется авторизация.",
    },
} as const;
