import { useEffect, useState, type ReactNode } from "react";
import { Outlet, useLocation } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

const LOADING_PREVIEW_MS = 3500;

function PageLoadingBoundary({ children }: { children?: ReactNode }) {
    const { pathname } = useLocation();
    const [readyPath, setReadyPath] = useState("");

    useEffect(() => {
        const timeoutId = window.setTimeout(() => setReadyPath(pathname), LOADING_PREVIEW_MS);
        return () => window.clearTimeout(timeoutId);
    }, [pathname]);

    if (readyPath !== pathname) {
        return <PageSkeleton pathname={pathname} />;
    }

    return children ?? <Outlet />;
}

function PageSkeleton({ pathname }: { pathname: string }) {
    if (pathname === "/sign-in" || pathname === "/sign-up") return <AuthSkeleton pathname={pathname} />;
    if (pathname === "/company/new") return <SplitFormSkeleton />;
    if (pathname.startsWith("/company/application")) return <ApplicationSkeleton />;
    if (pathname === "/") return <DashboardSkeleton />;
    if (pathname === "/stores") return <StoreCreationSkeleton />;
    if (pathname === "/stores/studio") return <StoreDetailsSkeleton />;
    if (pathname === "/company") return <CompanyDetailsSkeleton />;
    if (pathname === "/documentation") return <DocumentationSkeleton />;
    return <TablePageSkeleton />;
}

function PageContainer({ children }: { children: ReactNode }) {
    return <div className="mx-auto flex w-full flex-col gap-4 px-6 py-6" aria-busy="true"><span className="sr-only">Загрузка страницы</span>{children}</div>;
}

function PageHeading({ description = true }: { description?: boolean }) {
    return (
        <header className="grid gap-2">
            <Skeleton className="h-9 w-56 max-w-full" />
            {description && <Skeleton className="h-5 w-[min(42rem,90%)]" />}
        </header>
    );
}

function DashboardSkeleton() {
    return (
        <PageContainer>
            <header className="grid gap-2">
                <Skeleton className="h-10 w-96 max-w-full" />
                <div className="grid gap-1">
                    <Skeleton className="h-6 w-[min(55rem,90%)]" />
                    <Skeleton className="h-6 w-[min(27rem,60%)]" />
                </div>
            </header>
            <div className="flex flex-wrap items-center gap-2" aria-hidden="true">
                <FilterSkeleton width="w-40" textWidth="w-24" />
                <FilterSkeleton width="w-36" textWidth="w-16" hasCalendar />
                <Skeleton className="h-5 w-44 bg-muted-foreground/10" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }, (_, index) => <div className="grid gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10" key={index}><Skeleton className="h-3 w-28" /><Skeleton className="h-7 w-36" /></div>)}
            </div>
            <StoresTableSkeleton />
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.9fr)]">
                <RecentOperationsSkeleton />
                <UpcomingPayoutSkeleton />
            </div>
        </PageContainer>
    );
}

function StoresTableSkeleton() {
    return (
        <section className="grid gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10" aria-hidden="true">
            <div className="grid gap-2">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-5 w-[min(55rem,95%)]" />
            </div>
            <div className="min-w-[760px]">
                <div className="grid grid-cols-[1fr_1.3fr_1.2fr_1.2fr_0.9fr] items-center gap-4 border-b pb-2">
                    {Array.from({ length: 5 }, (_, index) => <Skeleton className="h-3 w-3/4" key={index} />)}
                </div>
                {Array.from({ length: 3 }, (_, index) => (
                    <div className="grid min-h-[58px] grid-cols-[1fr_1.3fr_1.2fr_1.2fr_0.9fr] items-center gap-4 border-b last:border-0" key={index}>
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-5 w-4/5 rounded-full" />
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-4/5 justify-self-end" />
                    </div>
                ))}
                <div className="flex items-center justify-between pt-3">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
        </section>
    );
}

function RecentOperationsSkeleton() {
    return (
        <section className="grid content-start gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10" aria-hidden="true">
            <div className="grid gap-2"><Skeleton className="h-6 w-44" /><Skeleton className="h-5 w-[min(28rem,90%)]" /></div>
            <div className="min-w-[590px]">
                <div className="grid grid-cols-[0.9fr_0.7fr_1.1fr_0.7fr_1.2fr] gap-3 border-b pb-2">
                    {Array.from({ length: 5 }, (_, index) => <Skeleton className="h-3 w-4/5" key={index} />)}
                </div>
                {Array.from({ length: 5 }, (_, index) => (
                    <div className="grid min-h-[53px] grid-cols-[0.9fr_0.7fr_1.1fr_0.7fr_1.2fr] items-center gap-3 border-b last:border-0" key={index}>
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-5 w-4/5 rounded-full" />
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                ))}
            </div>
            <Skeleton className="h-4 w-28" />
        </section>
    );
}

function UpcomingPayoutSkeleton() {
    return (
        <section className="grid content-start gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10" aria-hidden="true">
            <div className="grid gap-2">
                <Skeleton className="h-6 w-44" />
                <Skeleton className="h-9 w-48" />
                <Skeleton className="h-5 w-52" />
            </div>
            <Skeleton className="h-4 w-32 border-b pb-3" />
            {Array.from({ length: 4 }, (_, index) => <div className="flex justify-between gap-3 border-b pb-3" key={index}><Skeleton className="h-4 w-44 max-w-[65%]" /><Skeleton className="h-4 w-20" /></div>)}
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-4 w-24" />
        </section>
    );
}

function ApplicationSkeleton() {
    return (
        <PageContainer>
            <Skeleton className="h-4 w-48" />
            <PageHeading />
            <div className="grid items-start gap-4 lg:grid-cols-[277px_minmax(0,1fr)]">
                <div className="grid gap-5 rounded-xl bg-card p-6 ring-1 ring-foreground/10"><Skeleton className="h-6 w-32" />{Array.from({ length: 4 }, (_, index) => <div className="flex gap-3" key={index}><Skeleton className="size-8 shrink-0 rounded-full" /><div className="grid flex-1 gap-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-3 w-full" /></div></div>)}</div>
                <SkeletonCard titleWidth="w-52" rows={4} />
            </div>
        </PageContainer>
    );
}

function StoreCreationSkeleton() {
    return <PageContainer><PageHeading /><div className="rounded-xl bg-card p-6 ring-1 ring-foreground/10"><Skeleton className="mb-2 h-6 w-40" /><Skeleton className="mb-6 h-4 w-72 max-w-full" /><div className="grid max-w-md gap-5"><FieldSkeleton /><FieldSkeleton /><Skeleton className="h-12 w-44" /><Skeleton className="h-10 w-full" /></div></div></PageContainer>;
}

function StoreDetailsSkeleton() {
    return <PageContainer><PageHeading description={false} /><Skeleton className="h-6 w-64 max-w-full" /><SkeletonCard titleWidth="w-40" rows={3} /><SkeletonCard titleWidth="w-20" rows={5} /></PageContainer>;
}

function CompanyDetailsSkeleton() {
    return <PageContainer><PageHeading /><SkeletonCard titleWidth="w-64" rows={4} /><div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.6fr)]"><SkeletonCard titleWidth="w-40" rows={4} /><SkeletonCard titleWidth="w-48" rows={4} /></div></PageContainer>;
}

function TablePageSkeleton() {
    return <PageContainer><PageHeading /><div className="flex flex-wrap gap-2"><Skeleton className="h-9 w-36" /><Skeleton className="h-9 w-28" /><Skeleton className="h-9 w-32" /></div><SkeletonCard titleWidth="w-44" rows={7} /></PageContainer>;
}

function DocumentationSkeleton() {
    return <PageContainer><PageHeading /><div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]"><SkeletonCard titleWidth="w-32" rows={6} /><SkeletonCard titleWidth="w-64" rows={8} /></div></PageContainer>;
}

function SplitFormSkeleton() {
    return (
        <main className="grid min-h-svh grid-cols-1 gap-4 bg-secondary p-4 sm:p-6 lg:h-svh lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)] lg:overflow-hidden" aria-busy="true">
            <div className="hidden rounded-3xl bg-primary p-7 lg:flex lg:flex-col lg:justify-between"><Skeleton className="h-5 w-20 bg-primary-foreground/20" /><Skeleton className="h-20 w-64 self-end bg-primary-foreground/20" /></div>
            <div className="grid content-center gap-5 rounded-3xl bg-card p-6 sm:p-10 lg:p-12"><Skeleton className="h-8 w-52" /><Skeleton className="h-12 w-full" /><div className="grid grid-cols-3 gap-2"><Skeleton className="h-10" /><Skeleton className="h-10" /><Skeleton className="h-10" /></div><Skeleton className="h-28 w-full" /><Skeleton className="h-24 w-full" /><Skeleton className="h-12 w-full" /></div>
            <span className="sr-only">Загрузка страницы</span>
        </main>
    );
}

function AuthSkeleton({ pathname }: { pathname: string }) {
    const fieldCount = pathname === "/sign-up" ? 4 : 2;

    return (
        <main className="grid min-h-svh grid-cols-1 gap-4 bg-secondary p-4 sm:p-6 lg:h-svh lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)] lg:overflow-hidden" aria-busy="true">
            <div className="hidden rounded-3xl bg-primary p-7 lg:flex lg:flex-col lg:justify-between"><Skeleton className="h-5 w-20 bg-primary-foreground/20" /><Skeleton className="h-20 w-64 self-end bg-primary-foreground/20" /></div>
            <div className="grid content-center gap-5 rounded-3xl bg-card p-6 sm:p-10 lg:p-12"><Skeleton className="h-9 w-48" />{Array.from({ length: fieldCount }, (_, index) => <FieldSkeleton key={index} />)}<Skeleton className="h-12 w-full" /><Skeleton className="mx-auto h-4 w-52" /></div>
            <span className="sr-only">Загрузка страницы</span>
        </main>
    );
}

function SkeletonCard({ titleWidth, rows }: { titleWidth: string; rows: number }) {
    return (
        <section className="grid gap-4 rounded-xl bg-card p-6 ring-1 ring-foreground/10">
            <Skeleton className={`h-6 ${titleWidth}`} />
            {Array.from({ length: rows }, (_, index) => <Skeleton className={`h-10 w-full ${index === rows - 1 ? "max-w-[85%]" : ""}`} key={index} />)}
        </section>
    );
}

function FieldSkeleton() {
    return <div className="grid gap-2"><Skeleton className="h-4 w-28" /><Skeleton className="h-12 w-full rounded-xl" /></div>;
}

function FilterSkeleton({ width, textWidth, hasCalendar = false }: { width: string; textWidth: string; hasCalendar?: boolean }) {
    return (
        <div className={`flex h-11 ${width} items-center gap-2 rounded-lg border border-border bg-card px-3`}>
            {hasCalendar && <Skeleton className="size-4 shrink-0 rounded-sm" />}
            <Skeleton className={`h-3 ${textWidth}`} />
            <Skeleton className="ml-auto size-3 shrink-0 rounded-sm" />
        </div>
    );
}

export function StandalonePageLoadingLayout() {
    return <PageLoadingBoundary />;
}

export default PageLoadingBoundary;
