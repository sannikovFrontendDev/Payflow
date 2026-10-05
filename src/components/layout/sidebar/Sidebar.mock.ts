import type { SidebarCategoryData } from "./Sidebar.types.ts";

export const sidebarMockData: SidebarCategoryData[] = [
    {
        id: "work",
        label: "Работа",
        items: [
            { id: "home", label: "Главная", href: "/", icon: "home" },
            { id: "operations", label: "Операции", href: "/operations", icon: "operations" },
            { id: "stores", label: "Магазины", href: "/stores", icon: "stores" },
        ],
    },
    {
        id: "money",
        label: "Деньги",
        items: [
            { id: "balance", label: "Выплаты и баланс", href: "/balance", icon: "balance" },
            { id: "documents", label: "Документы", href: "/documents", icon: "documents" },
        ],
    },
    {
        id: "developers",
        label: "Разработчикам",
        items: [
            { id: "events", label: "Журнал событий", href: "/events", icon: "events" },
            { id: "documentation", label: "Документация", href: "/documentation", icon: "documentation" },
        ],
    },
    {
        id: "company",
        label: "Компания",
        items: [
            { id: "company-data", label: "Данные компании", href: "/company", icon: "company" },
            { id: "users", label: "Пользователи", href: "/users", icon: "users" },
        ],
    },
];
