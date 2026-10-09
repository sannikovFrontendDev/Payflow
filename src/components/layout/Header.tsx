import { Bell, Check, ChevronDown, LogOut, Plus, Search } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SearchDialog from "@/components/search/SearchDialog.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-3 bg-primary px-3 text-primary-foreground sm:px-5">
            <div className="flex min-w-0 items-center gap-2">
                <span className="shrink-0 text-sm font-semibold tracking-tight">Payflow</span>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-auto min-w-0 justify-start gap-2 px-2 py-1 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground data-[state=open]:bg-primary-foreground/10 data-[state=open]:text-primary-foreground">
                            <span className="grid min-w-0 text-left">
                                <span className="truncate text-sm font-medium">ООО «Ромашка Диджитал»</span>
                                <span className="text-xs text-primary-foreground/70">ИНН 7714041000</span>
                            </span>
                            <ChevronDown className="size-4 shrink-0" aria-hidden="true" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-72 p-2">
                        <DropdownMenuLabel>Компания</DropdownMenuLabel>
                        <DropdownMenuItem className="flex items-center justify-between gap-4">
                            <span className="grid gap-0.5">
                                <span>ООО «Ромашка Диджитал»</span>
                                <span className="text-xs text-muted-foreground">ИНН 7714041000</span>
                            </span>
                            <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link to="/company/new" className="cursor-pointer">
                                <Plus aria-hidden="true" />
                                Добавить компанию
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                <span className="hidden rounded-full bg-background px-3 py-2 text-xs font-medium text-foreground sm:inline-flex">
                    Тестовый режим
                </span>
                <Button variant="ghost" size="icon" aria-label="Поиск" onClick={() => setSearchOpen(true)} className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                    <Search aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Уведомления" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                    <Bell aria-hidden="true" />
                </Button>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-auto gap-2 px-2 py-1 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground data-[state=open]:bg-primary-foreground/10 data-[state=open]:text-primary-foreground">
                            <Avatar className="size-8">
                                <AvatarFallback className="bg-primary-foreground/15 text-primary-foreground">ИП</AvatarFallback>
                            </Avatar>
                            <span className="hidden text-left md:grid">
                                <span className="text-sm font-medium">Иван Петров</span>
                                <span className="text-xs text-primary-foreground/70">ivan@romashka-digital.ru</span>
                            </span>
                            <ChevronDown className="hidden size-4 sm:block" aria-hidden="true" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Иван Петров</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Профиль</DropdownMenuItem>
                        <DropdownMenuItem>Настройки</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild variant="destructive">
                            <Link to="/sign-in" className="cursor-pointer">
                                <LogOut aria-hidden="true" />
                                Выйти
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        </header>
    );
}

export default Header;
