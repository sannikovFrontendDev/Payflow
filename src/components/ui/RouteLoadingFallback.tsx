import { LoaderCircle } from "lucide-react";

// Показывает компактное состояние ожидания, пока загружается код страницы.
function RouteLoadingFallback({ fullScreen = false }: { fullScreen?: boolean }) {
    const heightClass = fullScreen ? "min-h-svh" : "min-h-[50vh]";

    return (
        <div
            className={`grid ${heightClass} place-items-center text-sm text-muted-foreground`}
            role="status"
        >
            <span className="flex items-center gap-2">
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                Загружаем страницу…
            </span>
        </div>
    );
}

export default RouteLoadingFallback;
