import { type IAPIMessage } from "../types/apiTypes";
import type { IReviewPagination } from "../types/IReview";
import { api } from "./api";


export const AddReview = async (rating: number, comment: string, productId: number) => {
    const response = await api.post<IAPIMessage>(`/Review/add/${productId}`,
        { rating, comment },
        { credentials: 'include' }
    );
    return response;
}

export const GetReviews = async (productId: number, pageNumber: number = 1, pageSize: number = 5) => {
    const response = await api.get<IReviewPagination>(`/Review/product/${productId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        { credentials: 'include' }
    );
    return response;
}

