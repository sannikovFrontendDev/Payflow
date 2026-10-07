import {
    BookOpen,
    Building,
    FileText,
    House,
    List,
    ScrollText,
    Store,
    Users,
    Wallet,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import type { SidebarItemData } from "./Sidebar.types.ts";

interface SidebarItemProps {
    itemData: SidebarItemData;
}

const sidebarIcons = {
    home: House,
    operations: List,
    stores: Store,
    balance: Wallet,
    documents: FileText,
    events: ScrollText,
    documentation: BookOpen,
    company: Building,
    users: Users,
};

function SidebarItem({ itemData }: SidebarItemProps) {
    const Icon = sidebarIcons[itemData.icon];
    const { pathname } = useLocation();

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={pathname === itemData.href || (itemData.href !== "/" && pathname.startsWith(`${itemData.href}/`))}
                tooltip={itemData.label}
            >
                <NavLink to={itemData.href} end>
                    <Icon aria-hidden="true" />
                    <span>{itemData.label}</span>
                </NavLink>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

export default SidebarItem;
