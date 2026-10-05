import type { SidebarCategoryData } from "./Sidebar.types.ts";

export const sidebarMockData: SidebarCategoryData[] = [
    {
        id: "work",
        label: "Work",
        items: [
            { id: "home", label: "Home", href: "/", icon: "home" },
            { id: "operations", label: "Operations", href: "/operations", icon: "operations" },
            { id: "stores", label: "Stores", href: "/stores", icon: "stores" },
        ],
    },
    {
        id: "money",
        label: "Money",
        items: [
            { id: "balance", label: "Payouts & balance", href: "/balance", icon: "balance" },
            { id: "documents", label: "Documents", href: "/documents", icon: "documents" },
        ],
    },
    {
        id: "developers",
        label: "For developers",
        items: [
            { id: "events", label: "Event log", href: "/events", icon: "events" },
            { id: "documentation", label: "Documentation", href: "/documentation", icon: "documentation" },
        ],
    },
    {
        id: "company",
        label: "Company",
        items: [
            { id: "company-data", label: "Company details", href: "/company", icon: "company" },
            { id: "users", label: "Users", href: "/users", icon: "users" },
        ],
    },
];
