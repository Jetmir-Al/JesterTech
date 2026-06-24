

export interface IAskAI {
    answer: string;
}
export interface IAskAiParams {
    productId: number;
    userQuestion: string;
}

export interface IDisplayAi {
    mode: "details" | "general";
}
export interface IAskAiDetailsProps {
    mode: "details" | "general";
    setDisplay: () => void;
}