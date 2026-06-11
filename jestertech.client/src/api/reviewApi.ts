import { type IAPIMessage } from "../types/apiTypes";
import type { IReview } from "../types/IReview";
import { api } from "./api";


export const AddReview = async (rating: number, comment: string, productId: number) => {
    const response = await api.post<IAPIMessage>(`/Review/add/${productId}`,
        { rating, comment },
        { credentials: 'include' }
    );
    return response;
}

export const GetReviews = async (productId: number) => {
    const response = await api.get<IReview[]>(`/Review/get/${productId}`,
        { credentials: 'include' }
    );
    return response;
}

