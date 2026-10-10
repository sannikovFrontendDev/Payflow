import type Database from "better-sqlite3";
import { USER_ROLE } from "../domain/user-role.js";

export function initializeDatabase(db: Database.Database): void {
    db.pragma("foreign_keys = ON");

    db.exec(`
    CREATE TABLE IF NOT EXISTS companies (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      first_name TEXT NOT NULL DEFAULT '',
      last_name TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL COLLATE NOCASE UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('${USER_ROLE.DIRECTOR}', '${USER_ROLE.USER}')),
      company_id TEXT REFERENCES companies(id) ON DELETE SET NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS sessions_user_id_idx
      ON sessions(user_id);

    CREATE INDEX IF NOT EXISTS sessions_expires_at_idx
      ON sessions(expires_at);
  `);

    // Читаем текущие колонки, в том числе если база была создана раньше.
    const userColumns = db.pragma("table_info(users)") as Array<{ name: string }>;

    // Добавляем имя только в тех базах, где этой колонки ещё нет.
    if (!userColumns.some((column) => column.name === "first_name")) {
        db.exec("ALTER TABLE users ADD COLUMN first_name TEXT NOT NULL DEFAULT ''");
    }

    // Аналогично добавляем фамилию, сохраняя существующие записи.
    if (!userColumns.some((column) => column.name === "last_name")) {
        db.exec("ALTER TABLE users ADD COLUMN last_name TEXT NOT NULL DEFAULT ''");
    }
}