import { Link } from "react-router";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";

function CompanyApplicationSignatoryPage() {
    return (
        <div className="flex min-w-0 flex-col gap-4">
            <Card className="gap-4 py-6">
                <CardHeader className="px-6">
                    <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Кто участвует</h2>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-4 px-6">
                    <div className="min-w-0">
                        <p className="text-sm font-medium">Петров Иван Сергеевич</p>
                        <p className="text-xs leading-4 text-muted-foreground">Руководитель</p>
                        <p className="text-xs leading-4 text-muted-foreground">ИНН 771404123456 · паспорт 45 ** ******</p>
                    </div>
                    <Button type="button" variant="link" className="h-auto shrink-0 p-0 text-xs">Изменить</Button>
                </CardContent>
            </Card>

            <Card className="gap-4 py-6">
                <CardHeader className="px-6">
                    <div className="grid gap-1">
                        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Кто подпишет договор</h2>
                        <p className="text-xs leading-4 text-muted-foreground">
                            Право подписи по уставу — из ЕГРЮЛ. Нет нужного человека — выберите доверенность.
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3 px-6">
                    <SignatoryOption title="Петров Иван Сергеевич" description="Генеральный директор · по уставу" />
                    <SignatoryOption title="Петрова Анна Сергеевна" description="Коммерческий директор · по уставу" />
                    <SignatoryOption title="Другой человек по доверенности" selected />
                    <div className="grid gap-3 pt-1 md:grid-cols-3">
                        <StaticField label="ФИО подписанта" value="Как в паспорте" />
                        <StaticField label="Номер доверенности" value="Например, 77 АД 1234567" />
                        <StaticField label="Дата доверенности" value="ДД.ММ.ГГГГ" />
                    </div>
                </CardContent>
            </Card>

            <Card className="gap-4 py-6">
                <CardHeader className="px-6">
                    <div className="grid gap-1">
                        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Контакты</h2>
                        <p className="text-xs leading-4 text-muted-foreground">
                            Кому писать по разным вопросам. Если всё ведёт один человек — оставьте отметки «Тот же, что основной».
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3 px-6">
                    <ContactSection
                        title="Основной контакт"
                        description="Пишем и звоним по анкете и договору"
                        fields={[
                            ["ФИО", "Петров Иван Сергеевич"],
                            ["Телефон", "+7 999 300-12-34"],
                            ["Почта", "ivan@romashka-digital.ru"],
                        ]}
                    />
                    <div className="border-t" />
                    <ContactSection title="Контакт по актам" description="Сюда пришлём акты и УПД" sameAsMain />
                    <div className="border-t" />
                    <ContactSection
                        title="Контакт по возвратам"
                        description="Напишем, если покупатель попросит вернуть деньги"
                        sameAsMain={false}
                        fields={[
                            ["ФИО", "Фамилия, имя, отчество"],
                            ["Телефон", "+7"],
                            ["Почта", "name@company.ru"],
                        ]}
                    />
                    <div className="border-t" />
                    <ContactSection title="Контакт по IT" description="Технические вопросы интеграции" sameAsMain />
                </CardContent>
            </Card>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Button asChild type="button" variant="secondary" className="h-12 px-6">
                    <Link to="/company/application">Назад</Link>
                </Button>
                <Button asChild className="h-12 px-6">
                    <Link to="/company/application/payout-accounts">Сохранить и продолжить</Link>
                </Button>
                <p className="text-xs text-muted-foreground">Черновик сохраняется сам</p>
            </div>
        </div>
    );
}

function SignatoryOption({ title, description, selected = false }: { title: string; description?: string; selected?: boolean }) {
    return (
        <div className="flex items-start gap-3 py-1.5">
            <span className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border ${selected ? "border-primary" : "border-muted-foreground"}`} aria-hidden="true">
                {selected && <span className="size-2 rounded-full bg-primary" />}
            </span>
            <div className="min-w-0">
                <p className="text-sm leading-5">{title}</p>
                {description && <p className="text-xs leading-4 text-muted-foreground">{description}</p>}
            </div>
        </div>
    );
}

function StaticField({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex h-12 min-w-0 flex-col justify-center rounded-xl bg-muted px-4">
            <p className="text-[10px] leading-4 text-muted-foreground">{label}</p>
            <p className="truncate text-xs leading-4 text-muted-foreground">{value}</p>
        </div>
    );
}

function ContactSection({
    title,
    description,
    fields,
    sameAsMain,
}: {
    title: string;
    description: string;
    fields?: [string, string][];
    sameAsMain?: boolean;
}) {
    return (
        <section className="space-y-2">
            <div>
                <h3 className="text-sm font-medium leading-5">{title}</h3>
                <p className="text-xs leading-4 text-muted-foreground">{description}</p>
            </div>
            {sameAsMain !== undefined && (
                <div className="flex items-center gap-2 py-1">
                    <span className={`flex size-4 items-center justify-center rounded-sm ${sameAsMain ? "bg-primary text-primary-foreground" : "border border-muted-foreground"}`} aria-hidden="true">
                        {sameAsMain && <svg viewBox="0 0 16 16" className="size-3 fill-none stroke-current stroke-2"><path d="m3 8 3 3 7-7" /></svg>}
                    </span>
                    <span className="text-xs">Тот же, что основной</span>
                </div>
            )}
            {fields && !sameAsMain && (
                <div className="grid gap-2 sm:grid-cols-3">
                    {fields.map(([label, value]) => <StaticField key={label} label={label} value={value} />)}
                </div>
            )}
        </section>
    );
}

export default CompanyApplicationSignatoryPage;
