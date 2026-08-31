import type { IProduct, IProductAdvanced } from "../types/IProduct";
import { api } from "./api";


export const GetProductById = async (id: number) => {
    const response = await api.get<IProduct>(`/Product/${id}`);
    return response;
}

export const GetFeaturedProducts = async () => {
    const response = await api.get<IProduct[]>(`/Product/featured`);
    return response;
}

export const GetTopProducts = async () => {
    const response = await api.get<IProduct[]>(`/Product/topProducts`);
    return response;
}


export const GetProductCategories = async () => {
    const response = await api.get<string[]>(`/Product/categories`);
    return response;
}

export const GetProductBrands = async () => {
    const response = await api.get<string[]>(`/Product/brands`);
    return response;
}

export const GetProductsAdvanced = async (params: string) => {
   
    const response = await api.get<IProductAdvanced>(`/Product/advanced?${params}`);
    if (response !== null) {
        return response;
    }
}

export const GetAllProducts = async () => {
    const response = await api.get<IProduct[]>('/Product/products');
    return response;
}

export const getImageUrl = (filename: string) => {
    return `${import.meta.env.VITE_IMG_API_URL}/${filename}`;
}


