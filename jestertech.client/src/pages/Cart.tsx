import Button from "../components/ui/Button";
import "./pageStyles/cart.css";
import type { CartItem } from "../context/CartContext";
import NoInfo from "../utils/NoInfo";
import { useCartHook } from "../hooks/useCartHook";
import { getImageUrl } from "../api/productApi";

const Cart = () => {
    const { cartItems, removeCartItem } = useCartHook();



    return (
        <div className="cart-container">
            <div className="cart-items-container">
                {
                    cartItems.length === 0 ? <NoInfo noInfo="No cart items!" /> :
                        cartItems.map((c: CartItem) => (

                            <div className="cart-item">
                                <img src={getImageUrl(c.image)}
                                    alt="Product Image"
                                    className="cart-item-image" />
                                <div className="cart-item-content">
                                    <p>{c.name}</p>
                                    <p className="cart-item-price">Price: {c.price}$</p>
                                    <Button
                                        className="cart-item-btn"
                                        type="button"
                                        onClick={() => removeCartItem(c.id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    );
}

export default Cart;