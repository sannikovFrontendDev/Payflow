import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router";
import { APP_ROUTES } from "@/app/routes.constants.ts";

const breadcrumbRoutes: Record<string, { parentLabel: string; parentPath: string; currentLabel: string }> = {
    [APP_ROUTES.storeDetails]: {
        parentLabel: "Магазины",
        parentPath: APP_ROUTES.stores,
        currentLabel: "Сайт студии",
    },
    [APP_ROUTES.companyApplication]: {
        parentLabel: "Данные компании",
        parentPath: APP_ROUTES.company,
        currentLabel: "Анкета",
    },
    [APP_ROUTES.companyApplicationSignatory]: {
        parentLabel: "Данные компании",
        parentPath: APP_ROUTES.company,
        currentLabel: "Анкета",
    },
    [APP_ROUTES.companyApplicationPayoutAccounts]: {
        parentLabel: "Данные компании",
        parentPath: APP_ROUTES.company,
        currentLabel: "Анкета",
    },
    [APP_ROUTES.companyApplicationReview]: {
        parentLabel: "Данные компании",
        parentPath: APP_ROUTES.company,
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
