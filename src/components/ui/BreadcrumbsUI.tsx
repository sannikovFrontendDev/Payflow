import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router";

const breadcrumbRoutes: Record<string, { parentLabel: string; parentPath: string; currentLabel: string }> = {
    "/company/application": {
        parentLabel: "Данные компании",
        parentPath: "/company",
        currentLabel: "Анкета",
    },
    "/company/application/signatory": {
        parentLabel: "Данные компании",
        parentPath: "/company",
        currentLabel: "Анкета",
    },
    "/company/application/payout-accounts": {
        parentLabel: "Данные компании",
        parentPath: "/company",
        currentLabel: "Анкета",
    },
    "/company/application/review": {
        parentLabel: "Данные компании",
        parentPath: "/company",
        currentLabel: "Анкета",
    },
};

function BreadcrumbsUI() {
    const { pathname } = useLocation();
    const route = breadcrumbRoutes[pathname];

    if (!route) return null;

    return (
        <nav aria-label="Хлебные крошки">
            <ol className="flex items-center gap-2 text-xs leading-4">
                <li>
                    <Link className="text-primary hover:underline" to={route.parentPath}>
                        {route.parentLabel}
                    </Link>
                </li>
                <li aria-hidden="true">
                    <ChevronRight className="size-4 text-muted-foreground" />
                </li>
                <li aria-current="page" className="text-foreground">
                    {route.currentLabel}
                </li>
            </ol>
        </nav>
    );
}

export default BreadcrumbsUI;
