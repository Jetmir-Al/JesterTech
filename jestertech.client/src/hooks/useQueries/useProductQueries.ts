import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteProduct, GetProductById, GetProductCategories, GetProductsAdvanced, InsertProduct, UpdateProductImg } from "../../api/productApi";
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
        queryKey: ["products-advanced", params.page,
            params.pageSize,
            params.search,
            params.sort,
            ...(params.categories || [])],
        queryFn: async () => {
            const searchParams = new URLSearchParams();

            if (params.page) searchParams.append("page", params.page);
            if (params.pageSize) searchParams.append("pageSize", params.pageSize);
            if (params.search) searchParams.append("search", params.search);
            if (params.sort) searchParams.append("sort", params.sort);
            if (params.categories) {
                if (Array.isArray(params.categories)) {
                    params.categories.forEach(category => {
                        searchParams.append("categories", category);
                    });
                } else {
                    searchParams.append("categories", params.categories);
                }
            }


            const queryString = searchParams.toString();

            const response = await GetProductsAdvanced(queryString);
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


export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            return await DeleteProduct(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products-advanced"] });
        }
    });
}


export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async({id, img}: {id: number, img: File | null}) => {
            return await UpdateProductImg(img, id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products-advanced"] });
        }
    });
}

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (product: FormData) => {
            return await InsertProduct(product);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products-advanced"] });
        }
    });
}