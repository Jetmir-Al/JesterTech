import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useUpdateProductImg } from "../../hooks/useQueries/useProductQueries";
import { useToggleAlertHook } from "../../hooks/useToggle/useToggleAlert";
import type { IProductUpdateImg, IUpdateProductImgProps } from "../../types/IProduct";
import Button from "../ui/Button";
import { getImageUrl } from "../../api/productApi";
import ImageView from "../ui/ImageView";
import "./createProduct.css";



function UpdateProductImg({ onClose, img, productId }: IUpdateProductImgProps) {
    const [formData, setFormData] = useState<IProductUpdateImg>({
        imgFile: null,
    });

    const { setShowAlert, setMessage, setType } = useToggleAlertHook();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [showImg, setShowImg] = useState<boolean>(false);
    const [showImgUploaded, setShowImgUploaded] = useState<boolean>(false);

    const { mutateAsync: updateProductImg, isPending: isUpdatingProductImg } = useUpdateProductImg();

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

    useEffect(() => {
        function handleOpen() {
            setFormData({
                imgFile: null,
            });
        }

        handleOpen();
    }, []);


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setShowAlert(false);
            if (!productId) return;

            const data = new FormData();

            if (formData.imgFile) {
                data.append("imgFile", formData.imgFile);
            }

            setShowAlert(true);
            setType("info");
            setMessage("Processing action...");
            await updateProductImg({
                id: productId,
                img: data
            });

            setType("success");
            setMessage("Product image updated successfully!");

            onClose();
        } catch {
            setShowAlert(true);
            setType("error");
            setMessage("Problem updating product image. \n Try again later!");
        }
    };

    return (
        <div className="edit-product-container">
            <div className="create-product-container">

                <div className="create-product-header">
                    <h2>
                        Updating product image
                    </h2>
                    <p>Update the image for this product.</p>
                </div>

                <form className="create-product-form" onSubmit={handleSubmit}>
                    <div className="form-grid">

                        {/* Image File Upload & URL */}
                        <div className="img-beside-container">
                            <div className="form-group span-2">
                                <label>Current Image: </label>
                                <div className="image-preview-container">
                                    <img
                                        src={getImageUrl(img ?? "")}
                                        alt="Preview"
                                        className="image-preview"
                                        onClick={() => setShowImg(true)}
                                    />
                                </div>
                            </div>
                            {previewImage && (
                                <div className="form-group span-2">
                                    <label>Uploaded Image: </label>
                                    <div className="image-preview-container">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="image-preview"
                                            onClick={() => setShowImgUploaded(true)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
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

                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="form-actions">
                        <Button type="button" className="back-product-btn"
                            onClick={() => onClose()}>
                            Back
                        </Button>
                        <Button
                            type="submit"
                            disabled={isUpdatingProductImg}
                            className="submit-product-btn">
                            Save
                        </Button>
                    </div>
                </form>

                {
                    (showImgUploaded || showImg) && (
                        <ImageView
                            imageUrl={showImg ?
                                getImageUrl(img ?? "")
                                : showImgUploaded ?
                                    previewImage ?? ""
                                    : ""
                            }
                            alt={"Preview"}
                            onClose={() => {
                                setShowImgUploaded(false);
                                setShowImg(false);
                            }}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default UpdateProductImg;