import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import SidebarCategory from "./SidebarCategory.tsx";
import { sidebarMockData } from "./Sidebar.mock.ts";
import "./Sidebar.scss";

function Sidebar() {
    const [activeItemId, setActiveItemId] = useState("home");
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <>
            <nav
                aria-label="Основная навигация"
                className={isCollapsed ? "is-collapsed sidebar" : "sidebar"}
            >
                <div
                    className="sidebar__collapse-icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                {sidebarMockData.map((category) => (
                    <SidebarCategory
                        key={category.id}
                        category={category}
                        activeItemId={activeItemId}
                        onSelect={setActiveItemId}
                    />
                ))}
            </nav>
        </>
    )
}

export default Sidebar;
