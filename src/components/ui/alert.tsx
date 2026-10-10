import * as React from "react";
import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

// Перечисляет визуальные и семантические варианты уведомления.
type AlertVariant = "info" | "success" | "warning" | "error";

// Описывает свойства уведомления, кроме role и aria-live, заданных компонентом.
interface AlertProps extends Omit<React.ComponentProps<"div">, "role" | "aria-live"> {
    variant?: AlertVariant;
    title?: string;
}

// Связывает вариант уведомления с иконкой и цветовыми классами.
const alertVariants: Record<AlertVariant, { icon: typeof Info; className: string }> = {
    info: {
        icon: Info,
        className: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100",
    },
    success: {
        icon: CircleCheck,
        className: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100",
    },
    warning: {
        icon: TriangleAlert,
        className: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100",
    },
    error: {
        icon: CircleX,
        className: "border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100",
    },
};

// Отображает уведомление, не управляя тем, когда оно появляется.
function Alert({
    variant = "info",
    title,
    className,
    children,
    ...props
}: AlertProps) {
    const { icon: Icon, className: variantClassName } = alertVariants[variant];
    const role = variant === "error" ? "alert" : "status";
    const ariaLive = variant === "error" ? "assertive" : "polite";

    return (
        <div
            {...props}
            data-slot="alert"
            data-variant={variant}
            role={role}
            aria-live={ariaLive}
            className={cn(
                "col items-start gap-3 rounded-xl border p-4 text-sm",
                variantClassName,
                className,
            )}
        >
            <span className="inline-flex gap-2 items-center">
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                {title && <p className="font-medium">{title}</p>}
            </span>
            {children && <div className="leading-5 mt-1 text-current/90">{children}</div>}
        </div>
    );
}

export { Alert };
