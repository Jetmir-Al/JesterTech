import { useQuery , useMutation, useQueryClient} from "@tanstack/react-query"
import { CreatePurchase, GetPurchases } from "../../api/purchaseApi";


export const useGetPurchases = (userId: number) => {
    return useQuery({
        queryKey: ["purchases", userId],
        queryFn: () => GetPurchases(userId)
    });
};  

export const useCreatePurchase = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (params: { productId: number, CardholderName: string, CardNumber: string, quantity: number }) => {
            return await CreatePurchase(params.productId, params.CardholderName, params.CardNumber, params.quantity);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["purchases"] });
        },
        onError: (err) => {
            console.error("Error during purchase creation", err);
        }
    });
}
