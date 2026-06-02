import { CreatePurchase, GetPurchases } from "../api/purchaseApi";


export const PurchaseService = {
    getPurchases: async (userId: number) => {
        if (!userId || userId === 0) {
            throw new Error("Invalid Session");
        }
        return await GetPurchases(userId);
    },
    createPurchase: async (productId: number, CardholderName: string, CardNumber: string, quantity: number) => {
        if (!productId || !CardholderName || !CardNumber || !quantity || productId === 0 || quantity === 0) {
            throw new Error("All fields are required");
        }
        return await CreatePurchase(productId, CardholderName, CardNumber, quantity);
    }
}