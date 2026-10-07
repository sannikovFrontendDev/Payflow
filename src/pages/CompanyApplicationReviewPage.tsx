import { TriangleAlert } from "lucide-react";
import { Link } from "react-router";
import BasePageWrapperUI from "@/components/ui/BasePageWrapperUI.tsx";
import StepperUI from "@/components/ui/StepperUI.tsx";
import type { StepperStep } from "@/components/ui/StepperUI.mock.ts";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";

const applicationSteps: StepperStep[] = [
    { id: "company", title: "Данные компании", description: "Готово", status: "completed" },
    { id: "signatory", title: "Подписант и контакты", description: "Готово", status: "completed" },
    { id: "payout-accounts", title: "Счета для выплат", description: "Готово", status: "completed" },
    { id: "review", title: "Проверка данных", description: "Заполняете сейчас", status: "current" },
];

const companyFacts: [string, string][] = [
    ["Наименование", "ООО «Ромашка Диджитал»"],
    ["ИНН", "7714041000"],
    ["ОГРН", "1157746093200"],
    ["Юридический адрес", "127051, Москва, улица Садовая-Самотёчная, дом 10, офис 3"],
    ["Вид деятельности", "Разработка и поддержка сайтов"],
];

const peopleFacts: [string, string][] = [
    ["Договор подписывает", "Петров И. С., генеральный директор · по уставу"],
    ["Основной контакт", "Петров Иван Сергеевич, +7 999 300-12-34, ivan@romashka-digital.ru"],
    ["Акты, возвраты, IT", "Тот же, что основной"],
];

const payoutFacts: [string, string][] = [
    ["Разработка сайтов", "ПАО Сбербанк, 40702 810 9 0000 0012345"],
    ["Поддержка сайтов", "АО «ТБанк», 40702 810 7 1000 0067890"],
];

function CompanyApplicationReviewPage() {
    return (
        <BasePageWrapperUI
            title="Проверка данных"
            description="Шаг 4 из 4. Посмотрите, что уйдёт в банк, и отправьте."
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
                    <div className="flex items-start rounded-lg bg-amber-50 text-amber-900" style={{ padding: 12, gap: 8 }}>
                        <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-700" aria-hidden="true" />
                        <div className="min-w-0">
                            <p className="text-xs font-medium leading-4">Не выполнено требований: 1</p>
                            <p className="text-xs leading-4 text-muted-foreground">Банк вернёт сайт, если не исправить. Можно отправить и так.</p>
                            <Button type="button" variant="link" className="mt-1 h-auto p-0 text-xs">Посмотреть</Button>
                        </div>
                    </div>

                    <SummaryCard title="Компания" step="Шаг 1 · данные компании" editTo="/company/application" facts={companyFacts} />

                    <Card className="gap-4 py-6">
                        <CardHeader className="flex flex-row items-start justify-between gap-4 px-6">
                            <SummaryHeading title="Люди" step="Шаг 2 · подписант и контакты" />
                            <Button asChild variant="link" className="h-auto shrink-0 p-0 text-xs">
                                <Link to="/company/application/signatory">Изменить</Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="px-6">
                            <div className="pb-3">
                                <p className="text-sm font-medium">Петров Иван Сергеевич</p>
                                <p className="text-xs leading-4 text-muted-foreground">Руководитель</p>
                                <p className="text-xs leading-4 text-muted-foreground">ИНН 771404123456 · паспорт 45 ** ******</p>
                            </div>
                            <FactRows facts={peopleFacts} />
                        </CardContent>
                    </Card>

                    <SummaryCard title="Счета" step="Шаг 3 · счета для выплат" editTo="/company/application/payout-accounts" facts={payoutFacts} />

                    <Card className="gap-4 py-6">
                        <CardHeader className="px-6">
                            <SummaryHeading
                                title="Подтверждения"
                                step="Подтверждение сведений и два согласия: на обработку данных — обязательное, на письма — по желанию"
                            />
                        </CardHeader>
                        <CardContent className="space-y-2 px-6">
                            <Confirmation
                                title="Сведения в анкете верны"
                                description="Если что-то расходится, оставьте без отметки — попросим уточнение и проверим сами"
                            />
                            <Confirmation
                                title="Согласен на обработку персональных данных"
                                description="Обязательное. Без него анкету не отправить: банк проверяет руководителя и подписанта по 115-ФЗ, а это персональные данные."
                            />
                            <div className="pl-7">
                                <Button type="button" variant="link" className="h-auto p-0 text-sm">Политика обработки данных</Button>
                            </div>
                            <Confirmation
                                title="Хочу получать письма о продукте"
                                description={<>По желанию. Новые способы оплаты и изменения тарифов, не чаще раза в месяц.<br />Отписаться — одной кнопкой в письме.</>}
                            />
                        </CardContent>
                    </Card>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <Button asChild variant="secondary" className="h-12 px-6">
                            <Link to="/company/application/payout-accounts">Назад</Link>
                        </Button>
                        <Button asChild className="h-12 px-6">
                            <Link to="/">Отправить в банк</Link>
                        </Button>
                        <p className="text-xs text-muted-foreground">Проверка занимает до трёх рабочих дней</p>
                    </div>
                </div>
            </div>
        </BasePageWrapperUI>
    );
}

function SummaryCard({ title, step, editTo, facts }: { title: string; step: string; editTo: string; facts: [string, string][] }) {
    return (
        <Card className="gap-4 py-6">
            <CardHeader className="flex flex-row items-start justify-between gap-4 px-6">
                <SummaryHeading title={title} step={step} />
                <Button asChild variant="link" className="h-auto shrink-0 p-0 text-xs">
                    <Link to={editTo}>Изменить</Link>
                </Button>
            </CardHeader>
            <CardContent className="px-6">
                <FactRows facts={facts} />
            </CardContent>
        </Card>
    );
}

function SummaryHeading({ title, step }: { title: string; step: string }) {
    return (
        <div className="grid gap-0.5">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h2>
            <p className="text-xs leading-4 text-muted-foreground">{step}</p>
        </div>
    );
}

function FactRows({ facts }: { facts: [string, string][] }) {
    return (
        <dl>
            {facts.map(([label, value], index) => (
                <div className={`flex min-h-12 items-baseline py-3 ${index < facts.length - 1 ? "border-b" : ""}`} style={{ columnGap: 24 }} key={label}>
                    <dt className="shrink-0 text-xs leading-5 text-muted-foreground" style={{ width: "30%" }}>{label}</dt>
                    <dd className="min-w-0 flex-1 break-words text-sm leading-5">{value}</dd>
                </div>
            ))}
        </dl>
    );
}

function Confirmation({ title, description }: { title: string; description: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3 py-2">
            <span className="mt-0.5 size-4 shrink-0 rounded-sm border border-muted-foreground" aria-hidden="true" />
            <span className="min-w-0">
                <p className="text-sm leading-5">{title}</p>
                <p className="text-xs leading-4 text-muted-foreground">{description}</p>
            </span>
        </div>
    );
}

export default CompanyApplicationReviewPage;
