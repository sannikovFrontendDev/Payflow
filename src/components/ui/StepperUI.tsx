import { Circle, CircleCheck, CircleDot } from "lucide-react";
import type { StepperStep } from "@/components/ui/StepperUI.mock";

interface StepperProps {
    data: StepperStep[];
}

const stepStatusLabels = {
    completed: "Завершено",
    current: "Текущий шаг",
    upcoming: "Предстоящий шаг",
} as const;

function StepperUI({ data }: StepperProps) {
    return (
        <ol className="flex w-full gap-3 overflow-x-auto pb-1">
            {data.map((step, index) => {
                const StatusIcon = step.status === "completed"
                    ? CircleCheck
                    : step.status === "current"
                        ? CircleDot
                        : Circle;
                const iconClassName = step.status === "upcoming" ? "text-muted-foreground" : "text-primary";

                return (
                    <li className="flex min-w-32 flex-1 flex-col gap-2" key={step.id}>
                        <div className="flex min-h-5 items-center gap-2">
                            <StatusIcon className={`size-5 shrink-0 ${iconClassName}`} aria-hidden="true" />
                            {index < data.length - 1 && (
                                <div
                                    className={`h-px w-full ${step.status === "completed" ? "bg-primary" : "bg-border"}`}
                                    aria-hidden="true"
                                />
                            )}
                        </div>
                        <div className="flex flex-col items-start">
                            <h3 className={`text-sm font-medium ${step.status === "upcoming" ? "text-muted-foreground" : "text-foreground"}`}>
                                {step.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                            <span className="sr-only">{stepStatusLabels[step.status]}</span>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}

export default StepperUI;
