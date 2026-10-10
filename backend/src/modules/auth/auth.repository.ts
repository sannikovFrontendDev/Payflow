import type Database from "better-sqlite3";
import { USER_ROLE } from "../../domain/user-role.js";

export interface DirectorRegistration {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    tokenHash: string;
    expiresAt: number;
}

// Описывает пользователя и хеш пароля, необходимые сервису авторизации.
export interface AuthUserRecord {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    role: typeof USER_ROLE[keyof typeof USER_ROLE];
    companyId: string | null;
}

// Описывает данные серверной сессии без открытого access token.
export interface AuthSession {
    userId: string;
    tokenHash: string;
    expiresAt: number;
}

export type AuthenticatedUserRecord = Omit<AuthUserRecord, "passwordHash">;

export interface AuthRepository {
    registerDirector(registration: DirectorRegistration): boolean;
    deleteSession(tokenHash: string): void;
    findUserByEmail(email: string): AuthUserRecord | undefined;
    createSession(session: AuthSession): void;
    findUserBySession(
        tokenHash: string,
        now: number,
    ): AuthenticatedUserRecord | undefined;
}

export function createAuthRepository(db: Database.Database): AuthRepository {
    const insertUser = db.prepare(`
        INSERT INTO users (id, first_name, last_name, email, password_hash, role, company_id)
        VALUES (@userId, @firstName, @lastName, @email, @passwordHash, @role, NULL)
        ON CONFLICT(email) DO NOTHING
    `);

    const insertSession = db.prepare(`
        INSERT INTO sessions (token_hash, user_id, expires_at)
        VALUES (@tokenHash, @userId, @expiresAt)
    `);

    const findUserByEmailStatement = db.prepare(`
        SELECT
            id,
            first_name AS firstName,
            last_name AS lastName,
            email,
            password_hash AS passwordHash,
            role,
            company_id AS companyId
        FROM users
        WHERE email = @email
    `);

    // Готовит запрос для поиска пользователя по действующей сессии.
    const findUserBySessionStatement = db.prepare(`
        SELECT
            users.id,
            users.first_name AS firstName,
            users.last_name AS lastName,
            users.email,
            users.role,
            users.company_id AS companyId
        FROM sessions
                 INNER JOIN users ON users.id = sessions.user_id
        WHERE sessions.token_hash = @tokenHash
          AND sessions.expires_at > @now
    `);

    const deleteSessionStatement = db.prepare(`
        DELETE FROM sessions
        WHERE token_hash = ?
    `);

    const registerDirector = db.transaction(
        (registration: DirectorRegistration): boolean => {
            const userInsertResult = insertUser.run({
                userId: registration.userId,
                firstName: registration.firstName,
                lastName: registration.lastName,
                email: registration.email,
                passwordHash: registration.passwordHash,
                role: USER_ROLE.DIRECTOR,
            });

            if (userInsertResult.changes === 0) {
                return false;
            }

            insertSession.run({
                tokenHash: registration.tokenHash,
                userId: registration.userId,
                expiresAt: registration.expiresAt,
            });

            return true;
        },
    );

    return {
        registerDirector,
        deleteSession(tokenHash: string): void {
            deleteSessionStatement.run(tokenHash);
        },
        findUserByEmail(email: string): AuthUserRecord | undefined {
            return findUserByEmailStatement.get({ email }) as AuthUserRecord | undefined;
        },
        createSession(session: AuthSession): void {
            insertSession.run(session);
        },
        findUserBySession(tokenHash: string, now: number): AuthenticatedUserRecord | undefined {
            return findUserBySessionStatement.get({
                tokenHash,
                now,
            }) as AuthenticatedUserRecord | undefined;
        },
    };
}
