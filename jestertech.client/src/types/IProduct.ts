

export interface IProductParams {
    params: {
        page?: string;
        pageSize?: string;
        search?: string;
        categories?: string;
        sort?: string;
    }
}

export interface IProduct {
    id: number;
    title: string;
    brand: string;
    garantee: number;
    price: number;
    category: string;
    image: string;
    quantity: number;
}

export interface IProductAdvanced {
    data: IProduct[];
    page: number;
    totalProducts: number;
    totalPages: number;
}