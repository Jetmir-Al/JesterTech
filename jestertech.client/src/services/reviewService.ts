import { AddReview, GetReviews } from "../api/reviewApi";

export const ReviewService = {
    addReview: async (rating: number, comment: string, productId: number) => {
        if (!rating || !comment || !productId || rating === 0 || productId === 0) {
            throw new Error("All fields are required");
        }
        return await AddReview(rating, comment, productId);
    },
    getReviews: async (productId: number) => {
        if (!productId || productId === 0) {
            throw new Error("Invalid Product");
        }
        return await GetReviews(productId);
    }
}