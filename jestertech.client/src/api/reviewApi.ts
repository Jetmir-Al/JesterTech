import { api } from "./api";


export const AddReview = async (rating: number, comment: string, productId: number) => {
    try {
        const response = await api.post(`/Review/add/${productId}`, { rating, comment });
        return response;
    }
    catch {
        return "Problem with adding review!";
    }
}

export const GetReviews = async (productId: number) => {
    try {
        const response = await api.get(`/Review/get/${productId}`);
        return response;
    }
    catch {
        return "Problem with getting reviews!";
    }
}

