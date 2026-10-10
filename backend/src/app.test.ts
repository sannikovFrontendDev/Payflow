import assert from "node:assert/strict";
import { describe, test } from "node:test";
import Database from "better-sqlite3";
import { buildApp } from "./app.js";
import {USER_ROLE} from "./domain/user-role";

// Создаёт изолированные приложение и SQLite-базу для одного теста.
function createTestContext() {
    const db = new Database(":memory:");
    const app = buildApp({ db });

    return { app, db };
}

// Закрывает приложение и гарантирует закрытие тестовой базы.
async function closeTestContext(
    context: ReturnType<typeof createTestContext>,
): Promise<void> {
    await context.app.close();

    if (context.db.open) {
        context.db.close();
    }
}

// Группирует проверки системных маршрутов и жизненного цикла приложения.
describe("System", () => {
    // Проверяет, что health endpoint сообщает о работе сервиса и базы.
    test("GET /api/health сообщает, что сервис работает", async () => {
        const context = createTestContext();

        try {
            const response = await context.app.inject({
                method: "GET",
                url: "/api/health",
            });

            assert.equal(response.statusCode, 200);
            assert.deepEqual(response.json(), {
                status: "ok",
                database: "connected",
            });
        } finally {
            await closeTestContext(context);
        }
    });

    // Проверяет, что закрытие приложения закрывает соединение с SQLite.
    test("закрытие приложения закрывает соединение с базой", async () => {
        const context = createTestContext();

        try {
            await context.app.close();

            assert.equal(context.db.open, false);
        } finally {
            if (context.db.open) {
                context.db.close();
            }
        }
    });
});

// Группирует проверки общего контракта ошибок приложения.
describe("API errors", () => {
    // Проверяет, что неожиданные ошибки возвращают безопасный стабильный ответ.
    test("неожиданная ошибка возвращает Internal Server Error без деталей", async () => {
        const context = createTestContext();

        try {
            context.app.get("/__test/internal-error", async () => {
                throw new Error("internal error details must not reach the client");
            });

            const response = await context.app.inject({
                method: "GET",
                url: "/__test/internal-error",
            });

            assert.equal(response.statusCode, 500);
            assert.deepEqual(response.json(), {
                code: "INTERNAL_SERVER_ERROR",
                message: "Внутренняя ошибка сервера.",
            });
        } finally {
            await closeTestContext(context);
        }
    });
});

// Группирует проверки endpoint-ов модуля авторизации.
describe("Auth", () => {
    // Проверяет регистрацию директора, ответ API и cookie сессии.
    test("регистрация создает директора без компании и устанавливает cookie", async () => {
        const context = createTestContext();

        try {
            const response = await context.app.inject({
                method: "POST",
                url: "/api/auth/sign-up",
                payload: {
                    firstName: "Алексей",
                    lastName: "Иванов",
                    email: "director@example.com",
                    password: "S3cure-password",
                },
            });

            assert.equal(response.statusCode, 201);

            const body = response.json();
            assert.equal(body.user.email, "director@example.com");
            assert.equal(body.user.role, "director");
            assert.equal(body.user.firstName, "Алексей");
            assert.equal(body.user.lastName, "Иванов");
            assert.equal(body.user.companyId, null);

            const cookie = String(response.headers["set-cookie"]);
            assert.match(cookie, /^access_token=/);
            assert.match(cookie, /HttpOnly/i);
            assert.match(cookie, /SameSite=Lax/i);
        } finally {
            await closeTestContext(context);
        }
    });

    // Проверяет, что logout отзывает сохранённую сессию и очищает cookie клиента.
    test("logout удаляет сессию и очищает cookie", async () => {
        const context = createTestContext();

        try {
            const registrationResponse = await context.app.inject({
                method: "POST",
                url: "/api/auth/sign-up",
                payload: {
                    firstName: "Алексей",
                    lastName: "Иванов",
                    email: "logout@example.com",
                    password: "S3cure-password",
                },
            });
            const sessionCookie = String(registrationResponse.headers["set-cookie"])
                .split(";")[0];

            const logoutResponse = await context.app.inject({
                method: "DELETE",
                url: "/api/auth/logout",
                headers: { cookie: sessionCookie },
            });

            assert.equal(logoutResponse.statusCode, 204);
            assert.match(String(logoutResponse.headers["set-cookie"]), /^access_token=;/);
            assert.match(String(logoutResponse.headers["set-cookie"]), /Max-Age=0/i);
            assert.equal(
                (context.db.prepare("SELECT COUNT(*) AS count FROM sessions").get() as { count: number }).count,
                0,
            );
        } finally {
            await closeTestContext(context);
        }
    });

    // Проверяет, что повторный logout без cookie остаётся безопасным и идемпотентным.
    test("logout без cookie тоже возвращает успешный ответ", async () => {
        const context = createTestContext();

        try {
            const response = await context.app.inject({
                method: "DELETE",
                url: "/api/auth/logout",
            });

            assert.equal(response.statusCode, 204);
            assert.match(String(response.headers["set-cookie"]), /^access_token=;/);
        } finally {
            await closeTestContext(context);
        }
    });

    // Проверяет, что корректные учётные данные создают сессию и возвращают пользователя.
    test("вход возвращает данные пользователя и устанавливает cookie", async () => {
        const context = createTestContext();

        try {
            await context.app.inject({
                method: "POST",
                url: "/api/auth/sign-up",
                payload: {
                    firstName: "Алексей",
                    lastName: "Иванов",
                    email: "login@example.com",
                    password: "S3cure-password",
                },
            });

            const response = await context.app.inject({
                method: "POST",
                url: "/api/auth/login",
                payload: {
                    email: "LOGIN@example.com",
                    password: "S3cure-password",
                },
            });

            assert.equal(response.statusCode, 200);
            assert.deepEqual(response.json().user, {
                id: response.json().user.id,
                firstName: "Алексей",
                lastName: "Иванов",
                email: "login@example.com",
                role: "director",
                companyId: null,
            });
            assert.equal(
                (context.db.prepare("SELECT COUNT(*) AS count FROM sessions").get() as { count: number }).count,
                2,
            );

            const cookie = String(response.headers["set-cookie"]);
            assert.match(cookie, /^access_token=/);
            assert.match(cookie, /HttpOnly/i);
            assert.match(cookie, /SameSite=Lax/i);
        } finally {
            await closeTestContext(context);
        }
    });

    // Проверяет, что неверный пароль получает общий отказ без раскрытия деталей.
    test("неверный пароль возвращает общую ошибку авторизации", async () => {
        const context = createTestContext();

        try {
            await context.app.inject({
                method: "POST",
                url: "/api/auth/sign-up",
                payload: {
                    firstName: "Алексей",
                    lastName: "Иванов",
                    email: "wrong-password@example.com",
                    password: "S3cure-password",
                },
            });

            const response = await context.app.inject({
                method: "POST",
                url: "/api/auth/login",
                payload: {
                    email: "wrong-password@example.com",
                    password: "Wrong-password",
                },
            });

            assert.equal(response.statusCode, 401);
            assert.deepEqual(response.json(), {
                code: "INVALID_CREDENTIALS",
                message: "Неверный email или пароль.",
            });
        } finally {
            await closeTestContext(context);
        }
    });

    // Проверяет, что неизвестный email получает тот же общий отказ, что и неверный пароль.
    test("неизвестный email возвращает такую же общую ошибку авторизации", async () => {
        const context = createTestContext();

        try {
            const response = await context.app.inject({
                method: "POST",
                url: "/api/auth/login",
                payload: {
                    email: "unknown@example.com",
                    password: "S3cure-password",
                },
            });

            assert.equal(response.statusCode, 401);
            assert.deepEqual(response.json(), {
                code: "INVALID_CREDENTIALS",
                message: "Неверный email или пароль.",
            });
        } finally {
            await closeTestContext(context);
        }
    });

    // Проверяет, что повторная регистрация с занятым email возвращает конфликт.
    test("повторная регистрация с тем же email возвращает конфликт", async () => {
        const context = createTestContext();
        const payload = {
            firstName: "Алексей",
            lastName: "Иванов",
            email: "director@example.com",
            password: "S3cure-password",
        };

        try {
            const firstResponse = await context.app.inject({
                method: "POST",
                url: "/api/auth/sign-up",
                payload,
            });

            assert.equal(firstResponse.statusCode, 201);

            const duplicateResponse = await context.app.inject({
                method: "POST",
                url: "/api/auth/sign-up",
                payload,
            });

            assert.equal(duplicateResponse.statusCode, 409);
            assert.deepEqual(duplicateResponse.json(), {
                code: "EMAIL_ALREADY_REGISTERED",
                message: "Пользователь с таким email уже зарегистрирован.",
            });
        } finally {
            await closeTestContext(context);
        }
    });

    // Проверяет общий контракт для поля, отсутствующего в теле запроса.
    test("отсутствующее обязательное поле возвращает ошибку валидации", async () => {
        const context = createTestContext();

        try {
            const response = await context.app.inject({
                method: "POST",
                url: "/api/auth/sign-up",
                payload: {
                    lastName: "Иванов",
                    email: "director@example.com",
                    password: "S3cure-password",
                },
            });

            assert.equal(response.statusCode, 400);
            assert.deepEqual(response.json(), {
                code: "VALIDATION_ERROR",
                message: "Заполните все обязательные поля.",
                missingFields: ["firstName"],
            });
        } finally {
            await closeTestContext(context);
        }
    });

    // Проверяет общий контракт, если обязательное поле передано пустым.
    test("пустое обязательное поле возвращает ошибку валидации", async () => {
        const context = createTestContext();

        try {
            const response = await context.app.inject({
                method: "POST",
                url: "/api/auth/sign-up",
                payload: {
                    firstName: "",
                    lastName: "Иванов",
                    email: "director@example.com",
                    password: "S3cure-password",
                },
            });

            assert.equal(response.statusCode, 400);
            assert.deepEqual(response.json(), {
                code: "VALIDATION_ERROR",
                message: "Заполните все обязательные поля.",
                missingFields: ["firstName"],
            });
        } finally {
            await closeTestContext(context);
        }
    });

    // Проверяет, что имя из пробелов считается незаполненным.
    test("поле из пробелов возвращает ошибку валидации", async () => {
        const context = createTestContext();

        try {
            const response = await context.app.inject({
                method: "POST",
                url: "/api/auth/sign-up",
                payload: {
                    firstName: "   ",
                    lastName: "Иванов",
                    email: "director@example.com",
                    password: "S3cure-password",
                },
            });

            assert.equal(response.statusCode, 400);
            assert.deepEqual(response.json(), {
                code: "VALIDATION_ERROR",
                message: "Заполните все обязательные поля.",
                missingFields: ["firstName"],
            });
        } finally {
            await closeTestContext(context);
        }
    });

    // Проверяет, что запрос без сессии получает предсказуемый отказ.
    test("GET /api/auth/me без сессии возвращает 401", async () => {
        const context = createTestContext();

        try {
            const response = await context.app.inject({
                method: "GET",
                url: "/api/auth/me",
            });

            assert.equal(response.statusCode, 401);
            assert.deepEqual(response.json(), {
                code: "UNAUTHENTICATED",
                message: "Требуется авторизация.",
            });
        } finally {
            await closeTestContext(context);
        }
    });

    // Проверяет, что endpoint возвращает пользователя из действующей сессии.
    test("GET /api/auth/me возвращает пользователя по cookie", async () => {
        const context = createTestContext();

        try {
            // Регистрация создаёт пользователя и устанавливает cookie сессии.
            const registrationResponse = await context.app.inject({
                method: "POST",
                url: "/api/auth/sign-up",
                payload: {
                    firstName: "Алексей",
                    lastName: "Иванов",
                    email: "current-user@example.com",
                    password: "S3cure-password",
                },
            });

            // Оставляем в cookie только имя и значение, без остальных атрибутов.
            const sessionCookie = String(
                registrationResponse.headers["set-cookie"],
            ).split(";")[0];

            // Запрашиваем текущего пользователя, передав cookie регистрации.
            const response = await context.app.inject({
                method: "GET",
                url: "/api/auth/me",
                headers: { cookie: sessionCookie },
            });

            assert.equal(response.statusCode, 200);
            assert.deepEqual(response.json().user, {
                id: registrationResponse.json().user.id,
                firstName: "Алексей",
                lastName: "Иванов",
                email: "current-user@example.com",
                role: USER_ROLE.DIRECTOR,
                companyId: null,
            });
        } finally {
            await closeTestContext(context);
        }
    });
});
