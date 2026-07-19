import { useQuery , useMutation, useQueryClient} from "@tanstack/react-query"
import { CreatePurchase, GetPurchases } from "../../api/purchaseApi";
import type { IPurchaseParams } from "../../types/IPurchase";


export const useGetPurchases = ({ params }: IPurchaseParams) => {
    return useQuery({
        queryKey: ["purchases", params],
        queryFn: () => GetPurchases({ params })
    });
};  

export const useCreatePurchase = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (params: { productId: number, CardholderName: string, CardNumber: string, quantity: number, address: string }) => {
            return await CreatePurchase(params.productId, params.CardholderName, params.CardNumber, params.quantity, params.address);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["purchases"] });
        },
        onError: (err) => {
            console.error("Error during purchase creation", err);
        }
    });
}
