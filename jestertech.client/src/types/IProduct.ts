

export interface IProductParams {
    params: {
        page?: string;
        pageSize?: string;
        search?: string;
        categories?: string[];
        sort?: string;
    }
}

export interface IProductDashboardParams {
    params: {
        page?: string;
        pageSize?: string;
        search?: string;
    }
}
export interface IProductUpload {
    title: string;
    brand: string;
    garantee: number;
    price: number;
    category: string;
    quantity: number;
    specifications: string;
    imgFile: File | null;
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
    specifications: string;
    averageRating: number;
}

export interface IProductPage {
    id: number;
    title: string;
    price: number;
    image: string;
    averageRating: number;
}

export interface ITopProduct {
    img: string;
}

export interface IProductUpload {
    title: string;
    brand: string;
    garantee: number;
    price: number;
    category: string;
    quantity: number;
    specifications: string;
    imgFile: File | null;
}

export interface IProductAdvanced {
    totalCount: number;
    page: number;
    pageSize: number;
    products: IProductPage[];
}


export interface IProductDashboardAdvanced{
    totalCount: number;
    page: number;
    pageSize: number;
    products: IProduct[];
}