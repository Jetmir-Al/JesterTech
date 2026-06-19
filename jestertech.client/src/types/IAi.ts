

export interface IAskAI {
    answer: string;
}
export interface IAskAiParams {
    productId: number;
    userQuestion: string;
}

export interface IAskAiDetailsProps {
    mode: "details" | "general";
    setDisplay: () => void;
}