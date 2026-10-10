// Типы базы данных и Fastify нужны только для проверки TypeScript.
import type Database from "better-sqlite3";
import type { FastifyInstance, FastifyReply } from "fastify";

// Константы роли, cookie и срока её действия.
import { API_ERROR } from "../../domain/api-error.js";
import { USER_ROLE } from "../../domain/user-role.js";
import {
    AUTH_COOKIE_NAME,
    AUTH_SESSION_TTL_SECONDS,
} from "./auth.constants.js";
import { AUTH_ERROR } from "./auth.errors.js";

// Сервис выполняет сценарий регистрации.
import { createAuthService } from "./auth.service.js";

// Описываем поля тела запроса регистрации.
interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Описывает тело запроса входа существующего пользователя.
interface LoginRequest {
    email: string;
    password: string;
}

// Описывает публичные данные пользователя в ответах регистрации и входа.
const authUserResponseSchema = {
    type: "object",
    required: ["id", "firstName", "lastName", "email", "role", "companyId"],
    properties: {
        id: { type: "string" },
        firstName: {
            type: "string",
            minLength: 1,
            pattern: "\\S",
        },
        lastName: {
            type: "string",
            minLength: 1,
            pattern: "\\S",
        },
        email: { type: "string" },
        role: {
            type: "string",
            enum: [USER_ROLE.DIRECTOR, USER_ROLE.USER],
        },
        companyId: {
            anyOf: [{ type: "string" }, { type: "null" }],
        },
    },
};

// Повторно использует общую схему ошибок валидации для auth-запросов.
const validationErrorResponseSchema = {
    type: "object",
    required: ["code", "message", "missingFields"],
    properties: {
        code: { type: "string", enum: [API_ERROR.VALIDATION.code] },
        message: { type: "string", enum: [API_ERROR.VALIDATION.message] },
        missingFields: {
            type: "array",
            items: { type: "string" },
        },
    },
};

// Повторно использует общий контракт внутренней ошибки API.
const internalServerErrorResponseSchema = {
    type: "object",
    required: ["code", "message"],
    properties: {
        code: { type: "string", enum: [API_ERROR.INTERNAL_SERVER_ERROR.code] },
        message: { type: "string", enum: [API_ERROR.INTERNAL_SERVER_ERROR.message] },
    },
};

// Устанавливает cookie сессии с одинаковыми параметрами для регистрации и входа.
function setAuthCookie(reply: FastifyReply, accessToken: string): void {
    reply.setCookie(AUTH_COOKIE_NAME, accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: AUTH_SESSION_TTL_SECONDS,
    });
}

// Подключаем маршруты авторизации к уже собранному Fastify-приложению.
export function registerAuthRoutes(
    app: FastifyInstance,
    db: Database.Database,
): void {
    // Создаём сервис один раз при настройке приложения.
    const authService = createAuthService(db);

    // Объявляем endpoint регистрации директора.
    app.post<{ Body: RegisterRequest }>(
        "/api/auth/sign-up",
        {
            // Эта схема одновременно проверяет запрос и документирует endpoint в Swagger.
            schema: {
                tags: ["Auth"],
                summary: "Зарегистрировать директора",
                body: {
                    type: "object",
                    additionalProperties: false,
                    required: ["firstName", "lastName", "email", "password"],
                    properties: {
                        email: { type: "string", format: "email" },
                        firstName: {
                            type: "string",
                            minLength: 1,
                            pattern: "\\S",
                        },
                        lastName: {
                            type: "string",
                            minLength: 1,
                            pattern: "\\S",
                        },
                        password: { type: "string", minLength: 8 },
                    },
                },
                response: {
                    400: validationErrorResponseSchema,
                    201: {
                        type: "object",
                        required: ["user"],
                        properties: {
                            user: authUserResponseSchema,
                        },
                    },
                    409: {
                        type: "object",
                        required: ["code", "message"],
                        properties: {
                            code: { type: "string", enum: [AUTH_ERROR.EMAIL_ALREADY_REGISTERED.code] },
                            message: { type: "string", enum: [AUTH_ERROR.EMAIL_ALREADY_REGISTERED.message] },
                        },
                    },
                    500: internalServerErrorResponseSchema,
                },
            },
        },
        // Fastify вызывает обработчик после проверки тела запроса по схеме.
        async (request, reply) => {
            // Сервис создаёт директора, хеширует пароль и сохраняет сессию.
            const result = await authService.registerDirector(request.body);

            // Преобразуем конфликт email из результата сервиса в HTTP-ответ.
            if (!result.registered) {
                return reply.code(409).send(AUTH_ERROR.EMAIL_ALREADY_REGISTERED);
            }

            // Устанавливаем токен в cookie; в JSON-ответ сам токен не включаем.
            setAuthCookie(reply, result.accessToken);

            // Клиент определит дальнейший маршрут по companyId пользователя.
            return reply.code(201).send({ user: result.user });
        },
    );

    // Объявляем endpoint входа по email и паролю.
    app.post<{ Body: LoginRequest }>(
        "/api/auth/login",
        {
            schema: {
                tags: ["Auth"],
                summary: "Войти в аккаунт",
                body: {
                    type: "object",
                    additionalProperties: false,
                    required: ["email", "password"],
                    properties: {
                        email: { type: "string", format: "email" },
                        password: { type: "string", minLength: 1 },
                    },
                },
                response: {
                    200: {
                        type: "object",
                        required: ["user"],
                        properties: {
                            user: authUserResponseSchema,
                        },
                    },
                    400: validationErrorResponseSchema,
                    401: {
                        type: "object",
                        required: ["code", "message"],
                        properties: {
                            code: { type: "string", enum: [AUTH_ERROR.INVALID_CREDENTIALS.code] },
                            message: { type: "string", enum: [AUTH_ERROR.INVALID_CREDENTIALS.message] },
                        },
                    },
                    500: internalServerErrorResponseSchema,
                },
            },
        },
        async (request, reply) => {
            // Проверяем пароль и создаём новую сессию для существующего пользователя.
            const result = await authService.login(request.body);

            // Возвращаем одинаковый отказ при неизвестном email и неверном пароле.
            if (!result.authenticated) {
                return reply.code(401).send(AUTH_ERROR.INVALID_CREDENTIALS);
            }

            // Сохраняем токен в HttpOnly cookie и не включаем его в JSON.
            setAuthCookie(reply, result.accessToken);

            return reply.code(200).send({ user: result.user });
        },
    );

    // Возвращает пользователя, которому принадлежит действующая cookie сессии.
    app.get(
        "/api/auth/me",
        {
            schema: {
                tags: ["Auth"],
                summary: "Получить текущего пользователя",
                response: {
                    200: {
                        type: "object",
                        required: ["user"],
                        properties: {
                            user: authUserResponseSchema,
                        },
                    },
                    401: {
                        type: "object",
                        required: ["code", "message"],
                        properties: {
                            code: {
                                type: "string",
                                enum: [AUTH_ERROR.UNAUTHENTICATED.code],
                            },
                            message: {
                                type: "string",
                                enum: [AUTH_ERROR.UNAUTHENTICATED.message],
                            },
                        },
                    },
                    500: internalServerErrorResponseSchema,
                },
            },
        },
        (request, reply) => {
            // Ищет пользователя по токену из HttpOnly cookie.
            const user = authService.getCurrentUser(
                request.cookies[AUTH_COOKIE_NAME],
            );

            // Без действующей сессии endpoint сообщает, что нужна авторизация.
            if (!user) {
                return reply.code(401).send(AUTH_ERROR.UNAUTHENTICATED);
            }

            // Возвращает только публичные данные пользователя.
            return reply.code(200).send({ user });
        },
    );

    // Объявляем endpoint завершения текущей сессии.
    app.delete(
        "/api/auth/logout",
        {
            schema: {
                tags: ["Auth"],
                summary: "Завершить текущую сессию",
                response: {
                    204: { type: "null" },
                },
            },
        },
        async (request, reply) => {
            // Удаляем серверную сессию по токену из cookie, если он передан.
            authService.logout(request.cookies[AUTH_COOKIE_NAME]);

            // Удаляем cookie с теми же параметрами пути и безопасности, с которыми она создана.
            reply.clearCookie(AUTH_COOKIE_NAME, {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                path: "/",
            });

            // Возвращаем 204 и не добавляем тело ответа.
            return reply.code(204).send();
        },
    );
}
