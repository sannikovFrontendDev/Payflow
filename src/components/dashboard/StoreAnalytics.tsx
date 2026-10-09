import type { ReactNode } from "react";
import { ArrowUpRight, CalendarDays, CheckCircle2, ChevronDown, CircleX } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const metrics = [
    { label: "Оборот за 30 дней", value: "1 284 600 ₽" },
    { label: "Операции", value: "312" },
    { label: "Доля успешных", value: "94,2 %" },
    { label: "Средний чек", value: "4 369 ₽" },
];

const stores = [
    { name: "Сайт студии", site: "romashka-digital.ru", status: "Принимает платежи", mode: "Боевой режим", turnover: "1 046 400 ₽", active: true },
    { name: "Поддержка сайтов", site: "support.romashka-digital.ru", status: "Принимает платежи", mode: "Боевой режим", turnover: "138 200 ₽", active: true },
    { name: "Магазин шаблонов", site: "market.romashka-digital.ru", status: "Проверяем сайт", mode: "Тестовый режим", turnover: "100 000 ₽", active: false },
];

const operations = [
    { date: "9 ноя, 14:32", amount: "4 900 ₽", status: "Успешно", method: "Карта", store: "Сайт студии", tone: "success" },
    { date: "9 ноя, 13:05", amount: "12 000 ₽", status: "Успешно", method: "СБП", store: "Сайт студии", tone: "success" },
    { date: "9 ноя, 11:47", amount: "3 500 ₽", status: "Отказ банка", method: "Карта", store: "Поддержка сайтов", tone: "error" },
    { date: "9 ноя, 10:12", amount: "4 900 ₽", status: "Успешно", method: "Карта", store: "Сайт студии", tone: "success" },
    { date: "8 ноя, 19:58", amount: "24 000 ₽", status: "Возврат", method: "СБП", store: "Сайт студии", tone: "info" },
];

function StoreAnalytics() {
    return (
        <div className="mx-auto flex w-full flex-col gap-4 px-6 py-6">
            <header className="grid gap-2">
                <h1 className="text-2xl font-semibold tracking-tight sm:text-[2rem] sm:leading-10">Здравствуйте, Иван</h1>
                <p className="text-sm text-muted-foreground sm:text-base">
                    У компании три магазина: два принимают платежи, третий на проверке.<br className="hidden sm:block" />
                    Ниже — сумма по всем за 30 дней.
                </p>
            </header>

            <div className="flex flex-wrap items-center gap-2">
                <FilterButton>Все магазины</FilterButton>
                <FilterButton><CalendarDays aria-hidden="true" />30 дней</FilterButton>
                <span className="text-xs text-muted-foreground sm:text-sm">11 октября — 9 ноября</span>
            </div>

            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Сводка за период">
                {metrics.map((metric) => (
                    <Card key={metric.label} className="gap-2 py-4">
                        <CardContent className="grid gap-1">
                            <p className="text-xs text-muted-foreground">{metric.label}</p>
                            <p className="text-2xl font-semibold tracking-tight">{metric.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </section>

            <Card>
                <CardHeader className="gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                    <div className="grid gap-1">
                        <h2 className="text-lg font-semibold tracking-tight">Магазины</h2>
                        <p className="text-sm text-muted-foreground">
                            Сумма на главной складывается из этих строк. Анкета, договор и счёт для выплат у магазинов общие.
                        </p>
                    </div>
                    <Button variant="link" asChild className="h-auto justify-self-start p-0 text-xs sm:justify-self-end">
                        <Link to="/stores">Открыть раздел магазинов <ArrowUpRight aria-hidden="true" /></Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left text-xs">
                            <thead className="text-[10px] uppercase tracking-wide text-muted-foreground">
                                <tr className="border-b">
                                    <th className="pb-2 pr-4 font-medium">Магазин</th>
                                    <th className="pb-2 pr-4 font-medium">Сайт</th>
                                    <th className="pb-2 pr-4 font-medium">Статус</th>
                                    <th className="pb-2 pr-4 font-medium">Режим</th>
                                    <th className="pb-2 text-right font-medium">Оборот за 30 дней</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {stores.map((store) => (
                                    <tr key={store.name}>
                                        <td className="py-3 pr-4 font-medium">{store.name}</td>
                                        <td className="py-3 pr-4 text-muted-foreground">{store.site}</td>
                                        <td className="py-3 pr-4">
                                            <StatusPill active={store.active}>{store.status}</StatusPill>
                                        </td>
                                        <td className="py-3 pr-4 text-muted-foreground">{store.mode}</td>
                                        <td className="py-3 text-right font-medium tabular-nums">{store.turnover}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={4} className="pt-3 text-muted-foreground">Итого · 312 операций</td>
                                    <td className="pt-3 text-right font-semibold tabular-nums">1 284 600 ₽</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.9fr)]">
                <Card>
                    <CardHeader className="gap-1 sm:grid-cols-[minmax(0,1fr)_auto]">
                        <div className="grid gap-1">
                            <h2 className="text-lg font-semibold tracking-tight">Последние операции</h2>
                            <p className="text-sm text-muted-foreground">Пять последних. Остальные — в разделе «Операции».</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[590px] text-left text-xs">
                                <thead className="text-[10px] uppercase tracking-wide text-muted-foreground">
                                    <tr className="border-b">
                                        <th className="pb-2 pr-3 font-medium">Дата</th>
                                        <th className="pb-2 pr-3 font-medium">Сумма</th>
                                        <th className="pb-2 pr-3 font-medium">Статус</th>
                                        <th className="pb-2 pr-3 font-medium">Способ</th>
                                        <th className="pb-2 font-medium">Магазин</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {operations.map((operation, index) => (
                                        <tr key={`${operation.date}-${index}`}>
                                            <td className="py-2.5 pr-3 whitespace-nowrap text-muted-foreground">{operation.date}</td>
                                            <td className="py-2.5 pr-3 whitespace-nowrap font-medium tabular-nums">{operation.amount}</td>
                                            <td className="py-2.5 pr-3"><OperationStatus status={operation.status} tone={operation.tone} /></td>
                                            <td className="py-2.5 pr-3 text-muted-foreground">{operation.method}</td>
                                            <td className="py-2.5 whitespace-nowrap">{operation.store}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Button variant="link" asChild className="mt-3 h-auto p-0 text-xs">
                            <Link to="/operations">Все операции <ArrowUpRight aria-hidden="true" /></Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="gap-1">
                        <h2 className="text-lg font-semibold tracking-tight">Ближайшая выплата</h2>
                        <p className="text-3xl font-semibold tracking-tight">183 390 ₽</p>
                        <p className="text-sm text-muted-foreground">Уйдёт 10 ноября, вторник</p>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        <p className="border-b pb-2 text-xs text-muted-foreground">Период · 9 ноября</p>
                        <PayoutRow label="Сайт студии · 24 операции" value="192 000 ₽" />
                        <PayoutRow label="Поддержка сайтов · 5 операций" value="8 000 ₽" />
                        <PayoutRow label="Комиссия" value="−16 610 ₽" />
                        <PayoutRow label="Счёт" value="•• 4821" />
                        <p className="text-xs leading-5 text-muted-foreground">
                            Отправлено 10 ноября. Срок зачисления зависит от банка получателя. Если выплата задержится, мы напишем на почту.
                        </p>
                        <Button variant="link" asChild className="h-auto justify-self-start p-0 text-xs">
                            <Link to="/balance">Все выплаты <ArrowUpRight aria-hidden="true" /></Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function FilterButton({ children }: { children: ReactNode }) {
    return (
        <Button type="button" variant="outline" className="h-9 gap-2 rounded-lg bg-card px-3 text-xs font-medium shadow-none">
            {children}<ChevronDown aria-hidden="true" className="size-3.5 text-muted-foreground" />
        </Button>
    );
}

function StatusPill({ children, active }: { children: string; active: boolean }) {
    return (
        <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-medium ${active ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>
            {active ? <CheckCircle2 className="size-3" aria-hidden="true" /> : <span className="size-1.5 rounded-full bg-blue-600" aria-hidden="true" />}
            {children}
        </span>
    );
}

function OperationStatus({ status, tone }: { status: string; tone: string }) {
    const Icon = tone === "error" ? CircleX : CheckCircle2;
    const colors = tone === "error" ? "bg-red-50 text-red-700" : tone === "info" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700";

    return (
        <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-medium ${colors}`}>
            <Icon className="size-3" aria-hidden="true" />{status}
        </span>
    );
}

function PayoutRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-3 border-b pb-2 text-xs">
            <span className="text-muted-foreground">{label}</span>
            <span className="shrink-0 font-medium tabular-nums">{value}</span>
        </div>
    );
}

export default StoreAnalytics;
