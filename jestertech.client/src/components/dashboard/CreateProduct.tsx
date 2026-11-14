import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/Button";
import { useCreateProduct, useEditProduct } from "../../hooks/useQueries/useProductQueries";
import "./createProduct.css";
import { emptyProduct, FIELD_LABELS, STEPS, type ICreateProductProps, type IProductUpload } from "../../types/IProduct";
import { useToggleAlertHook } from "../../hooks/useToggle/useToggleAlert";
import { getImageUrl } from "../../api/productApi";

function CreateProduct({ setShowCreateProduct, product, editing }: ICreateProductProps) {
    const [formData, setFormData] = useState<IProductUpload>({
        ...emptyProduct,
        title: product?.title ?? "",
        brand: product?.brand ?? "",
        garantee: product?.garantee ?? 0,
        price: product?.price ?? 0,
        category: product?.category ?? "",
        quantity: product?.quantity ?? 0,
        specifications: product?.specifications ?? "",
        imgFile: null,
    });

    const {setShowAlert, setMessage, setType} = useToggleAlertHook(); 
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { mutateAsync: createProduct } = useCreateProduct();
    const { mutateAsync: updateProduct } = useEditProduct();

    const [step, setStep] = useState(0);
    const [furthestStep, setFurthestStep] = useState(0);
    const [errors, setErrors] = useState<Partial<Record<keyof IProductUpload, string>>>({});

    const lastStep = STEPS.length - 1;
    const currentImage = previewImage ?? (editing ? product?.image ?? null : null);

    const stepErrors = (index: number) => {
        const found: Partial<Record<keyof IProductUpload, string>> = {};
        STEPS[index].required.forEach(field => {
            if (!String(formData[field] ?? "").trim()) {
                found[field] = `${FIELD_LABELS[field] ?? field} is required.`;
            }
        });
        return found;
    };

    const goToStep = (index: number) => {
        for (let i = step; i < index; i++) {
            const found = stepErrors(i);
            if (Object.keys(found).length) {
                setStep(i);
                setErrors(found);
                return;
            }
        }
        setErrors({});
        setStep(index);
    };

    const handleNext = () => {
        const found = stepErrors(step);
        setErrors(found);
        if (Object.keys(found).length) return;

        const next = Math.min(step + 1, lastStep);
        setStep(next);
        setFurthestStep(prev => Math.max(prev, next));
    };

    const handleBack = () => {
        setErrors({});
        setStep(prev => Math.max(prev - 1, 0));
    };

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
            setErrors(prev => ({ ...prev, [name as keyof IProductUpload]: undefined }));
        }  

    };

    useEffect(() => {
        if(editing) return;
        function handleOpen() {
            setFormData({ ...emptyProduct });
            setStep(0);
            setFurthestStep(0);
            setErrors({});
            setPreviewImage(null);
        }

        handleOpen();
    }, [editing]);


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (step !== lastStep) {
            handleNext();
            return;
        }

        const invalidStep = STEPS.findIndex((_, index) => Object.keys(stepErrors(index)).length > 0);
        if (invalidStep !== -1) {
            setStep(invalidStep);
            setErrors(stepErrors(invalidStep));
            setShowAlert(true);
            setType("error");
            setMessage("Please complete the highlighted fields.");
            return;
        }

        try {
            setShowAlert(false);

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

            setShowAlert(true);
            setType("info");
            setMessage("Processing action...");
            
            if(editing && product) {
                await updateProduct({
                    id: product.id,
                    product: data
                })
            }else{
                await createProduct(data);
            }
            setShowCreateProduct();

            setType("success");
            setMessage(editing ? "Product updated successfully!" : "Product created successfully!");
        } catch {
            setShowAlert(true);
            setType("error");
            setMessage("Problem creating product. \n Try again later!");
        }
    };

    return (
        <div className="create-product-container">
            <div className="create-product-header">
                <h2>
                {
                   editing ? `Updating ${product?.title}` : "Create New Product"
                }
                </h2>
                <p>{editing ? "Modify" : "Fill out"} the specifications below to {editing ? "update the item in" : "add a new item to"} the inventory catalog.</p>
            </div>

            {/* Stepper */}
            <ol className="steps-indicator">
                {STEPS.map((entry, index) => (
                    <li
                        key={entry.label}
                        className={`step-item${index === step ? " is-active" : ""}${index < step ? " is-done" : ""}`}
                    >
                        <button
                            type="button"
                            className="step-bubble"
                            onClick={() => index <= furthestStep && goToStep(index)}
                            disabled={index > furthestStep}
                        >
                            {index < step ? <FontAwesomeIcon icon={faCheck} /> : index + 1}
                        </button>
                        <span className="step-label">{entry.label}</span>
                    </li>
                ))}
            </ol>

            <form className="create-product-form" onSubmit={handleSubmit}>
                <div className="step-panel">
                    <div className="step-panel-header">
                        <h3 className="step-panel-title">{STEPS[step].label}</h3>
                        <span className="step-counter">Step {step + 1} of {STEPS.length}</span>
                    </div>

                    <div className="form-grid">
                        {/* Step 1 — Basics */}
                        {step === 0 && (
                            <>
                                <div className="form-group span-2">
                                    <label htmlFor="title">Product Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g., Ultra HD Smart TV 4K"
                                        className={errors.title ? "is-invalid" : undefined}
                                    />
                                    {errors.title && <span className="field-error">{errors.title}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="brand">Brand</label>
                                    <input
                                        type="text"
                                        id="brand"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        placeholder="e.g., Sony, Samsung"
                                        className={errors.brand ? "is-invalid" : undefined}
                                    />
                                    {errors.brand && <span className="field-error">{errors.brand}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        placeholder="e.g., TV, Accessories"
                                        className={errors.category ? "is-invalid" : undefined}
                                    />
                                    {errors.category && <span className="field-error">{errors.category}</span>}
                                </div>
                            </>
                        )}

                        {/* Step 2 — Pricing */}
                        {step === 1 && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="price">Price ($)</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className={errors.price ? "is-invalid" : undefined}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="quantity">Quantity in Stock</label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                    />
                                </div>

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
                            </>
                        )}

                        {/* Step 3 — Specifications */}
                        {step === 2 && (
                            <div className="form-group span-2">
                                <label htmlFor="specifications">Specifications</label>
                                <textarea
                                    id="specifications"
                                    name="specifications"
                                    rows={6}
                                    value={formData.specifications}
                                    onChange={handleChange}
                                    placeholder="Enter technical details or descriptions..."
                                />
                            </div>
                        )}

                        {/* Step 4 — Image */}
                        {step === 3 && (
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
                                {currentImage && (
                                    <div className="image-preview-container">
                                        <img src={getImageUrl(currentImage)} alt="Preview" className="image-preview" />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 5 — Review */}
                        {step === 4 && (
                            <div className="review-grid">
                                <div className="review-item span-2">
                                    <span className="review-label">Title</span>
                                    <span className="review-value">{formData.title || "Not provided"}</span>
                                </div>

                                <div className="review-item">
                                    <span className="review-label">Brand</span>
                                    <span className="review-value">{formData.brand || "Not provided"}</span>
                                </div>

                                <div className="review-item">
                                    <span className="review-label">Category</span>
                                    <span className="review-value">{formData.category || "Not provided"}</span>
                                </div>

                                <div className="review-item">
                                    <span className="review-label">Price</span>
                                    <span className="review-value">${formData.price.toFixed(2)}</span>
                                </div>

                                <div className="review-item">
                                    <span className="review-label">Quantity</span>
                                    <span className="review-value">{formData.quantity}</span>
                                </div>

                                <div className="review-item">
                                    <span className="review-label">Guarantee</span>
                                    <span className="review-value">{formData.garantee} months</span>
                                </div>

                                <div className="review-item">
                                    <span className="review-label">Image</span>
                                    <span className="review-value">
                                        {formData.imgFile?.name ?? (editing ? "Current image kept" : "Not provided")}
                                    </span>
                                </div>

                                <div className="review-item span-2">
                                    <span className="review-label">Specifications</span>
                                    <span className="review-value">{formData.specifications || "Not provided"}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Form Actions */}
                <div className="form-actions">
                    <Button type="button" className="back-product-btn"
                        onClick={() => setShowCreateProduct()}>
                        Cancel
                    </Button>
                    <div className="form-actions-right">
                        {step > 0 && (
                            <Button type="button" className="back-product-btn"
                                onClick={handleBack}>
                                Back
                            </Button>
                        )}
                        {step === lastStep ? (
                            <Button key="save" type="submit" className="submit-product-btn">
                                Save Product
                            </Button>
                        ) : (
                            <Button key="next" type="button" className="submit-product-btn"
                                onClick={handleNext}>
                                Next
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateProduct;