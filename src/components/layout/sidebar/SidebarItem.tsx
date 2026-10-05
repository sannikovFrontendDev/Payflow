import type {SidebarItemData} from "./Sidebar.types.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBookOpen,
    faBuilding,
    faFileLines,
    faHouse,
    faList,
    faScroll,
    faStore,
    faUsers,
    faWallet,
} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router";

interface SidebarItemProps {
    itemData: SidebarItemData;
}

const sidebarIcons = {
    home: faHouse,
    operations: faList,
    stores: faStore,
    balance: faWallet,
    documents: faFileLines,
    events: faScroll,
    documentation: faBookOpen,
    company: faBuilding,
    users: faUsers,
}

function SidebarItem({ itemData }: SidebarItemProps) {
    return (
        <>
            <li className="sidebar-item">
                <NavLink
                    to={itemData.href}
                    className={({ isActive }) => isActive
                        ? "is-active sidebar-item__wrapper"
                        : "sidebar-item__wrapper"}
                >
                    <span className="sidebar-item__icon">
                        <FontAwesomeIcon icon={sidebarIcons[itemData.icon]}/>
                    </span>
                    <span className="sidebar-item__label">
                        {itemData.label}
                    </span>
                </NavLink>
            </li>
        </>
    )
}

export default SidebarItem;
