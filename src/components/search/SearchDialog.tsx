import { Dialog as DialogPrimitive } from "radix-ui";
import type { ReactNode } from "react";
import {
    CircleCheck,
    CreditCard,
    LayoutDashboard,
    Search,
    Store,
    Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";

type SearchDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
    return (
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/20 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
                <DialogPrimitive.Content className="fixed left-1/2 top-[12vh] z-50 max-h-[calc(100svh-24px)] w-[calc(100vw-24px)] max-w-[640px] -translate-x-1/2 overflow-y-auto rounded-2xl bg-card text-card-foreground shadow-xl outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 sm:w-[calc(100vw-48px)]">
                    <DialogPrimitive.Title className="sr-only">Поиск по кабинету</DialogPrimitive.Title>
                    <div className="px-4 pb-2 pt-4">
                        <label className="sr-only" htmlFor="global-search">Операция, магазин или раздел</label>
                        <div className="relative">
                            <Input
                                id="global-search"
                                autoFocus
                                placeholder="Операция, магазин или раздел"
                                className="h-12 rounded-xl border-0 bg-muted px-4 pr-12 text-sm shadow-none focus-visible:ring-2 focus-visible:ring-primary/70"
                            />
                            <Search className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                        </div>
                    </div>

                    <div className="space-y-2 px-2 pb-2">
                        <SearchGroup title="Недавнее">
                            <SearchResultItem
                                icon={CreditCard}
                                title="4 900 ₽ · Карта"
                                description="Операция · 9 ноября, 14:32"
                                highlighted
                                status="Успешно"
                            />
                            <SearchResultItem
                                icon={Store}
                                title="Сайт студии · romashka-digital.ru"
                                description="Магазин · боевой режим"
                            />
                            <SearchResultItem icon={Wallet} title="Выплаты и баланс" description="Раздел" />
                        </SearchGroup>

                        <SearchGroup title="Что можно найти">
                            <SearchResultItem
                                icon={CreditCard}
                                title="Операции"
                                description="По номеру, сумме, почте или телефону плательщика"
                            />
                            <SearchResultItem icon={Store} title="Магазины" description="По названию или адресу сайта" />
                            <SearchResultItem
                                icon={LayoutDashboard}
                                title="Разделы"
                                description="По названию: выплаты, документы, журнал событий"
                            />
                        </SearchGroup>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t px-5 py-3 text-xs leading-4 text-muted-foreground">
                        <p>↑ ↓ — выбрать&nbsp;&nbsp; Enter — открыть&nbsp;&nbsp; Esc — закрыть</p>
                        <p className="sm:ml-auto">⌘K — поиск с любого экрана</p>
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}

function SearchGroup({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="space-y-1" aria-label={title}>
            <h2 className="px-3 pb-1 pt-2 text-xs font-medium uppercase leading-4 tracking-wide text-muted-foreground">
                {title}
            </h2>
            <div className="space-y-1">{children}</div>
        </section>
    );
}

function SearchResultItem({
    icon: Icon,
    title,
    description,
    highlighted = false,
    status,
}: {
    icon: LucideIcon;
    title: string;
    description: string;
    highlighted?: boolean;
    status?: string;
}) {
    return (
        <div className={`flex min-h-[60px] items-center gap-3 rounded-lg px-3 py-2 ${highlighted ? "bg-accent" : "hover:bg-muted"}`}>
            <Icon className="size-5 shrink-0 text-foreground" aria-hidden="true" />
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium leading-5">{title}</p>
                <p className="truncate text-xs leading-4 text-muted-foreground">{description}</p>
            </div>
            {status && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs leading-4 text-emerald-900">
                    <CircleCheck className="size-3.5" aria-hidden="true" />
                    {status}
                </span>
            )}
        </div>
    );
}

export default SearchDialog;
