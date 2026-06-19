import { type IAskAI } from "../types/IAi"
import { api } from "./api"



export const AskAi = async (productId: number, UserQuestion: string) => {
    return await api.post <IAskAI>("/Ai/ask",
        { productId, UserQuestion},
        { credentials: 'include' }
    )
}

export const AskAiGeneral = async (userQuestion: string) => {
    return await api.post<IAskAI>("/Ai/ask-general", {
        userQuestion
    },
        { credentials: "include" })
}