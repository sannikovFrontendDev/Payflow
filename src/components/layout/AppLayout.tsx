import { Outlet } from "react-router";
import Header from "./Header.tsx";
import Sidebar from "./sidebar/Sidebar.tsx";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageLoadingBoundary from "@/components/ui/PageLoadingBoundary.tsx";

function AppLayout() {
    return (
        <TooltipProvider>
            <SidebarProvider className="min-h-svh flex-col">
                <Header />
                <div className="flex flex-1 items-stretch">
                    <Sidebar />
                    <SidebarInset className="min-h-full shadow-none">
                        <section className="min-w-0 flex-1 rounded-tr-xl bg-secondary">
                            <PageLoadingBoundary><Outlet /></PageLoadingBoundary>
                        </section>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </TooltipProvider>
    );
}

export default AppLayout;
