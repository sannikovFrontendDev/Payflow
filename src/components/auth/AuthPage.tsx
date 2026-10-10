import {Link, useNavigate} from "react-router";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import type { FormFields, FormMode } from "@/components/auth/AuthPage.types.ts";
import { type SubmitEvent } from "react";
import {Alert} from "@/components/ui/alert.tsx";
import type { AuthUser, LoginRequest, SignUpRequest } from "@/features/auth/auth.types.ts";
import { APP_ROUTES } from "@/app/routes.constants.ts";
import { useAuthActions } from "@/features/auth/hooks/useAuthActions.ts";


const authFields: Record<FormMode, FormFields[]> = {
    "sign-in": [
        { id: "email", name: "email", label: "Email", type: "email", autoComplete: "email" },
        { id: "password", name: "password", label: "Пароль", type: "password", autoComplete: "current-password" },
    ],
    "sign-up": [
        { id: "first-name", name: "firstName", label: "Имя", type: "text", autoComplete: "given-name" },
        { id: "last-name", name: "lastName", label: "Фамилия", type: "text", autoComplete: "family-name" },
        { id: "email", name: "email", label: "Email", type: "email", autoComplete: "email" },
        { id: "new-password", name: "password", label: "Пароль", type: "password", autoComplete: "new-password" },
    ],
};

// Выбирает страницу назначения по наличию компании у вошедшего пользователя.
function getAuthenticatedRoute(user: AuthUser): string {
    return user.companyId ? APP_ROUTES.home : APP_ROUTES.companyCreate;
}

function AuthPage({ mode }: { mode: FormMode }) {
    const navigate = useNavigate();
    const isSignUp = mode === "sign-up";
    const { signUp, login, isLoading, errorMessage } = useAuthActions();
    const submitButtonLabel = isLoading
        ? isSignUp ? "Регистрируем…" : "Входим…"
        : isSignUp ? "Зарегистрироваться" : "Войти";

    // Отправляет данные текущей формы и направляет пользователя после успешного ответа.
    async function submitAuthHandler(e: SubmitEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        let user: AuthUser | null;

        if (isSignUp) {
            const requestBody: SignUpRequest = {
                firstName: formData.get("firstName") as string,
                lastName: formData.get("lastName") as string,
                email: formData.get("email") as string,
                password: formData.get("password") as string,
            };
            user = await signUp(requestBody);
        } else {
            const requestBody: LoginRequest = {
                email: formData.get("email") as string,
                password: formData.get("password") as string,
            };
            user = await login(requestBody);
        }

        if (user) {
            navigate(getAuthenticatedRoute(user));
        }
    }
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
                <div className="absolute -left-1/2 top-[28%] h-[34%] w-[190%] rotate-[-14deg] rounded-[50%] border-t border-white/15 bg-linear-to-b from-white/10 to-transparent blur-xl" aria-hidden="true" />
                <div className="absolute -left-1/3 top-[45%] h-[28%] w-[170%] rotate-12 rounded-[50%] border-t border-white/10 bg-linear-to-b from-white/10 to-transparent blur-2xl" aria-hidden="true" />
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
                    <section className="my-auto w-full max-w-125">
                        <header className="mb-8 grid gap-2">
                            <h1 className="text-2xl font-semibold leading-8 tracking-tight sm:text-3xl sm:leading-10">
                                {isSignUp ? "Регистрация" : "Авторизация"}
                            </h1>
                        </header>

                        {errorMessage && (
                            <Alert variant="error" title={errorMessage} className="mb-6" />
                        )}

                        <form className="grid gap-4" onSubmit={submitAuthHandler}>
                            {authFields[mode].map((field) => (
                                <div className="grid gap-2" key={field.id}>
                                    <label htmlFor={field.id} className="text-sm font-medium leading-5">
                                        {field.label}
                                    </label>
                                    <Input
                                        id={field.id}
                                        type={field.type}
                                        name={field.name}
                                        autoComplete={field.autoComplete}
                                        className="h-12 rounded-xl bg-muted px-4 text-sm shadow-none focus-visible:ring-2 focus-visible:ring-ring/50"
                                    />
                                </div>
                            ))}

                            <Button
                                type="submit"
                                className="mt-2 h-12 w-full px-6"
                                disabled={isLoading}
                                aria-busy={isLoading}
                            >
                                {submitButtonLabel}
                            </Button>
                        </form>

                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            {isSignUp ? "Уже есть аккаунт?" : "Ещё нет аккаунта?"}{" "}
                            <Link
                                to={isSignUp ? APP_ROUTES.signIn : APP_ROUTES.signUp}
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
