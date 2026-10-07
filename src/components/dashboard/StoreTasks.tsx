import { Circle, CircleCheck, LockKeyhole } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type StoreTaskStatus = "available" | "locked" | "completed";

const storeTasks: { id: string; title: string; description: string; status: StoreTaskStatus; action?: string }[] = [
    {
        id: "create-store",
        title: "Создать магазин",
        description: "Тестовые ключи — сразу после создания",
        status: "available",
        action: "Создать магазин",
    },
    {
        id: "test-payment",
        title: "Провести тестовый платёж",
        description: "После создания магазина",
        status: "locked",
    },
    {
        id: "website-review",
        title: "Отправить сайт на проверку",
        description: "После договора",
        status: "locked",
    },
    {
        id: "first-payment",
        title: "Получить первую оплату",
        description: "После проверки сайта",
        status: "locked",
    },
];

function StoreTasks() {
    const completedTaskCount = storeTasks.filter((task) => task.status === "completed").length;
    const progress = storeTasks.length === 0 ? 0 : (completedTaskCount / storeTasks.length) * 100;

    return (
        <Card>
            <CardHeader>
                <div className="grid gap-1">
                    <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Задачи магазина</h2>
                    <CardDescription>Не обязательно ждать, пока банк проверит компанию</CardDescription>
                </div>
                <CardAction>
                    <Badge variant="secondary">{completedTaskCount} из {storeTasks.length}</Badge>
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-4">
                <Progress value={progress} aria-label="Выполнение задач магазина" />
                <ul className="divide-y">
                    {storeTasks.map((task) => {
                        const StatusIcon = task.status === "completed"
                            ? CircleCheck
                            : task.status === "locked"
                                ? LockKeyhole
                                : Circle;

                        return (
                            <li className="flex min-h-16 items-center gap-3 py-3" key={task.id}>
                                <StatusIcon
                                    className={`size-5 shrink-0 ${task.status === "locked" ? "text-muted-foreground" : "text-primary"}`}
                                    aria-hidden="true"
                                />
                                <div className="min-w-0 flex-1">
                                    <h3 className={`text-sm font-medium ${task.status === "locked" ? "text-muted-foreground" : "text-foreground"}`}>
                                        {task.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{task.description}</p>
                                </div>
                                {task.action && (
                                    <Button variant="secondary" size="sm" className="h-auto max-w-40 whitespace-normal text-center px-2 py-2">
                                        {task.action}
                                    </Button>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </CardContent>
        </Card>
    );
}

export default StoreTasks;
