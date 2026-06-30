import type { IProductParams, IProduct, IProductAdvanced } from "../types/IProduct";
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

export const GetProductsAdvanced = async ({ params }: IProductParams) => {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append("page", params.page);
    if (params.pageSize) searchParams.append("pageSize", params.pageSize);
    if (params.search) searchParams.append("search", params.search);
    if (params.categories) searchParams.append("categories", params.categories);
    if (params.sort) searchParams.append("sort", params.sort);

    const queryString = searchParams.toString();

    const response = await api.get<IProductAdvanced>(`/Product/advanced?${queryString}`);
    if (response !== null) {
        return response;
    }
}

export const getImageUrl = (filename: string) => {
    return `${import.meta.env.VITE_IMG_API_URL}/${filename}`;
}


