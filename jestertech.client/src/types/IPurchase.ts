
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



export interface PurchaseFormProps {
    setBuyForm: () => void;
    Quantity: number;
    id: number;
    productName: string;
    productPrice: number;
}

export interface IPurchaseAdvanced {
    purchases: IPurchase[];
    page: number;
    pageSize: number;
    totalCount: number;
}

export interface IPurchaseParams {
    params: {
        page?: string;
        pageSize?: string;
    }
}