import { CircleCheck, FileSpreadsheet, Plus } from "lucide-react";
import { Link } from "react-router";
import BasePageWrapperUI from "@/components/ui/BasePageWrapperUI.tsx";
import StepperUI from "@/components/ui/StepperUI.tsx";
import type { StepperStep } from "@/components/ui/StepperUI.mock.ts";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";

const applicationSteps: StepperStep[] = [
    { id: "company", title: "Данные компании", description: "Готово", status: "completed" },
    { id: "signatory", title: "Подписант и контакты", description: "Готово", status: "completed" },
    { id: "payout-accounts", title: "Счета для выплат", description: "Заполняете сейчас", status: "current" },
    { id: "review", title: "Проверка данных", description: "Дальше", status: "upcoming" },
];

function CompanyApplicationPayoutAccountsPage() {
    return (
        <BasePageWrapperUI
            title="Счета для выплат"
            description="Шаг 3 из 4. Банк подтянем по БИК. Если услуги оплачиваются на разные счета — добавьте каждый."
            descriptionClassName="max-w-[720px]"
            showBreadcrumbs
        >
            <div className="grid items-start gap-4 lg:grid-cols-[277px_minmax(0,1fr)]">
                <Card className="gap-4 py-6">
                    <CardHeader className="px-6">
                        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Шаги анкеты</h2>
                    </CardHeader>
                    <CardContent className="px-6">
                        <StepperUI data={applicationSteps} orientation="vertical" />
                    </CardContent>
                </Card>

                <div className="flex min-w-0 flex-col gap-4">
                    <Card className="gap-4 py-6">
                        <CardHeader className="px-6">
                            <div className="grid gap-1">
                                <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Реквизиты счетов</h2>
                                <p className="text-xs leading-4 text-muted-foreground">
                                    Если услуги оплачиваются на разные счета — добавьте каждый. Банк и корреспондентский счёт подставит справочник ЦБ по БИК.
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent className="px-6">
                            <div className="border-t" />
                            <section className="flex flex-col gap-4 py-4">
                                <h3 className="text-sm font-medium leading-5">Новый счёт</h3>

                                <div className="flex max-w-md flex-col gap-2">
                                    <StaticField label="Услуга / описание" value="Например, разработка сайтов" />
                                    <p className="text-xs leading-4 text-muted-foreground">По желанию, если счёт один</p>
                                </div>

                                <div className="flex max-w-md flex-col gap-2">
                                    <StaticField label="БИК" value="044525225" filled />
                                    <div className="flex items-center gap-2 text-sm leading-5">
                                        <CircleCheck className="size-4 shrink-0 text-primary" aria-hidden="true" />
                                        <span>Банк найден в справочнике ЦБ</span>
                                    </div>
                                    <p className="text-sm leading-5 text-muted-foreground">
                                        ПАО Сбербанк · к/с 30101 810 4 0000 0000225 · Москва
                                    </p>
                                </div>

                                <div className="flex max-w-md flex-col gap-2">
                                    <StaticField label="Расчётный счёт" value="20 цифр" />
                                    <p className="text-xs leading-4 text-muted-foreground">
                                        Двадцать цифр, после пятой — 810 для рублёвого счёта
                                    </p>
                                </div>
                            </section>
                            <div className="border-t" />

                            <div className="flex flex-col gap-2 pt-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <Button type="button" variant="secondary" className="h-12 px-5">
                                        <Plus aria-hidden="true" />
                                        Добавить ещё счёт
                                    </Button>
                                    <Button type="button" variant="secondary" className="h-12 px-5">
                                        <FileSpreadsheet aria-hidden="true" />
                                        Загрузить из Excel
                                    </Button>
                                    <Button type="button" variant="link" className="h-auto p-0 text-sm">
                                        Скачать шаблон
                                    </Button>
                                </div>
                                <p className="text-xs leading-4 text-muted-foreground">
                                    Таблица .xlsx: в строке — услуга, БИК и расчётный счёт. Распознаем и подставим, проверьте перед отправкой.
                                </p>
                                <p className="max-w-[720px] text-xs leading-4 text-muted-foreground">
                                    Имя владельца счёта в банке сверили с наименованием из анкеты автоматически. Не совпало бы — сказали бы здесь, а не на первой выплате.
                                </p>
                                <p className="max-w-[720px] text-xs leading-4 text-muted-foreground">
                                    Какой счёт для какого магазина — выберете в карточке магазина. Сроки и комиссия — в договоре.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <Button asChild variant="secondary" className="h-12 px-6">
                            <Link to="/company/application/signatory">Назад</Link>
                        </Button>
                        <Button asChild className="h-12 px-6">
                            <Link to="/company/application/review">Сохранить и продолжить</Link>
                        </Button>
                        <p className="text-xs text-muted-foreground">Черновик сохраняется сам</p>
                    </div>
                </div>
            </div>
        </BasePageWrapperUI>
    );
}

function StaticField({ label, value, filled = false }: { label: string; value: string; filled?: boolean }) {
    return (
        <div className="flex h-12 min-w-0 flex-col justify-center rounded-xl bg-muted px-4">
            <p className="text-[10px] leading-4 text-muted-foreground">{label}</p>
            <p className={`truncate text-xs leading-4 ${filled ? "text-foreground" : "text-muted-foreground"}`}>{value}</p>
        </div>
    );
}

export default CompanyApplicationPayoutAccountsPage;
