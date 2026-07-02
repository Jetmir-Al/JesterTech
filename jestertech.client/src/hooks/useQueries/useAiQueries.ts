import { useMutation } from "@tanstack/react-query";
import type { IAskAiParams } from "../../types/IAi";
import { AskAi, AskAiGeneral, AskAiPurchases } from "../../api/aiApi";

export const useAskAi = () => {
    return useMutation({
        mutationFn: async ({ productId, userQuestion }: IAskAiParams) => {
            return await AskAi(productId, userQuestion);
        }
    });
};

export const useAskAiGeneral = () => {
    return useMutation({
        mutationFn: async (params: { userQuestion: string }) => {
            return await AskAiGeneral(params.userQuestion);
        }
    });
}

export const useAskAiPurchases = () => {
    return useMutation({
        mutationFn: async (params: { userQuestion: string }) => {
            return await AskAiPurchases(params.userQuestion);
        }
    });
}