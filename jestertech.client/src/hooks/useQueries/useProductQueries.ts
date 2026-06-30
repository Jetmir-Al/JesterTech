import { useQuery } from "@tanstack/react-query";
import { GetProductById, GetProductCategories, GetProductsAdvanced } from "../../api/productApi";
import type { IProductParams } from "../../types/IProduct";

export const useGetProductById = (id: number) => {
    return useQuery({
        queryKey: ["productDetails", id],
        queryFn: async () => {
            if (!id || id === 0) {
                throw new Error("Product ID is required");
            }
            const response = await GetProductById(id);
            return response;
        },
        enabled: !!id && id !== 0,
    }); 
}

export const useGetProductsAdvanced = ({ params }: IProductParams) => {
    return useQuery({
        queryKey: ["products-advanced", params],
        queryFn: async () => {
            const response = await GetProductsAdvanced({ params });
            return response;
        },
    });
}

export const useGetProductCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            return await GetProductCategories();
        },
    });
}


