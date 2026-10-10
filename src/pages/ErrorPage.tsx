import { Link } from "react-router";
import { CircleAlert } from "lucide-react";
import { APP_ROUTES } from "@/app/routes.constants.ts";
import { Button } from "@/components/ui/button.tsx";

// Показывает общий экран, если приложение не может продолжить работу.
function ErrorPage() {
    return (
        <main className="grid min-h-svh place-items-center bg-secondary p-6">
            <section className="grid max-w-lg justify-items-center gap-5 text-center">
                <CircleAlert className="size-16 text-destructive" aria-hidden="true" />
                <div className="grid gap-2">
                    <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        Что-то пошло не так
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Не удалось загрузить страницу. Попробуйте вернуться на главную.
                    </p>
                </div>
                <Button asChild>
                    <Link to={APP_ROUTES.home}>На главную</Link>
                </Button>
            </section>
        </main>
    );
}

export default ErrorPage;
