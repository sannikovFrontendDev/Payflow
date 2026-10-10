// Хранит общий контракт ошибок проверки входящих запросов.
export const API_ERROR = {
    VALIDATION: {
        code: "VALIDATION_ERROR",
        message: "Заполните все обязательные поля.",
    },
    INTERNAL_SERVER_ERROR: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Внутренняя ошибка сервера.",
    },
} as const;
