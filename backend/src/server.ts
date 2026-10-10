import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { buildApp } from "./app.js";

mkdirSync("data", { recursive: true });

const db = new Database("data/payflow.sqlite");
const app = buildApp({ db });
const port = Number(process.env.PORT ?? 3001);

try {
    await app.listen({ port, host: "127.0.0.1" });
} catch (error) {
    app.log.error(error);
    await app.close();
    process.exitCode = 1;
}
