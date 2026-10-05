import type { SidebarCategoryData } from "./Sidebar.types.ts";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import SidebarCategory from "./SidebarCategory.tsx";
import "./Sidebar.scss";


const categories: SidebarCategoryData[] = [
    {
        id: 'work',
        label: 'Работа',
        items: [
            {
                id: 'home',
                label: 'Главная',
                href: '/',
                icon: 'home'
            },
            {
                id: 'operation',
                label: 'Операции',
                href: '/',
                icon: 'home'
            },
        ],
    }
];

function Sidebar() {
    const [activeItemId, setActiveItemId] = useState("home");
    return (
        <>
            <nav aria-label="Основная навигация" className="sidebar">
                <div className="sidebar__collapse-icon">
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                {categories.map((category) => (
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