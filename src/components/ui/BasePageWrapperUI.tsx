import type { ReactNode } from "react";
import BreadcrumbsUI from "@/components/ui/BreadcrumbsUI.tsx";
import { cn } from "@/lib/utils";

interface BasePageWrapperProps {
    title: string;
    description?: string;
    descriptionClassName?: string;
    showBreadcrumbs?: boolean;
    children?: ReactNode;
}

function BasePageWrapperUI({ title, description, descriptionClassName, showBreadcrumbs = false, children }: BasePageWrapperProps) {
    return (
        <div className="mx-auto flex w-full flex-col gap-4 px-6 py-6">
            <header className="flex flex-col gap-2">
                {showBreadcrumbs && <BreadcrumbsUI />}
                <h1 className="text-2xl font-semibold tracking-tight sm:text-[2rem] sm:leading-10">{title}</h1>
                {description && <p className={cn("text-base text-muted-foreground sm:text-lg sm:leading-7", descriptionClassName)}>{description}</p>}
            </header>

            {children}
        </div>
    )
}

export default BasePageWrapperUI;
