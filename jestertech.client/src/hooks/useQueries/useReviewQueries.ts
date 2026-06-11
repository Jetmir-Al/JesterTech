import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetReviews, AddReview } from "../../api/reviewApi";


export const useGetReviews = (productId: number) => {
    return useQuery({
        queryKey: ["reviews", productId],
        queryFn: () => GetReviews(productId)
    });
};

export const useCreateReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (params: { rating: number, comment: string, productId: number }) => {
            return await AddReview(params.rating, params.comment, params.productId);
        },
        onSuccess: () => {
             queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
        onError: (err) => {
            console.error("Error during review creation", err); 
        }
    });
}
