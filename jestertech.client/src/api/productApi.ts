import type { IProduct, IProductAdvanced, IProductDashboardAdvanced, ITopProduct } from "../types/IProduct";
import { api } from "./api";


export const GetProductById = async (id: number): Promise<IProduct> => {
    const response = await api.get<IProduct>(`/Product/${id}`);
    return response as IProduct;
}

export const GetFeaturedProducts = async (): Promise<IProduct[]> => {
    const response = await api.get<IProduct[]>(`/Product/featured`);
    return response as IProduct[];
}

export const GetTopProducts = async (): Promise<ITopProduct[]> => {
    const response = await api.get<ITopProduct[]>(`/Product/topProducts`);
    return response as ITopProduct[];
}


export const GetProductByCategory = async (category: string): Promise<IProduct[]> => {
    const response = await api.get<IProduct[]>(`/Product/productsByCategory?category=${category}`);
    return response as IProduct[];
}


export const GetProductCategories = async (): Promise<string[]> => {
    const response = await api.get<string[]>(`/Product/categories`);
    return response as string[];
}

export const GetProductBrands = async (): Promise<string[]> => {
    const response = await api.get<string[]>(`/Product/brands`);
    return response as string[];
}

export const GetProductsAdvanced = async (params: string): Promise<IProductAdvanced> => {

    const response = await api.get<IProductAdvanced>(`/Product/advanced?${params}`);
    return response as IProductAdvanced;
}

export const GetProductsDashboardAdvanced = async (params: string): Promise<IProductDashboardAdvanced> => {

    const response = await api.get<IProductDashboardAdvanced>(`/Product/DashboardProducts?${params}`);
    
    return response as IProductDashboardAdvanced;
}

export const GetAllProducts = async (): Promise<IProduct[]> => {
    const response = await api.get<IProduct[]>('/Product/products');
    return response as IProduct[];
}

export const getImageUrl = (filename: string) => {
    return `${import.meta.env.VITE_IMG_API_URL}/${filename}`;
}

export const InsertProduct = async (product: FormData) => {
    await api.post('/Product/InsertProduct',
        product,
        { credentials: 'include' });
}
export const UpdateProductImg = async (ImgFile: FormData, id: number) => {
    await api.put(`/Product/UpdateProductImg/${id}`,
        ImgFile,
        { credentials: 'include' });
}

export const DeleteProduct = async (id: number) => {
    await api.delete(`/Product/DeleteProduct/${id}`,
        { credentials: 'include' });
}


export const UpdateProduct = async (id: number, product: FormData) => {
    await api.put(`/Product/UpdateProduct/${id}`,
        product,
        {
            credentials: 'include'
        });
}