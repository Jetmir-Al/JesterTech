import type { IProductParams } from "../types/IProduct";
import { api } from "./api";


export const GetProductById = async (id: number) => {
    try {
        const response = await api.get(`/Products/${id}`);
        return response;
    }
    catch {
        return "Problem with getting product!";
    }
}

export const GetFeaturedProducts = async () => {
    try {
        const response = await api.get(`/Products/featured`);
        return response;
    } catch {
        return "Problem with getting featured products!";
    }
}

export const GetProductCategories = async () => {
    try {
        const response = await api.get(`/Products/categories`);
        return response;
    } catch {
        return "Problem with getting product categories!";
    }
}


export const GetProductsAdvanced = async ({ params }: IProductParams) => {
    try {
        const searchParams = new URLSearchParams();

        if (params.page) searchParams.append("page", params.page);
        if (params.pageSize) searchParams.append("pageSize", params.pageSize);
        if (params.search) searchParams.append("search", params.search);
        if (params.categories) searchParams.append("categories", params.categories);
        if (params.sort) searchParams.append("sort", params.sort);

        const queryString = searchParams.toString();

        const response = await api.get(`/Product/advanced?${queryString}`);
        return response;
    } catch {
        return "Problem with getting advanced products!";
    }
}