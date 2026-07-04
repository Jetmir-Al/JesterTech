import { useMutation } from "@tanstack/react-query";
import type { IAskAiParams } from "../../types/IAi";
import { AskAi, AskAiCompare, AskAiGeneral, AskAiPurchases } from "../../api/aiApi";

export const useAskAi = () => {
    return useMutation({
        mutationFn: async ({ productId, userQuestion, preference }: IAskAiParams) => {
            return await AskAi(productId, userQuestion, preference);
        }
    });
};

export const useAskAiGeneral = () => {
    return useMutation({
        mutationFn: async (params: { userQuestion: string, preference: string }) => {
            return await AskAiGeneral(params.userQuestion, params.preference);
        }
    });
}

export const useAskAiPurchases = () => {
    return useMutation({
        mutationFn: async (params: { userQuestion: string, preference: string }) => {
            return await AskAiPurchases(params.userQuestion, params.preference);
        }
    });
}

export const useAskAiCompare = () => {
    return useMutation({
        mutationFn: async (params: { productIds: number[], userQuestion: string, preference: string }) => {
            return await AskAiCompare(params.productIds, params.userQuestion, params.preference);
        }
    });
}