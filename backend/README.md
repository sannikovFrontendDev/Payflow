# Backend API

## Авторизация

### `POST /api/auth/sign-up`

Регистрирует директора без компании и создаёт для него сессию.

**Тело запроса**

```json
{
  "firstName": "Алексей",
  "lastName": "Иванов",
  "email": "director@example.com",
  "password": "..."
}
```

**Успешный ответ — `201 Created`**

Backend устанавливает cookie `access_token` с атрибутами `HttpOnly`, `SameSite=Lax` и `Path=/`. Токен не возвращается в JSON.

```json
{
  "user": {
    "id": "...",
    "firstName": "Алексей",
    "lastName": "Иванов",
    "email": "director@example.com",
    "role": "director",
    "companyId": null
  },
  "nextStep": "create_company"
}
```

### `POST /api/auth/login`

Проверяет email и пароль, устанавливает cookie авторизации и возвращает данные пользователя.

### `GET /api/auth/me`

Проверяет cookie авторизации и возвращает данные текущего пользователя и его компании, если она есть.

### `POST /api/auth/logout`

Завершает сессию и очищает cookie авторизации.
