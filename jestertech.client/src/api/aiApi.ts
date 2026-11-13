import { type IAskAI } from "../types/IAi"
import { api } from "./api"



export const AskAi = async (productId: number, UserQuestion: string, preference: string): Promise<IAskAI> => {
    return await api.post <IAskAI>("/Ai/ask",
        { productId, UserQuestion, preference},
        { credentials: 'include' }
    ) as IAskAI;
}

export const AskAiGeneral = async (userQuestion: string, preference: string): Promise<IAskAI> => {
    return await api.post<IAskAI>("/Ai/ask-general", {
        userQuestion,
        preference  
    },
        { credentials: "include" }
    ) as IAskAI;
}

export const AskAiPurchases = async (userQuestion: string, preference: string): Promise<IAskAI> => {
    return await api.post<IAskAI>("/Ai/ask-purchases", {
        userQuestion,
        preference
    },
        { credentials: "include" }
    ) as IAskAI;
}

export const AskAiCompare = async (productIds: number[], userQuestion: string, preference: string): Promise<IAskAI> => {
    return await api.post<IAskAI>("/Ai/ask-AiCompare", {
        productIds,
        userQuestion,
        preference
    },
        { credentials: "include" }
    ) as IAskAI;
}