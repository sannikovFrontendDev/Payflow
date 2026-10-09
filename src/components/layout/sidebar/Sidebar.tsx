import SidebarCategory from "./SidebarCategory.tsx";
import { sidebarMockData } from "./Sidebar.mock.ts";
import {
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarTrigger,
} from "@/components/ui/sidebar";

function Sidebar() {
    return (
        <ShadcnSidebar
            collapsible="icon"
            variant="sidebar"
            layout="flow"
            className="bg-secondary"
        >
            <SidebarContent className="gap-1 overflow-visible rounded-tl-xl bg-secondary px-2">
                <nav aria-label="Основная навигация" className="flex min-h-full flex-col">
                    {sidebarMockData.map((category) => (
                        <SidebarCategory key={category.id} category={category} />
                    ))}
                </nav>
            </SidebarContent>
            <SidebarTrigger
                className="absolute right-0 top-[200px] z-20 -translate-y-1/2 translate-x-1/2 rounded-full border bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground active:not-aria-[haspopup]:-translate-y-1/2 group-data-[collapsible=icon]:-right-2"
                aria-label="Открыть или свернуть меню"
            />
        </ShadcnSidebar>
    );
}

export default Sidebar;
