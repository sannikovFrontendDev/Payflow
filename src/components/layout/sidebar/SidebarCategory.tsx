import type {SidebarCategoryData} from "./Sidebar.types.ts";
import SidebarItem from "./SidebarItem.tsx";

interface SidebarCategoriesProps {
    category: SidebarCategoryData;
    activeItemId: string;
    onSelect: (itemId: string) => void;
}

function SidebarCategory({category, activeItemId, onSelect}: SidebarCategoriesProps) {
    return (
        <>
            <section className="sidebar-category" aria-labelledby={category.id}>
                <h2 className="sidebar-category__label" id={category.id}>{category.label}</h2>
                <ul className="sidebar-item-list">
                    {category.items.map((item) => (
                        <SidebarItem
                            key={item.id}
                            itemData={item}
                            isActive={item.id === activeItemId}
                            onSelect={() => onSelect(item.id)}
                        />
                    ))}
                </ul>
            </section>
        </>
    )
}

export default SidebarCategory;