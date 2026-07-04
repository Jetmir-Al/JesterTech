import { type IAskAI } from "../types/IAi"
import { api } from "./api"



export const AskAi = async (productId: number, UserQuestion: string, preference: string) => {
    return await api.post <IAskAI>("/Ai/ask",
        { productId, UserQuestion, preference},
        { credentials: 'include' }
    )
}

export const AskAiGeneral = async (userQuestion: string, preference: string) => {
    return await api.post<IAskAI>("/Ai/ask-general", {
        userQuestion,
        preference  
    },
        { credentials: "include" }
    );
}

export const AskAiPurchases = async (userQuestion: string, preference: string) => {
    return await api.post<IAskAI>("/Ai/ask-purchases", {
        userQuestion,
        preference
    },
        { credentials: "include" }
    );
}

export const AskAiCompare = async (productIds: number[], userQuestion: string, preference: string) => {
    return await api.post<IAskAI>("/Ai/ask-AiCompare", {
        productIds,
        userQuestion,
        preference
    },
    );
}