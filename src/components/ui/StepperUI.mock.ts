export type StepperStepStatus = "completed" | "current" | "upcoming";

export type StepperStep = {
    id: string;
    title: string;
    description: string;
    status: StepperStepStatus;
};

/** Static dashboard example for the company onboarding stepper. */
export const companyOnboardingStepsMock: StepperStep[] = [
    {
        id: "registration",
        title: "Регистрация",
        description: "Вы · 20 сентября",
        status: "completed",
    },
    {
        id: "questionnaire",
        title: "Анкета",
        description: "Вы · не начали",
        status: "current",
    },
    {
        id: "verification",
        title: "Проверка",
        description: "Банк",
        status: "upcoming",
    },
    {
        id: "agreement",
        title: "Договор",
        description: "Вы",
        status: "upcoming",
    },
];
