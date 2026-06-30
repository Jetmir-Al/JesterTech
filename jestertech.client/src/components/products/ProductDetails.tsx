import { useParams } from "react-router";
import { useGetProductById } from "../../hooks/useQueries/useProductQueries";
import Loading from "../../utils/Loading";
import Button from "../ui/Button";
import "./productDetails.css";
import { getImageUrl } from "../../api/productApi";
import { useAuthHook } from "../../hooks/useAuthHook";
import Reviews from "../review/Reviews";
import { useToggleAlertHook } from "../../hooks/useToggle/useToggleAlert";
import { useState } from "react";
import PurchaseForm from "../purchase/PurchaseForm";
import AiDisplay from "../ai/AiDisplay";



const ProductDetails = () => {
    const { id } = useParams();
    const { authenticated, user } = useAuthHook();
    const { data: product, isLoading } = useGetProductById(Number(id));
    const { setShowAlert, setMessage, setType } = useToggleAlertHook();
    const [toggleBuy, setToggleBuy] = useState<boolean>(false);

    async function handleBuyForm() {
        if (authenticated && user) {
            setToggleBuy(true);
        } else {
            setType("error");
            setMessage("Please create an account to proceede with this action!");
            setShowAlert(true);
        }
    }
    if (isLoading) return <Loading />

    return (
        <div className="productDetails-container">

            {
                product &&
                <>
                    <div className="productDetails">

                        <div className='productPresentation'>
                            <img className='productImg'
                                src={getImageUrl(product.image)}
                                alt={product.title} />
                            <h2 className='productTitle'>
                                {product.brand}
                            </h2>
                            {
                                product.quantity === 0 && (
                                    <div className="outOfStock-banner">
                                        Out of stock
                                    </div>
                                )
                            }
                        </div>

                        <div className='productInfo'>
                            <h4>{product.title}</h4>
                            <h4><span>Category:</span> <span>{product.category}</span></h4>
                            <h4><span>Guarantee:</span> <span>{product.garantee} years</span></h4>
                            <h4><span>Price:</span> <span>{product.price}$</span></h4>

                            <div className='productBtns'>

                                <Button type='button'
                                    className='buy'
                                    onClick={() => handleBuyForm()}
                                >
                                    Buy
                                </Button>

                            </div>
                        </div>
                        {
                            toggleBuy ?
                                <PurchaseForm
                                    id={Number(id)}
                                    setBuyForm={() => setToggleBuy(b => !b)}
                                    Quantity={product.quantity}
                                />

                                : null
                        }
                       
                    </div >
                    <Reviews />
                </>
            }
            <AiDisplay mode="details" />
        </div>
    );

}

export default ProductDetails;