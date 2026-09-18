import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/Button";
import { useCreateProduct, useUpdateProduct } from "../../hooks/useQueries/useProductQueries";
import "./createProduct.css";

export interface IProductUpload {
    title: string;
    brand: string;
    garantee: number;
    price: number;
    category: string;
    image: string;
    quantity: number;
    specifications: string;
    imgFile: File | null;
}

function CreateProduct({ setShowCreateProduct }: { setShowCreateProduct: () => void }) {
    const [formData, setFormData] = useState<IProductUpload>({
        title: "",
        brand: "",
        garantee: 0,
        price: 0,
        category: "",
        image: "",
        quantity: 0,
        specifications: "",
        imgFile: null,
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { mutateAsync: updateProduct } = useUpdateProduct();
    const { mutateAsync: createProduct } = useCreateProduct();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === "file") {
            const inputTarget = e.target as HTMLInputElement;
            if (inputTarget.files && inputTarget.files[0]) {
                const file = inputTarget.files[0];
                setFormData(prev => ({ ...prev, imgFile: file }));
                setPreviewImage(URL.createObjectURL(file));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === "number" ? parseFloat(value) || 0 : value
            }));
        }
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("brand", formData.brand);
            data.append("garantee", formData.garantee.toString());
            data.append("price", formData.price.toString());
            data.append("category", formData.category);
            data.append("quantity", formData.quantity.toString());
            data.append("specifications", formData.specifications);

            if (formData.imgFile) {
                data.append("imgFile", formData.imgFile);
            }
            await createProduct(data);
            setShowCreateProduct();
        } catch {
            // Handle error
        }
    };

    return (
        <div className="create-product-container">
            <div className="create-product-header">
                <h2>Create New Product</h2>
                <p>Fill out the specifications below to add a new item to the inventory catalog.</p>
            </div>

            <form className="create-product-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    {/* Title */}
                    <div className="form-group span-2">
                        <label htmlFor="title">Product Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Ultra HD Smart TV 4K"
                            required
                        />
                    </div>

                    {/* Brand */}
                    <div className="form-group">
                        <label htmlFor="brand">Brand</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            placeholder="e.g., Sony, Samsung"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g., TV, Accessories"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div className="form-group">
                        <label htmlFor="price">Price ($)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Quantity */}
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity in Stock</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Guarantee */}
                    <div className="form-group span-2">
                        <label htmlFor="garantee">Guarantee (Months)</label>
                        <input
                            type="number"
                            id="garantee"
                            name="garantee"
                            value={formData.garantee}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Specifications */}
                    <div className="form-group span-2">
                        <label htmlFor="specifications">Specifications</label>
                        <textarea
                            id="specifications"
                            name="specifications"
                            rows={4}
                            value={formData.specifications}
                            onChange={handleChange}
                            placeholder="Enter technical details or descriptions..."
                        />
                    </div>

                    {/* Image File Upload & URL */}
                    <div className="form-group span-2">
                        <label>Product Image File</label>
                        <div className="file-upload-wrapper">
                            <input
                                type="file"
                                id="imgFile"
                                name="imgFile"
                                accept="image/*"
                                onChange={handleChange}
                                className="file-input-hidden"
                            />
                            <label htmlFor="imgFile" className="file-upload-box">
                                <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
                                <span>{formData.imgFile ? formData.imgFile.name : "Choose an image file or drag it here"}</span>
                            </label>
                        </div>
                        {previewImage && (
                            <div className="image-preview-container">
                                <img src={previewImage} alt="Preview" className="image-preview" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Form Actions */}
                <div className="form-actions">
                    <Button type="button" className="back-product-btn"
                        onClick={() => setShowCreateProduct()}>
                        Back
                    </Button>
                    <Button type="submit" className="submit-product-btn">
                        Save Product
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreateProduct;