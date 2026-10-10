import { CircleCheck, X } from "lucide-react";
import { Link } from "react-router";
import { APP_ROUTES } from "@/app/routes.constants.ts";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";

function AddCompanyPage() {
    return (
        <main className="grid h-svh grid-cols-1 gap-4 overflow-hidden bg-secondary p-4 sm:p-6 lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
            <aside className="relative hidden h-full min-h-0 overflow-hidden rounded-3xl bg-primary text-primary-foreground lg:flex">
                <div
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(ellipse at 85% 12%, rgba(115, 175, 255, .34), transparent 30%), radial-gradient(ellipse at 30% 52%, rgba(63, 137, 255, .42), transparent 40%), linear-gradient(155deg, #0c58c7 0%, #0845a7 52%, #061f50 100%)",
                    }}
                    aria-hidden="true"
                />
                <div className="absolute -left-1/2 top-[28%] h-[34%] w-[190%] rotate-[-14deg] rounded-[50%] border-t border-white/15 bg-gradient-to-b from-white/10 to-transparent blur-xl" aria-hidden="true" />
                <div className="absolute -left-1/3 top-[45%] h-[28%] w-[170%] rotate-[12deg] rounded-[50%] border-t border-white/10 bg-gradient-to-b from-white/10 to-transparent blur-2xl" aria-hidden="true" />

                <div className="relative flex w-full flex-col justify-between p-7">
                    <span className="text-sm font-semibold tracking-tight">Payflow</span>
                    <div className="grid gap-3">
                        <p className="text-sm text-primary-foreground/80">Компании не смешиваются</p>
                        <p className="max-w-sm text-2xl font-semibold leading-8 tracking-tight xl:text-[2rem] xl:leading-10">
                            У каждой свои анкета, договор, деньги и документы
                        </p>
                    </div>
                </div>
            </aside>

            <Card className="relative h-full min-h-0 justify-center gap-0 overflow-hidden rounded-3xl py-0 lg:py-3 max-[800px]:py-0">
                <Button asChild variant="ghost" size="icon" className="absolute right-4 top-4">
                    <Link to={APP_ROUTES.home} aria-label="Закрыть добавление компании">
                        <X aria-hidden="true" />
                    </Link>
                </Button>

                <CardContent className="flex min-h-0 w-full justify-center overflow-hidden px-6 sm:px-10 lg:px-12">
                    <div className="flex w-full max-w-[420px] flex-col gap-4 max-[800px]:gap-1">
                        <header className="grid gap-2">
                            <h1 className="text-2xl font-semibold leading-8 tracking-tight sm:text-3xl sm:leading-10">
                                Новая компания
                            </h1>
                            <p className="text-sm leading-5 text-muted-foreground">
                                Подключение пройдёт заново: анкета, проверка банком, договор. Данные о вас подставим из профиля.
                            </p>
                        </header>

                        <div className="flex w-full gap-1 rounded-xl bg-muted p-1" role="group" aria-label="Форма компании">
                            <LegalFormOption selected>Юрлицо</LegalFormOption>
                            <LegalFormOption>ИП</LegalFormOption>
                            <LegalFormOption>Самозанятый</LegalFormOption>
                        </div>

                        <div className="grid gap-2">
                            <CompanyField label="ИНН компании" value="7716234517" />
                            <p className="text-xs leading-4 text-muted-foreground">10 цифр для юрлица, 12 — для ИП</p>
                            <div className="flex items-center gap-2 text-sm leading-5">
                                <CircleCheck className="size-5 shrink-0 text-emerald-600" aria-hidden="true" />
                                <span>Нашли в реестре: ООО «Ромашка Обучение»</span>
                            </div>
                        </div>

                        <section className="grid gap-3 rounded-2xl bg-secondary p-4 max-[800px]:gap-2 max-[800px]:p-2">
                            <div className="grid gap-1">
                                <h2 className="text-sm font-semibold leading-5">
                                    Данные руководителя возьмём из вашего профиля — проверьте
                                </h2>
                                <p className="text-xs leading-4 text-muted-foreground">
                                    По ЕГРЮЛ руководитель ООО «Ромашка Обучение» — вы, поэтому данные подставлены из профиля.
                                </p>
                            </div>
                            <CompanyFact label="Руководитель" value="Петров Иван Сергеевич, генеральный директор" />
                            <CompanyFact label="Телефон" value="+7 999 ••• 12 34" />
                            <CompanyFact label="Почта" value="ivan@romashka-digital.ru" />
                            <div className="flex items-start gap-3 py-2">
                                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border border-input bg-background" aria-hidden="true" />
                                <span className="text-sm leading-5">Это я, данные верны</span>
                            </div>
                        </section>

                        <p className="text-sm leading-5 text-muted-foreground">
                            Банк проверит новую компанию заново — анкету, владельцев и счёт. По 115-ФЗ каждую компанию идентифицируют отдельно, поэтому одобрение ООО «Ромашка Диджитал» на неё не переносится.
                        </p>

                        <Button type="button" className="h-12 w-full px-6">Продолжить</Button>
                        <p className="text-xs leading-4 text-muted-foreground">
                            Первая компания работает как работала: её платежи, выплаты и ключи это не затрагивает.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}

function LegalFormOption({ children, selected = false }: { children: string; selected?: boolean }) {
    return (
        <button
            type="button"
            aria-pressed={selected}
            className={`min-w-0 flex-1 rounded-lg px-2 py-2 text-sm font-medium transition-colors ${selected ? "bg-card text-foreground shadow-sm" : "text-foreground hover:bg-card/60"}`}
        >
            {children}
        </button>
    );
}

function CompanyField({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex h-12 flex-col justify-center rounded-xl bg-muted px-4">
            <label htmlFor="company-inn" className="text-xs leading-4 text-muted-foreground">{label}</label>
            <Input
                id="company-inn"
                value={value}
                readOnly
                aria-label={label}
                className="h-5 border-0 bg-transparent p-0 text-sm leading-5 shadow-none focus-visible:ring-0"
            />
        </div>
    );
}

function CompanyFact({ label, value }: { label: string; value: string }) {
    return (
        <div className="grid gap-0.5">
            <p className="text-xs leading-4 text-muted-foreground">{label}</p>
            <p className="text-sm leading-5">{value}</p>
        </div>
    );
}

export default AddCompanyPage;
