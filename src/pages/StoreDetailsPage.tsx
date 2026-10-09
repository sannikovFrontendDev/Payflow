import { Copy, Eye, TriangleAlert } from "lucide-react";
import BasePageWrapperUI from "@/components/ui/BasePageWrapperUI.tsx";
import BadgeUI from "@/components/ui/BadgeUI.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";

const testCards = [
    ["4111 1111 1111 1111", "Платёж пройдёт"],
    ["4000 0000 0000 0002", "Отказ: недостаточно средств"],
    ["4000 0000 0000 0069", "Отказ: не пройден 3-D Secure"],
] as const;

function StoreDetailsPage() {
    return (
        <BasePageWrapperUI title="Сайт студии" showBreadcrumbs>
            <div className="-mt-2 flex flex-wrap items-center gap-2 text-xs leading-4 text-muted-foreground">
                <BadgeUI type="warning" text="Сайт не проверен" />
                <span aria-hidden="true">·</span>
                <span>romashka-digital.ru · создан 20 сентября</span>
            </div>

            <Card className="gap-4 py-6">
                <CardHeader className="px-6">
                    <div className="grid gap-1">
                        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Проверка сайта</h2>
                        <p className="text-xs leading-4 text-muted-foreground">Банк проверит сайт и выдаст боевые ключи</p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 px-6">
                    <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-3 text-amber-900">
                        <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-700" aria-hidden="true" />
                        <div className="min-w-0">
                            <p className="text-sm font-medium leading-5">Не выполнено требований: 1</p>
                            <p className="text-xs leading-4 text-muted-foreground">
                                Банк вернёт сайт, если не исправить. Можно отправить и так.
                            </p>
                            <Button type="button" variant="link" className="mt-1 h-auto p-0 text-sm">
                                Посмотреть
                            </Button>
                        </div>
                    </div>

                    <Button type="button" className="h-12 px-6">Отправить сайт на проверку</Button>
                    <p className="text-sm leading-5 text-muted-foreground">
                        Сайт проверяет банк — до двух рабочих дней, о результате напишем на ivan@romashka-digital.ru.
                    </p>
                </CardContent>
            </Card>

            <Card className="gap-4 py-6">
                <CardHeader className="px-6">
                    <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Ключи</h2>
                </CardHeader>
                <CardContent className="space-y-4 px-6">
                    <p className="text-sm leading-5 text-muted-foreground">
                        Тестовый режим: платежи проходят на тестовых картах, деньги не списываются.
                    </p>

                    <div className="space-y-2">
                        <KeyField label="Публичный ключ" value="pk_test_a3pay_8f21c4d9" action="Копировать" icon="copy" />
                        <KeyField label="Секретный ключ" value="sk_test_••••••••••••4c7e" action="Показать" icon="show" />
                        <div className="space-y-1">
                            <div className="flex h-12 flex-col justify-center rounded-xl bg-muted px-4 opacity-50">
                                <p className="text-xs leading-4 text-muted-foreground">Боевые ключи</p>
                                <p className="text-sm leading-5 text-muted-foreground">Появятся после проверки сайта</p>
                            </div>
                            <p className="text-xs leading-4 text-muted-foreground opacity-50">
                                Выдадим, когда банк примет сайт.
                            </p>
                        </div>
                    </div>

                    <Button type="button" variant="secondary" className="h-12 px-6">
                        Провести тестовый платёж
                    </Button>

                    <div>
                        <h3 className="mb-1 text-[10px] font-medium uppercase leading-3 tracking-[1.2px] text-muted-foreground">
                            Тестовые карты
                        </h3>
                        <ul className="divide-y divide-border">
                            {testCards.map(([number, result]) => (
                                <li className="flex min-h-12 flex-wrap items-center gap-x-6 gap-y-2 py-3" key={number}>
                                    <span className="w-44 shrink-0 text-sm leading-5 text-muted-foreground">{number}</span>
                                    <span className="min-w-0 flex-1 text-sm leading-5">{result}</span>
                                    <Button type="button" variant="link" className="h-auto shrink-0 p-0 text-sm">
                                        <Copy data-icon="inline-start" aria-hidden="true" />
                                        Копировать
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </BasePageWrapperUI>
    );
}

function KeyField({
    label,
    value,
    action,
    icon,
}: {
    label: string;
    value: string;
    action: string;
    icon: "copy" | "show";
}) {
    const ActionIcon = icon === "copy" ? Copy : Eye;

    return (
        <div className="flex min-h-12 items-center justify-between gap-3 rounded-xl bg-muted px-4">
            <div className="min-w-0">
                <p className="text-xs leading-4 text-muted-foreground">{label}</p>
                <p className="truncate text-sm leading-5">{value}</p>
            </div>
            <Button type="button" variant="link" className="h-auto shrink-0 gap-1.5 p-0 text-sm">
                <ActionIcon aria-hidden="true" />
                {action}
            </Button>
        </div>
    );
}

export default StoreDetailsPage;
