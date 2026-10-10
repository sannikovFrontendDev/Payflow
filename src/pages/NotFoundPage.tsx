import { FileQuestion } from "lucide-react";
import { Link } from "react-router";
import { APP_ROUTES } from "@/app/routes.constants.ts";
import { Button } from "@/components/ui/button.tsx";

// Показывает понятную страницу для любого URL, которому не соответствует маршрут.
function NotFoundPage() {
    return (
        <main className="grid min-h-svh place-items-center bg-secondary p-6">
            <section className="grid max-w-lg justify-items-center gap-5 text-center">
                <FileQuestion
                    aria-hidden="true"
                    className="size-44 text-primary"
                />
                <div className="grid gap-2">
                    <p className="text-sm font-semibold tracking-widest text-primary">404</p>
                    <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        Страница не найдена
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Возможно, адрес изменился или страница больше не существует.
                    </p>
                </div>
                <Button asChild>
                    <Link to={APP_ROUTES.home}>На главную</Link>
                </Button>
            </section>
        </main>
    );
}

export default NotFoundPage;
