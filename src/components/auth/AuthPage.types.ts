export type FormMode = "sign-in" | "sign-up";

export interface FormFields {
    id: string;
    name: string;
    label: string;
    type: "text" | "email" | "password";
    autoComplete: string;
}