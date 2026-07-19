
export interface IPurchase {
    id: number;
    userName: string;
    productTitle: string;
    quantity: number;
    total: number;
    purchaseDate: string;
    cardholderName: string;
    maskedCardNumber: string;
    image: string;
    address: string;
}

export interface IPurchaseAdvanced {
    data: IPurchase[];
    page: number;
    totalPurchases: number;
    totalPages: number;
}

export interface IPurchaseParams {
    params: {
        page?: string;
        pageSize?: string;
    }
}