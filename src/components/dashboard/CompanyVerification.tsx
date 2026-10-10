import { ArrowUpRight, List, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router";
import BadgeUI from "@/components/ui/BadgeUI";
import StepperUI from "@/components/ui/StepperUI";
import { companyOnboardingStepsMock } from "@/components/ui/StepperUI.mock";
import StoreTasks from "@/components/dashboard/StoreTasks";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import BasePageWrapperUI from "@/components/ui/BasePageWrapperUI.tsx";
import { APP_ROUTES } from "@/app/routes.constants.ts";

function CompanyVerification() {
    return (
        <BasePageWrapperUI
            title="Здравствуйте, Иван"
            description="Аккаунт создан. Ниже — что осталось до боевых платежей."
        >
            <Card>
                <CardHeader className="gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <div className="grid gap-2">
                        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                            Подключение компании
                        </h2>
                        <CardDescription className="flex flex-wrap items-center gap-2">
                            <BadgeUI type="info" text="Анкета не заполнена" />
                            <span>Заполните анкету — 15 минут</span>
                        </CardDescription>
                    </div>
                    <Button asChild className="w-full px-5 py-6 sm:w-auto">
                        <Link to={APP_ROUTES.companyApplication}>Заполнить анкету</Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <StepperUI data={companyOnboardingStepsMock} />
                </CardContent>
            </Card>

            <StoreTasks />

            <div className="grid gap-4 lg:grid-cols-2">
                <EmptyStateCard
                    eyebrow="Операции"
                    title="Здесь появятся операции"
                    description="После первого тестового платежа в магазине — они появятся здесь."
                    icon={List}
                    link={APP_ROUTES.stores}
                    linkLabel="Создать магазин"
                />
                <EmptyStateCard
                    eyebrow="Выплаты"
                    title="Здесь появятся выплаты на счёт"
                    description="Первая выплата поступит на следующий рабочий день после боевого платежа."
                    icon={Wallet}
                    link={APP_ROUTES.balance}
                    linkLabel="Как устроены выплаты"
                />
            </div>
        </BasePageWrapperUI>
    );
}

interface EmptyStateCardProps {
    eyebrow: string;
    title: string;
    description: string;
    icon: LucideIcon;
    link: string;
    linkLabel: string;
}

function EmptyStateCard({ eyebrow, title, description, icon: Icon, link, linkLabel }: EmptyStateCardProps) {
    return (
        <Card className="min-h-64">
            <CardHeader>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{eyebrow}</p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col items-center justify-center pb-6 text-center">
                <span className="mb-3 flex size-12 items-center justify-center rounded-xl bg-muted text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
                <Button variant="link" asChild className="mt-2 h-auto gap-1 p-0">
                    <Link to={link}>
                        {linkLabel} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}

export default CompanyVerification;
