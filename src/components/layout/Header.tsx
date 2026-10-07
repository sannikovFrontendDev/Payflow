import { Bell, ChevronDown, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-3 bg-primary px-3 text-primary-foreground sm:px-5">
            <div className="flex min-w-0 items-center gap-2">
                <span className="shrink-0 text-sm font-semibold tracking-tight">Payflow</span>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-auto min-w-0 justify-start gap-2 px-2 py-1 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground data-[state=open]:bg-primary-foreground/10 data-[state=open]:text-primary-foreground">
                            <span className="grid min-w-0 text-left">
                                <span className="truncate text-sm font-medium">Romashka Digital</span>
                                <span className="text-xs text-primary-foreground/70">ИНН 7714041000</span>
                            </span>
                            <ChevronDown className="size-4 shrink-0" aria-hidden="true" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Компания</DropdownMenuLabel>
                        <DropdownMenuItem>Romashka Digital</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                <span className="hidden rounded-full bg-background px-3 py-2 text-xs font-medium text-foreground sm:inline-flex">
                    Тестовый режим
                </span>
                <Button variant="ghost" size="icon" aria-label="Поиск" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
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
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}

export default Header;
