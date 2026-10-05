export type SidebarIconName =
    | 'home'
    | 'operations'
    | 'stores'
    | 'balance'
    | 'documents'
    | 'events'
    | 'documentation'
    | 'company'
    | 'users';
export interface SidebarItemData {
    id: string;
    label: string;
    href: string;
    icon: SidebarIconName;
}
export interface SidebarCategoryData {
    id: string;
    label: string;
    items: SidebarItemData[];
}
