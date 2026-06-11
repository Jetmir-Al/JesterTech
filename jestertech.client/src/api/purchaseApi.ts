import type { IAPIMessage } from "../types/apiTypes";
import type { IPurchase } from "../types/IPurchase";
import { api } from "./api";


export const CreatePurchase = async (productId: number, CardholderName: string, CardNumber: string, quantity: number) => {
    const response = await api.post<IAPIMessage>(`/Purchase/create/${productId}`,
        { CardholderName, CardNumber, quantity },
        { credentials: 'include' }
    );
    return response;
}

export const GetPurchases = async (userId: number) => {
    const response = await api.get<IPurchase[]>(`/Purchase/user/${userId}`,
        { credentials: 'include' }
    );
    return response;
}