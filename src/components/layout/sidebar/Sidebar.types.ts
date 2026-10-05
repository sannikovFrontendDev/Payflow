export type SidebarIconName = 'home';
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