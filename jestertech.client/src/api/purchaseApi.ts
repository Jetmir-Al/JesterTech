import { api } from "./api";


export const CreatePurchase = async (productId: number, CardholderName: string, CardNumber: string, quantity: number) => {
    try {
        const response = await api.post(`/Purchase/create/${productId}`, { CardholderName, CardNumber, quantity });
        return response;
    }
    catch {
        return "Problem with creating purchase!";
    }
}

export const GetPurchases = async (userId: number) => {
    try {
        const response = await api.get(`/Purchase/user/${userId}`);
        return response;
    }
    catch {
        return "Problem with getting purchases!";
    }
}