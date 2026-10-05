import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import SidebarCategory from "./SidebarCategory.tsx";
import { sidebarMockData } from "./Sidebar.mock.ts";
import "./Sidebar.scss";

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <>
            <nav
                id="main-navigation"
                aria-label="Main navigation"
                className={isCollapsed ? "is-collapsed sidebar" : "sidebar"}
            >
                <button
                    type="button"
                    aria-expanded={!isCollapsed}
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="sidebar__collapse-icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                {sidebarMockData.map((category) => (
                    <SidebarCategory
                        key={category.id}
                        category={category}
                    />
                ))}
            </nav>
        </>
    )
}

export default Sidebar;
