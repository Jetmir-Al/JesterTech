import type { IAPIMessage } from "../types/apiTypes";
import type { IPurchaseAdvanced, IPurchaseParams } from "../types/IPurchase";
import { api } from "./api";


export const CreatePurchase = async (productId: number, CardholderName: string, CardNumber: string, quantity: number, address: string) => {
    const response = await api.post<IAPIMessage>(`/Purchase/create/${productId}`,
        { CardholderName, CardNumber, quantity, address },
        { credentials: 'include' }
    );
    return response;
}

export const GetPurchases = async ({ params }: IPurchaseParams) => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append("page", params.page);
    if (params.pageSize) searchParams.append("pageSize", params.pageSize);
    const response = await api.get<IPurchaseAdvanced>(`/Purchase/user`,
        { credentials: 'include' }
    );
    return response;
}