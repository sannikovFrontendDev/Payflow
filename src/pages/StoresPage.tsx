import BasePageWrapperUI from "@/components/ui/BasePageWrapperUI.tsx";
import { Link } from "react-router";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";

function StoresPage() {
    return (
        <BasePageWrapperUI
            title="Магазины"
            description="Создайте магазин, не дожидаясь банка: тестовые ключи и карты появятся сразу."
            descriptionClassName="max-w-[720px]"
        >
            <Card className="gap-4 py-6">
                <CardHeader className="px-6">
                    <div className="grid gap-1">
                        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Создать магазин</h2>
                        <p className="text-xs leading-4 text-muted-foreground">
                            Магазин — это сайт, с которого придут платежи
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4 px-6">
                    <div className="flex w-full max-w-md flex-col gap-4">
                        <StoreField
                            id="store-name"
                            label="Название магазина"
                            value="Сайт студии"
                            hint="Покупатель увидит его на странице оплаты и в выписке банка"
                        />
                        <StoreField
                            id="store-website"
                            label="Адрес сайта"
                            value="https://romashka-digital.ru"
                            hint="Полный адрес с https. Один магазин — один сайт"
                        />
                    </div>

                    <div className="flex flex-col items-start gap-3">
                        <Button asChild className="h-12 px-6">
                            <Link to="/stores/studio">Создать магазин</Link>
                        </Button>
                        <p className="text-sm leading-5 text-muted-foreground">
                            Создание займёт минуту. Боевые ключи — после договора и проверки сайта: сайт отправите на проверку, когда подпишете договор.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </BasePageWrapperUI>
    );
}

function StoreField({
    id,
    label,
    value,
    hint,
}: {
    id: string;
    label: string;
    value: string;
    hint: string;
}) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex h-12 flex-col justify-center rounded-xl bg-muted px-4">
                <label htmlFor={id} className="text-xs leading-4 text-muted-foreground">
                    {label}
                </label>
                <Input
                    id={id}
                    value={value}
                    readOnly
                    aria-describedby={`${id}-hint`}
                    className="h-5 border-0 bg-transparent p-0 text-sm leading-5 shadow-none focus-visible:ring-0"
                />
            </div>
            <p id={`${id}-hint`} className="text-xs leading-4 text-muted-foreground">
                {hint}
            </p>
        </div>
    );
}

export default StoresPage;
