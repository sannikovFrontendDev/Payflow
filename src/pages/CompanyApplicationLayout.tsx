import { useLocation, Outlet } from "react-router";
import BasePageWrapperUI from "@/components/ui/BasePageWrapperUI.tsx";
import StepperUI from "@/components/ui/StepperUI.tsx";
import type { StepperStep } from "@/components/ui/StepperUI.mock.ts";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { APP_ROUTES } from "@/app/routes.constants.ts";

const steps = [
    {
        path: APP_ROUTES.companyApplication,
        title: "Данные компании",
        description: "Большую часть подтянем из ЕГРЮЛ — вам останется проверить",
    },
    {
        path: APP_ROUTES.companyApplicationSignatory,
        title: "Подписант и контакты",
        description: "Руководителя и право подписи по уставу берём из ЕГРЮЛ — останется указать, кто подпишет договор и с кем связываться.",
    },
    {
        path: APP_ROUTES.companyApplicationPayoutAccounts,
        title: "Счета для выплат",
        description: "Банк подтянем по БИК. Если услуги оплачиваются на разные счета — добавьте каждый.",
    },
    {
        path: APP_ROUTES.companyApplicationReview,
        title: "Проверка данных",
        description: "Посмотрите, что уйдёт в банк, и отправьте.",
    },
] as const;

function CompanyApplicationLayout() {
    const { pathname } = useLocation();
    const currentIndex = Math.max(0, steps.findIndex((step) => step.path === pathname));
    const currentStep = steps[currentIndex];
    const stepperData: StepperStep[] = steps.map((step, index) => ({
        id: step.path,
        title: step.title,
        description: index < currentIndex ? "Готово" : index === currentIndex ? "Заполняете сейчас" : "Дальше",
        status: index < currentIndex ? "completed" : index === currentIndex ? "current" : "upcoming",
    }));

    return (
        <BasePageWrapperUI
            title={currentStep.title}
            description={`Шаг ${currentIndex + 1} из ${steps.length}. ${currentStep.description}`}
            descriptionClassName="max-w-[720px]"
            showBreadcrumbs
        >
            <div className="grid items-start gap-4 lg:grid-cols-[277px_minmax(0,1fr)]">
                <Card className="gap-4 py-6">
                    <CardHeader className="px-6">
                        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Шаги анкеты</h2>
                    </CardHeader>
                    <CardContent className="px-6">
                        <StepperUI data={stepperData} orientation="vertical" />
                    </CardContent>
                </Card>
                <Outlet />
            </div>
        </BasePageWrapperUI>
    );
}

export default CompanyApplicationLayout;
