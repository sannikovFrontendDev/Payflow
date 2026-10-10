import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { existsSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Resolve paths from this script so the command works from any current directory.
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const backendRoot = path.join(projectRoot, "backend");
const databaseFiles = [
    path.join(backendRoot, "data", "payflow.sqlite"),
    path.join(backendRoot, "data", "payflow.sqlite-wal"),
    path.join(backendRoot, "data", "payflow.sqlite-shm"),
];

// Accept only the documented option, so misspelled flags do not go unnoticed.
const argumentsAfterScript = process.argv.slice(2);
const unsupportedArguments = argumentsAfterScript.filter((argument) => argument !== "--clear-db");

if (unsupportedArguments.length > 0) {
    console.error(`Неизвестный аргумент: ${unsupportedArguments.join(", ")}`);
    console.error("Использование: npm run dev [-- --clear-db]");
    process.exit(1);
}

// Delete only the known SQLite database and its sidecar files, before starting the backend.
if (argumentsAfterScript.includes("--clear-db")) {
    try {
        const existingDatabaseFiles = databaseFiles.filter(existsSync);

        if (existingDatabaseFiles.length === 0) {
            console.log("Локальная база ещё не создана; backend создаст её при запуске.");
        } else {
            for (const databaseFile of existingDatabaseFiles) {
                rmSync(databaseFile);
            }

            console.log("Локальная база данных очищена.");
        }
    } catch (error) {
        console.error("Не удалось очистить локальную базу. Убедитесь, что backend остановлен.");
        console.error(error);
        process.exit(1);
    }
}

// Suppress routine tool output while keeping process errors visible.
function forwardOutput(stream, label, destination, isErrorStream) {
    const lines = createInterface({ input: stream, crlfDelay: Infinity });

    lines.on("line", (line) => {
        if (isErrorStream && line.trim().length > 0) {
            destination.write(`[${label}] ${line}\n`);
        }
    });
}

// Start child processes with the current Node executable and their own project directories.
function startProcess(label, workingDirectory, scriptPath, scriptArguments) {
    const child = spawn(process.execPath, [scriptPath, ...scriptArguments], {
        cwd: workingDirectory,
        stdio: ["inherit", "pipe", "pipe"],
    });

    forwardOutput(child.stdout, label, process.stdout, false);
    forwardOutput(child.stderr, label, process.stderr, true);

    child.on("error", (error) => {
        console.error(`[${label}] Не удалось запустить процесс:`, error);
        stopProcesses("SIGTERM", 1);
    });

    return child;
}

const childProcesses = [];
let isStopping = false;

// Stop both services together and let their exit events finish the shutdown.
function stopProcesses(signal, exitCode = 0) {
    if (isStopping) {
        return;
    }

    isStopping = true;
    process.exitCode = exitCode;

    for (const child of childProcesses) {
        if (child.exitCode === null && child.signalCode === null) {
            child.kill(signal);
        }
    }
}

// Shut down both services when the user interrupts the launcher.
process.on("SIGINT", () => stopProcesses("SIGINT"));
process.on("SIGTERM", () => stopProcesses("SIGTERM"));

// Print both service addresses before launch so the frontend link is always visible.
console.log("Frontend: http://localhost:3000");
console.log("Backend:  http://localhost:3001");

// Launch the frontend and backend from their respective package installations.
childProcesses.push(
    startProcess(
        "Frontend",
        projectRoot,
        path.join(projectRoot, "node_modules", "vite", "bin", "vite.js"),
        ["--host", "127.0.0.1", "--port", "3000", "--strictPort"],
    ),
);
childProcesses.push(
    startProcess(
        "Backend",
        backendRoot,
        path.join(backendRoot, "node_modules", "tsx", "dist", "cli.mjs"),
        ["watch", "src/server.ts"],
    ),
);

// If either service exits unexpectedly, stop the other one as well.
for (const child of childProcesses) {
    child.on("exit", (code, signal) => {
        if (!isStopping) {
            const exitCode = code ?? (signal ? 1 : 0);
            console.error(`${child === childProcesses[0] ? "Frontend" : "Backend"}: остановлен (код ${exitCode}).`);
            stopProcesses("SIGTERM", exitCode);
        }
    });
}
