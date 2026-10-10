# Payflow

Payflow — приложение для управления компаниями, магазинами, операциями и выплатами.

Frontend: React, TypeScript, Vite, Redux Toolkit, Tailwind CSS и shadcn/ui. Backend: Fastify, TypeScript и SQLite.

## Требования

- Node.js `20.19+` или `22.12+`.
- npm.

## Установка

Из корня проекта установи зависимости frontend и backend:

```sh
npm install
npm --prefix backend install
```

## Запуск проекта

Из корня проекта запусти frontend и backend одной командой:

```sh
npm run dev
```

После запуска будут доступны:

- Frontend: <http://localhost:3000>
- Backend health check: <http://localhost:3001/api/health>
- Swagger API documentation: <http://localhost:3001/documentation>

Остановить оба сервиса можно сочетанием `Ctrl+C` в той же консоли.

## Очистка локальной базы данных

Чтобы удалить локальную SQLite-базу и создать её заново при запуске, используй одну из команд:

```sh
npm run dev:clear
```

или:

```sh
npm run dev -- --clear-db
```

Команда удаляет `backend/data/payflow.sqlite` и файлы SQLite `-wal`/`-shm`, если они существуют. Все данные локальной базы будут потеряны.

## Проверки

Запустить тесты backend:

```sh
npm --prefix backend test
```

Собрать frontend и проверить TypeScript:

```sh
npm run build
```

Собрать backend:

```sh
npm --prefix backend run build
```

Проверить frontend линтером:

```sh
npm run lint
```

## Добавление компонентов shadcn/ui

Добавить компонент можно через CLI:

```sh
npx shadcn add accordion
```

Документация компонентов: [shadcn/ui](https://ui.shadcn.com/docs/components).
