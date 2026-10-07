import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react";

type BadgeType = "info" | "warning" | "success" | "error";

interface BadgeProps {
    type: BadgeType;
    text: string;
}

const badgeStyles: Record<BadgeType, { icon: typeof Info; className: string }> = {
    info: { icon: Info, className: "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200" },
    warning: { icon: TriangleAlert, className: "border-amber-200 bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200" },
    success: { icon: CircleCheck, className: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200" },
    error: { icon: CircleX, className: "border-red-200 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200" },
};

function BadgeUI({ type, text }: BadgeProps) {
    const { icon: Icon, className } = badgeStyles[type];

    return (
        <Badge variant="outline" className={className}>
            <Icon data-icon="inline-start" aria-hidden="true" />
            {text}
        </Badge>
    );
}

export default BadgeUI;
