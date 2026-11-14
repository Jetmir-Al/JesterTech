

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

export interface IProductUpdateImg{
    imgFile: File | null;
}



export interface IUpdateProductImgProps{
    img: string | null;
    onClose: () => void;
    productId: number | null;
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




export interface ICreateProductProps{
  setShowCreateProduct: () => void;
  product: IProduct | null;
  editing: boolean;
}

export const emptyProduct: IProductUpload = {
    title: "",
    brand: "",
    garantee: 0,
    price: 0,
    category: "",
    quantity: 0,
    specifications: "",
    imgFile: null,
};

export type FieldName = keyof IProductUpload;

export const STEPS: { label: string; required: FieldName[] }[] = [
    { label: "Basics", required: ["title", "brand", "category"] },
    { label: "Pricing", required: [] },
    { label: "Details", required: [] },
    { label: "Image", required: [] },
    { label: "Review", required: [] },
];

export const FIELD_LABELS: Partial<Record<FieldName, string>> = {
    title: "Product title",
    brand: "Brand",
    category: "Category",
};