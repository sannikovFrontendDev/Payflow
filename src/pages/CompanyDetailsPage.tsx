import { CircleDashed } from "lucide-react";
import { Link } from "react-router";
import BasePageWrapperUI from "@/components/ui/BasePageWrapperUI.tsx";
import BadgeUI from "@/components/ui/BadgeUI.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import StepperUI from "@/components/ui/StepperUI.tsx";
import type { StepperStep } from "@/components/ui/StepperUI.mock.ts";

const companySteps: StepperStep[] = [
    { id: "registration", title: "Регистрация", description: "Вы · 20 сентября", status: "completed" },
    { id: "questionnaire", title: "Анкета", description: "Вы · отправлена 22 сентября", status: "completed" },
    { id: "verification", title: "Проверка", description: "Банк · до 25 сентября", status: "current" },
    { id: "agreement", title: "Договор", description: "Вы", status: "upcoming" },
];

const pendingTasks = [
    {
        title: "Настроить отправку чеков",
        description: "Онлайн-касса подключается за один вечер",
        action: "Настроить",
    },
    {
        title: "Собрать интеграцию на тестовых ключах",
        description: "Ключи лежат в карточке магазина",
        action: "Открыть документацию",
    },
    {
        title: "Пригласить бухгалтера",
        description: "Доступ только к документам и выплатам",
        action: "Пригласить",
    },
];

const companyDetails = [
    ["Компания", "ООО «Ромашка Диджитал»"],
    ["ИНН", "7714041000"],
    ["Вид деятельности", "Разработка и поддержка сайтов"],
    ["Счёт для выплат", "•••• 2345"],
];

function CompanyDetailsPage() {
    return (
        <BasePageWrapperUI
            title="Данные компании"
            description="Анкета ушла в банк 22 сентября."
        >
            <Card>
                <CardHeader className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
                    <div className="min-w-0 flex flex-col gap-2 flex-1 space-y-3">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl font-semibold tracking-tight">Банк проверяет анкету</h2>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                <BadgeUI type="info" text="На проверке" />
                                <span aria-hidden="true">·</span>
                                <span>Отправлена 22 сентября</span>
                            </div>
                        </div>
                        <div className="space-y-0.5 text-sm leading-6 text-muted-foreground">
                            <p>Если всё в порядке — пришлём договор на подпись.</p>
                            <p>Если найдём неточности — попросим исправить, это не отказ.</p>
                            <p>Если понадобятся документы — напишем, какие именно.</p>
                        </div>
                    </div>
                    <Button asChild variant="link" className="h-auto p-0 text-base">
                        <Link to="/company/application">Посмотреть анкету</Link>
                    </Button>
                </CardHeader>

                <CardContent className="flex flex-wrap gap-4">
                    <Fact label="Ответ до" value="25 сентября" />
                    <Fact label="Сейчас действует" value="Банк" />
                </CardContent>

                <CardContent>
                    <div className="-mx-4 border-t" aria-hidden="true" />
                    <div style={{ paddingTop: 24 }}>
                        <StepperUI data={companySteps} />
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 grid-cols-[0.9fr_auto]">
                <Card>
                    <CardHeader>
                        <div className="grid gap-1">
                            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">А пока можно</h2>
                            <p className="text-sm text-muted-foreground">
                                Эти дела не зависят от ответа банка — их можно закрыть сегодня.
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ul className="divide-y divide-border border-t">
                            {pendingTasks.map((task) => (
                                <li className="flex min-h-16 items-center gap-3 py-3" key={task.title}>
                                    <CircleDashed className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium">{task.title}</p>
                                        <p className="text-sm text-muted-foreground">{task.description}</p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        className="h-auto whitespace-normal px-3 py-3 text-center"
                                    >
                                        {task.action}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Реквизиты компании</h2>
                    </CardHeader>
                    <CardContent>
                        <dl>
                            {companyDetails.map(([label, value]) => (
                                <div className="flex items-start justify-between gap-4 border-b py-3 last:border-b-0" key={label}>
                                    <dt className="text-xs leading-5 text-muted-foreground">{label}</dt>
                                    <dd className="max-w-[70%] text-right text-sm leading-5">{value}</dd>
                                </div>
                            ))}
                        </dl>
                        <div className="mt-4 border-t pt-3">
                            <Button type="button" variant="link" className="h-auto p-0 text-sm">
                                Отозвать анкету
                            </Button>
                            <p className="mt-1 text-xs leading-4 text-muted-foreground">
                                Данные останутся черновиком — можно вернуться и отправить снова.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </BasePageWrapperUI>
    );
}

function Fact({ label, value }: { label: string; value: string }) {
    return (
        <dl className="space-y-1">
            <dt className="text-xs leading-4 text-muted-foreground">{label}</dt>
            <dd className="text-base font-medium leading-6">{value}</dd>
        </dl>
    );
}

export default CompanyDetailsPage;
