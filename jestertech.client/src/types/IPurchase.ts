
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