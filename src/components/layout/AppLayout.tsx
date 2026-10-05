import type { ReactNode } from "react"

import Header from "./Header.tsx";
import Sidebar from "./sidebar/Sidebar.tsx";

import './AppLayout.scss';

type AppLayoutProps = {
    children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <div className="app-layout">
                <header className="app-layout__header">
                    <Header />
                </header>
                <div className="app-layout__wrapper">
                    <aside className="app-layout__sidebar">
                        <Sidebar />
                    </aside>
                    <main className="app-layout__main">{children}</main>
                </div>
            </div>
        </>
    )
}

export default AppLayout;