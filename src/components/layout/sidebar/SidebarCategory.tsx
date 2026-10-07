import type { SidebarCategoryData } from "./Sidebar.types.ts";
import SidebarItem from "./SidebarItem.tsx";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
} from "@/components/ui/sidebar";

interface SidebarCategoriesProps {
    category: SidebarCategoryData;
}

function SidebarCategory({ category }: SidebarCategoriesProps) {
    return (
        <SidebarGroup className="px-0 py-1">
            <SidebarGroupLabel className="px-2 text-[10px] font-medium uppercase tracking-[0.12em] text-sidebar-foreground/60">
                {category.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu className="gap-0.5">
                    {category.items.map((item) => (
                        <SidebarItem key={item.id} itemData={item} />
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

export default SidebarCategory;
