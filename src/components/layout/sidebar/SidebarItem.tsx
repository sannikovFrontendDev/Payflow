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

interface SidebarItemProps {
    itemData: SidebarItemData;
    isActive: boolean;
    onSelect: () => void;
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

function SidebarItem({ itemData, isActive, onSelect }: SidebarItemProps) {
    return (
        <>
            <li className={isActive ? "sidebar-item is-active" : "sidebar-item"}>
                <button
                    type="button"
                    className="sidebar-item__wrapper"
                    onClick={onSelect}
                >
                    <div className="sidebar-item__icon">
                        <FontAwesomeIcon icon={sidebarIcons[itemData.icon]}/>
                    </div>
                    <div className="sidebar-item__label">
                        {itemData.label}
                    </div>
                </button>
            </li>
        </>
    )
}

export default SidebarItem;
