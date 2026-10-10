import { Navigate, Outlet } from "react-router";
import { APP_ROUTES } from "@/app/routes.constants.ts";
import { useCheckAuthQuery } from "@/features/auth/auth.api.ts";
import RouteLoadingFallback from "@/components/ui/RouteLoadingFallback.tsx";

// Отличает отказ в авторизации от остальных ошибок API.
function isUnauthorizedError(error: unknown): boolean {
    return (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        error.status === 401
    );
}

// Проверяет сессию и открывает приватный маршрут только после успешной проверки.
function RequireAuth() {
    const { data, error, isLoading } = useCheckAuthQuery();

    if (isLoading) {
        return <RouteLoadingFallback fullScreen />;
    }

    if (data) {
        return <Outlet />;
    }

    if (isUnauthorizedError(error)) {
        return <Navigate to={APP_ROUTES.signIn} replace />;
    }

    if (error) {
        return <Navigate to={APP_ROUTES.error} replace />;
    }

    return <RouteLoadingFallback fullScreen />;
}

export default RequireAuth;
