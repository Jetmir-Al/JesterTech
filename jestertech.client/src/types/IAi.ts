

export interface IAskAI {
    answer: string;
}
export interface IAskAiParams {
    productId: number;
    userQuestion: string;
    preference: string;
}

export interface IDisplayAi {
    mode: "details" | "general" | "purchases";
}
export interface IAskAiDetailsProps {
    mode: "details" | "general" | "purchases";
    setDisplay: () => void;
}