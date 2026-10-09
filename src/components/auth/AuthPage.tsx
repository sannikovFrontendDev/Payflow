import { Link } from "react-router";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";

type AuthMode = "sign-in" | "sign-up";

type AuthField = {
    id: string;
    label: string;
    type: "text" | "email" | "password";
    autoComplete: string;
};

const authFields: Record<AuthMode, AuthField[]> = {
    "sign-in": [
        { id: "email", label: "Email", type: "email", autoComplete: "email" },
        { id: "password", label: "Пароль", type: "password", autoComplete: "current-password" },
    ],
    "sign-up": [
        { id: "first-name", label: "Имя", type: "text", autoComplete: "given-name" },
        { id: "last-name", label: "Фамилия", type: "text", autoComplete: "family-name" },
        { id: "email", label: "Email", type: "email", autoComplete: "email" },
        { id: "new-password", label: "Пароль", type: "password", autoComplete: "new-password" },
    ],
};

function AuthPage({ mode }: { mode: AuthMode }) {
    const isSignUp = mode === "sign-up";

    return (
        <main className="grid min-h-svh grid-cols-1 gap-4 bg-secondary p-4 sm:p-6 lg:h-svh lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)] lg:overflow-hidden">
            <aside className="relative hidden min-h-0 overflow-hidden rounded-3xl bg-primary text-primary-foreground lg:flex">
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
                        <p className="text-sm text-primary-foreground/80">Платежи и управление бизнесом</p>
                        <p className="max-w-sm text-2xl font-semibold leading-8 tracking-tight xl:text-[2rem] xl:leading-10">
                            {isSignUp ? "Создайте аккаунт Payflow" : "Рады видеть вас снова"}
                        </p>
                    </div>
                </div>
            </aside>

            <Card className="relative min-h-[calc(100svh-2rem)] justify-center gap-0 overflow-hidden rounded-3xl py-0 sm:min-h-[calc(100svh-3rem)] lg:h-full lg:min-h-0 lg:py-3">
                <CardContent className="flex w-full justify-center overflow-y-auto px-6 py-12 sm:px-10 lg:px-12">
                    <section className="my-auto w-full max-w-[500px]">
                        <header className="mb-8 grid gap-2">
                            <h1 className="text-2xl font-semibold leading-8 tracking-tight sm:text-3xl sm:leading-10">
                                {isSignUp ? "Регистрация" : "Авторизация"}
                            </h1>
                        </header>

                        <div className="grid gap-4">
                            {authFields[mode].map((field) => (
                                <div className="grid gap-2" key={field.id}>
                                    <label htmlFor={field.id} className="text-sm font-medium leading-5">
                                        {field.label}
                                    </label>
                                    <Input
                                        id={field.id}
                                        type={field.type}
                                        autoComplete={field.autoComplete}
                                        className="h-12 rounded-xl bg-muted px-4 text-sm shadow-none focus-visible:ring-2 focus-visible:ring-ring/50"
                                    />
                                </div>
                            ))}

                            <Button type="button" className="mt-2 h-12 w-full px-6">
                                {isSignUp ? "Зарегистрироваться" : "Войти"}
                            </Button>
                        </div>

                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            {isSignUp ? "Уже есть аккаунт?" : "Ещё нет аккаунта?"}{" "}
                            <Link
                                to={isSignUp ? "/sign-in" : "/sign-up"}
                                className="font-medium text-primary hover:underline"
                            >
                                {isSignUp ? "Войти" : "Зарегистрироваться"}
                            </Link>
                        </p>
                    </section>
                </CardContent>
            </Card>
        </main>
    );
}

export default AuthPage;
