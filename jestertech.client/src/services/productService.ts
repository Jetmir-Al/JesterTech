import { GetProductById, GetProductsAdvanced } from "../api/productApi";
import type { IProductParams } from "../types/IProduct";

export const ProductService = {
    getProductById: async (id: number) => {
        if (!id || id === 0) {
            throw new Error("Product ID is required");
        }
        const response = await GetProductById(id);
        return response;
    },

    getProductsAdvanced: async ({ params }: IProductParams) => {
        if (!params) {
            throw new Error("Product parameters are required");
        }
        const response = await GetProductsAdvanced({ params });
        return response;
    },

}