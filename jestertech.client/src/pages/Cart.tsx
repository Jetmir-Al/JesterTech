import Button from "../components/ui/Button";
import "./pageStyles/cart.css";

const Cart = () => {
    return (
        <div className="cart-container">
            <div className="cart-items-container">
                <div className="cart-item">
                    <img src="src/assets/s26.png"
                        alt="Product Image"
                        className="cart-item-image" />
                    <div className="cart-item-content">
                        <p>Product name</p>
                        <p className="cart-item-price">Price: $100</p>
                        <Button
                            className="cart-item-btn"
                            type="button"
                            onClick={() => { }}
                        >
                            Remove
                        </Button>
                    </div>
                </div>
                <div className="cart-item">
                    <img src="src/assets/s26.png"
                        alt="Product Image"
                        className="cart-item-image" />
                    <div className="cart-item-content">
                        <p>Product name</p>
                        <p className="cart-item-price">Price: $100</p>
                        <Button
                            className="cart-item-btn"
                            type="button"
                            onClick={() => { }}
                        >
                            Remove
                        </Button>
                    </div>
                </div>

                <div className="cart-item">
                    <img src="src/assets/s26.png"
                        alt="Product Image"
                        className="cart-item-image" />
                    <div className="cart-item-content">
                        <p>Product name</p>
                        <p className="cart-item-price">Price: $100</p>
                        <Button
                            className="cart-item-btn"
                            type="button"
                            onClick={() => { }}
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;