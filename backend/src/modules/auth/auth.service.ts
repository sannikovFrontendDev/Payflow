// Нужен для генерации идентификаторов и безопасных токенов,
// а также для хеширования токена перед записью в базу.
import { createHash, randomBytes, randomUUID } from "node:crypto";

// Библиотека для безопасного хеширования паролей.
import argon2 from "argon2";

// Роль директора задаётся backend-кодом, а не приходит от клиента.
import { USER_ROLE } from "../../domain/user-role.js";

// Общие настройки auth-модуля.
import { AUTH_SESSION_TTL_SECONDS } from "./auth.constants.js";

// Репозиторий отвечает за запись пользователя и сессии в SQLite.
import { createAuthRepository } from "./auth.repository.js";

// Данные, которые сервис ожидает получить от маршрута.
interface RegisterDirectorInput {
    email: string; // Email нового директора.
    firstName: string; // Имя пользователя
    lastName: string; // Фамилия пользователя
    password: string; // Пароль в открытом виде, только для обработки в памяти.
}

// Данные, которые сервис ожидает получить при входе.
interface LoginInput {
    email: string;
    password: string;
}

// Создаём сервис и связываем его с репозиторием базы данных.
export function createAuthService(db: import("better-sqlite3").Database) {
    const repository = createAuthRepository(db);

    return {
        // Проверяет учётные данные и создаёт новую серверную сессию.
        async login(input: LoginInput) {
            // Нормализуем email так же, как во время регистрации.
            const email = input.email.trim().toLowerCase();
            const user = repository.findUserByEmail(email);

            // Не раскрываем, отсутствует пользователь или неверен пароль.
            if (!user || !(await argon2.verify(user.passwordHash, input.password))) {
                return { authenticated: false as const };
            }

            // Генерируем новый access token и сохраняем в базе только его хеш.
            const accessToken = randomBytes(32).toString("base64url");
            const tokenHash = createHash("sha256")
                .update(accessToken)
                .digest("hex");
            const expiresAt = Date.now() + AUTH_SESSION_TTL_SECONDS * 1000;

            repository.createSession({
                userId: user.id,
                tokenHash,
                expiresAt,
            });

            // Возвращаем только публичные данные; хеш пароля остаётся внутри backend.
            return {
                authenticated: true as const,
                accessToken,
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    companyId: user.companyId,
                },
            };
        },

        // Ищет пользователя по токену действующей сессии.
        getCurrentUser(accessToken?: string) {
            // Без cookie невозможно определить сессию.
            if (!accessToken) {
                return undefined;
            }

            // Хеширует токен тем же способом, что и при создании сессии.
            const tokenHash = createHash("sha256")
                .update(accessToken)
                .digest("hex");

            // Возвращает публичные данные пользователя, если сессия действует.
            return repository.findUserBySession(tokenHash, Date.now());
        },

        // Завершает сессию, если у клиента есть действующий токен.
        logout(accessToken?: string): void {
            if (!accessToken) {
                return;
            }

            // Ищем в базе хеш, чтобы не хранить access token в открытом виде.
            const tokenHash = createHash("sha256")
                .update(accessToken)
                .digest("hex");

            repository.deleteSession(tokenHash);
        },

        // Регистрация асинхронная, потому что Argon2 вычисляет хеш пароля.
        async registerDirector(input: RegisterDirectorInput) {
            // Генерируем уникальный ID нового пользователя.
            const userId = randomUUID();

            const firstName = input.firstName.trim();

            const lastName = input.lastName.trim();
            // Убираем пробелы по краям и приводим email к нижнему регистру,
            // чтобы одна почта не создавала несколько аккаунтов из-за регистра.
            const email = input.email.trim().toLowerCase();

            // Хешируем пароль. В базу попадёт хеш, а не исходный пароль.
            const passwordHash = await argon2.hash(input.password);

            // Создаём случайный access token для cookie.
            const accessToken = randomBytes(32).toString("base64url");

            // Считаем SHA-256 хеш токена для хранения в таблице sessions.
            // Сам токен в базу не записываем.
            const tokenHash = createHash("sha256")
                .update(accessToken)
                .digest("hex");

            // Вычисляем время истечения сессии в миллисекундах.
            const expiresAt = Date.now() + AUTH_SESSION_TTL_SECONDS * 1000;

            // Сохраняем директора и его сессию одной транзакцией.
            const isRegistered = repository.registerDirector({
                userId,
                firstName,
                lastName,
                email,
                passwordHash,
                tokenHash,
                expiresAt,
            });

            // Возвращаем ожидаемый бизнес-исход вместо исключения.
            if (!isRegistered) {
                return { registered: false as const };
            }

            // Передаём результат HTTP-маршруту.
            // Маршрут установит accessToken в cookie и вернёт данные пользователя.
            return {
                registered: true as const,
                accessToken,
                user: {
                    id: userId,
                    firstName,
                    lastName,
                    email,
                    role: USER_ROLE.DIRECTOR,
                    companyId: null,
                },
            };
        },
    };
}
