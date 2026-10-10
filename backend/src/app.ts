import Fastify, {
    type FastifyError,
    type FastifySchemaValidationError,
} from "fastify"; // Создаём HTTP-сервер на Fastify.
import cookie from "@fastify/cookie";
import swagger from "@fastify/swagger"; // Генерирует OpenAPI-описание из настроек маршрутов.
import swaggerUi from "@fastify/swagger-ui"; // Показывает OpenAPI-описание в браузере.
import { initializeDatabase } from "./infrastructure/database.js";
import { registerAuthRoutes } from "./modules/auth/auth.routes.js";
import type Database from "better-sqlite3";
import { API_ERROR } from "./domain/api-error.js";

// Извлекает имена отсутствующих или пустых полей из ошибок JSON Schema.
function getMissingFields(
    validationErrors: FastifySchemaValidationError[],
    requestBody: unknown,
): string[] {
    const missingFields = new Set<string>();
    const body =
        typeof requestBody === "object" && requestBody !== null && !Array.isArray(requestBody)
            ? requestBody as Record<string, unknown>
            : {};

    for (const validationError of validationErrors) {
        if (validationError.keyword === "required") {
            const missingProperty = validationError.params.missingProperty;

            if (typeof missingProperty === "string") {
                missingFields.add(missingProperty);
            }

            continue;
        }

        const pathSegments = validationError.instancePath.split("/");
        const encodedFieldName = pathSegments[pathSegments.length - 1];

        if (!encodedFieldName) {
            continue;
        }

        const fieldName = encodedFieldName
            .replace(/~1/g, "/")
            .replace(/~0/g, "~");
        const fieldValue = body[fieldName];

        if (typeof fieldValue === "string" && fieldValue.trim() === "") {
            missingFields.add(fieldName);
        }
    }

    return [...missingFields];
}

// Описываем, какие зависимости нужны при создании приложения.
interface BuildAppOptions {
    db: Database.Database; // buildApp получит уже открытую SQLite-базу.
}

// Экспортируем фабрику приложения: её вызовут сервер и тесты.
export function buildApp({ db }: BuildAppOptions) {
    initializeDatabase(db);
    // Создаём экземпляр Fastify. logger включает логирование запросов и ошибок.
    const app = Fastify({ logger: true });

    // Приводит ошибки проверки запроса Fastify к общему формату API.
    app.setErrorHandler<FastifyError>((error, request, reply) => {
        if (error.validation) {
            const missingFields =
                error.validationContext === "body"
                    ? getMissingFields(error.validation, request.body)
                    : [];

            return reply.code(400).send({
                ...API_ERROR.VALIDATION,
                missingFields,
            });
        }

        request.log.error(error);
        return reply.code(500).send(API_ERROR.INTERNAL_SERVER_ERROR);
    });

    app.register(cookie);

    // Регистрируем генератор OpenAPI до объявления маршрутов.
    app.register(swagger, {
        // Настройки документации OpenAPI.
        openapi: {
            // Общие сведения, которые будут показаны в документации.
            info: {
                title: "Payflow API", // Название API.
                description: "API для Payflow", // Краткое описание.
                version: "0.1.0", // Версия документации API.
            },
        },
    });

    // Регистрируем веб-интерфейс Swagger UI.
    app.register(swaggerUi, {
        routePrefix: "/documentation", // По этому адресу откроется документация.
    });

    // Добавляем маршруты после инициализации Swagger, чтобы они попали в OpenAPI.
    app.register(async (routesApp) => {
        registerAuthRoutes(routesApp, db);

        // Регистрируем GET-маршрут проверки backend и базы данных.
        routesApp.get(
            "/api/health", // URL маршрута.
            {
                // Метаданные и схема ответа маршрута для OpenAPI.
                schema: {
                    tags: ["System"], // Группирует маршрут под тегом System.
                    summary: "Проверить состояние backend и базы данных", // Краткое описание маршрута.
                    response: {
                        // Описываем структуру ответа для HTTP-статуса 200.
                        200: {
                            type: "object", // Ответ — JSON-объект.
                            properties: {
                                status: { type: "string" }, // В ответе есть строковое поле status.
                                database: { type: "string" }, // И строковое поле database.
                            },
                            required: ["status", "database"], // Оба поля обязательны в ответе.
                        },
                        500: {
                            type: "object",
                            required: ["code", "message"],
                            properties: {
                                code: { type: "string", enum: [API_ERROR.INTERNAL_SERVER_ERROR.code] },
                                message: { type: "string", enum: [API_ERROR.INTERNAL_SERVER_ERROR.message] },
                            },
                        },
                    },
                },
            },
            async () => {
                // Выполняем простой запрос, чтобы убедиться, что база отвечает.
                db.prepare("SELECT 1").get();

                // Fastify автоматически отправит это значение как JSON с HTTP 200.
                return { status: "ok", database: "connected" };
            },
        );
    });

    app.addHook("onClose", async () => {
        if (db.open) {
            db.close();
        }
    });

    // Возвращаем настроенное приложение. Здесь сервер ещё не начинает слушать порт.
    return app;
}
