import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetReviews, AddReview } from "../../api/reviewApi";
import type { IReviewParams } from "../../types/IReview";


export const useGetReviews = ({productId, pageNumber = 1, pageSize = 10}: IReviewParams) => {
    return useQuery({
        queryKey: ["reviews", productId, pageNumber, pageSize],
        queryFn: () => GetReviews(productId, pageNumber, pageSize)
    });
};

export const useCreateReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (params: { rating: number, comment: string, productId: number }) => {
            return await AddReview(params.rating, params.comment, params.productId);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["reviews"] });
            await queryClient.invalidateQueries({ queryKey: ["productDetails"] });
           
        },
        onError: (err) => {
            console.error("Error during review creation", err);
        }
    });
}
