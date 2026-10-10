export const USER_ROLE = {
    DIRECTOR: "director",
    USER: "user",
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];