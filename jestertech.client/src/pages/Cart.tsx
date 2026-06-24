import Button from "../components/ui/Button";
import "./pageStyles/cart.css";
import type { CartItem } from "../context/CartContext";
import NoInfo from "../utils/NoInfo";
import { useCartHook } from "../hooks/useCartHook";
import { getImageUrl } from "../api/productApi";
import { useState } from "react";
import PurchaseForm from "../components/purchase/PurchaseForm";
import { useAuthHook } from "../hooks/useAuthHook";
import { useToggleAlertHook } from "../hooks/useToggle/useToggleAlert";

const Cart = () => {
    const { cartItems, removeCartItem } = useCartHook();
    const { authenticated, user } = useAuthHook();
    const { setMessage, setShowAlert, setType } = useToggleAlertHook();
    const [buyForm, setBuyForm] = useState<boolean>(false);


    async function handleBuyForm() {
        if (authenticated && user) {
            setBuyForm(true);
        } else {
            setType("error");
            setMessage("Please create an account to proceede with this action!");
            setShowAlert(true);
        }
    }

    return (
        <div className="cart-container">
            <div className="cart-items-container">
                {
                    cartItems.length === 0 ? <NoInfo noInfo="No cart items!" /> :
                        cartItems.map((c: CartItem, index: number) => (

                            <div className="cart-item" key={index}>
                                <img src={getImageUrl(c.image)}
                                    alt="Product Image"
                                    className="cart-item-image" />
                                <div className="cart-item-content">
                                    <p>{c.name}</p>
                                    <p className="cart-item-price">Price: {c.price}$</p>
                                    <Button
                                        className="cart-item-buy"
                                        onClick={() => handleBuyForm()}
                                        type="button"
                                    >
                                        Buy Now!
                                    </Button>
                                    <Button
                                        className="cart-item-btn"
                                        type="button"
                                        onClick={() => removeCartItem(c.id)}
                                    >
                                        Remove
                                    </Button>
                                    {
                                        buyForm &&
                                        <PurchaseForm
                                            id={c.id}
                                            setBuyForm={() => setBuyForm(b => !b)}
                                            Quantity={c.quantity}
                                        />
                                    }
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    );
}

export default Cart;