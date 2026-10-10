import type { SidebarCategoryData } from "./Sidebar.types.ts";
import { APP_ROUTES } from "@/app/routes.constants.ts";

export const sidebarMockData: SidebarCategoryData[] = [
    {
        id: "work",
        label: "Работа",
        items: [
            { id: "home", label: "Главная", href: APP_ROUTES.home, icon: "home" },
            { id: "operations", label: "Операции", href: APP_ROUTES.operations, icon: "operations" },
            { id: "stores", label: "Магазины", href: APP_ROUTES.stores, icon: "stores" },
        ],
    },
    {
        id: "money",
        label: "Деньги",
        items: [
            { id: "balance", label: "Выплаты и баланс", href: APP_ROUTES.balance, icon: "balance" },
            { id: "documents", label: "Документы", href: APP_ROUTES.documents, icon: "documents" },
        ],
    },
    {
        id: "developers",
        label: "Разработчикам",
        items: [
            { id: "events", label: "Журнал событий", href: APP_ROUTES.events, icon: "events" },
            { id: "documentation", label: "Документация", href: APP_ROUTES.documentation, icon: "documentation" },
        ],
    },
    {
        id: "company",
        label: "Компания",
        items: [
            { id: "company-data", label: "Данные компании", href: APP_ROUTES.company, icon: "company" },
            { id: "users", label: "Пользователи", href: APP_ROUTES.users, icon: "users" },
        ],
    },
];
