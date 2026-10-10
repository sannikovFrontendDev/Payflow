import { Link } from "react-router";
import { APP_ROUTES } from "@/app/routes.constants.ts";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";

const registryFacts = [
    ["Наименование", "ООО «Ромашка Диджитал»"],
    ["ИНН", "7714041000"],
    ["ОГРН", "1157746093200"],
    ["Юридический адрес", "127051, Москва, улица Садовая-Самотёчная, дом 10, офис 3"],
    ["Руководитель", "Петров Иван Сергеевич, генеральный директор"],
    ["ОКВЭД", "62.01 Разработка компьютерного программного обеспечения"],
];

function CompanyApplicationPage() {
    return (
        <div className="flex min-w-0 flex-col gap-4">
            <Card className="gap-4 py-6">
                <CardHeader className="flex flex-row items-start justify-between gap-4 px-6">
                    <div className="grid gap-1">
                        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Пришло из ЕГРЮЛ</h2>
                        <p className="text-xs leading-4 text-muted-foreground">
                            Источник — ФНС, сведения получены 20 сентября
                        </p>
                    </div>
                    <Button type="button" variant="link" className="h-auto shrink-0 p-0 text-xs">
                        Что-то не так?
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4 px-6">
                    <p className="max-w-3xl text-sm leading-5 text-muted-foreground">
                        Эти сведения мы обязаны брать из реестра сами — так требует пункт 2.2 Положения Банка России 499-П. Вам остаётся проверить, что всё сходится
                    </p>
                    <dl>
                        {registryFacts.map(([label, value]) => (
                            <div
                                className="grid grid-cols-1 gap-2 border-b py-3 last:border-b-0 sm:grid-cols-[224px_minmax(0,1fr)] sm:gap-6"
                                key={label}
                            >
                                <dt className="text-sm leading-6 text-muted-foreground">{label}</dt>
                                <dd className="text-sm leading-6">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </CardContent>
            </Card>

            <Card className="gap-4 py-6">
                <CardHeader className="px-6">
                    <div className="grid gap-1">
                        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Что заполняете вы</h2>
                        <p className="text-xs leading-4 text-muted-foreground">Три поля, которых в реестре нет</p>
                    </div>
                </CardHeader>
                <CardContent className="px-6">
                    <div className="flex w-full max-w-md flex-col gap-4">
                        <StaticField label="Сайт" value="https://romashka-digital.ru" />
                        <StaticField
                            label="Вид деятельности"
                            value="Разработка и поддержка сайтов"
                            helper="Может быть изменён банком"
                        />
                        <StaticField
                            label="Оборот в месяц"
                            value="Например, 1 200 000 ₽"
                            helper="Влияет на тариф — банк уточнит при проверке"
                            placeholder
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-wrap items-center gap-4">
                <Button asChild className="h-12 px-6">
                    <Link to={APP_ROUTES.companyApplicationSignatory}>Сохранить и продолжить</Link>
                </Button>
                <p className="text-xs text-muted-foreground">Черновик сохраняется сам</p>
            </div>
        </div>
    );
}

function StaticField({
    label,
    value,
    helper,
    placeholder = false,
}: {
    label: string;
    value: string;
    helper?: string;
    placeholder?: boolean;
}) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex min-h-12 flex-col justify-center rounded-xl bg-muted px-4 py-2">
                <p className="text-xs leading-4 text-muted-foreground">{label}</p>
                <p className={`text-sm leading-5 ${placeholder ? "text-muted-foreground" : "text-foreground"}`}>
                    {value}
                </p>
            </div>
            {helper && <p className="text-xs leading-4 text-muted-foreground">{helper}</p>}
        </div>
    );
}

export default CompanyApplicationPage;
