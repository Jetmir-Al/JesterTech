import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import type { ICard } from "../../types/ICard";
import Button from "./Button";
import "./card.css";
import { useCartHook } from "../../hooks/useCartHook";
import { getImageUrl } from "../../api/productApi";


const Card = ({ img, price, name, rating, cartItem }: ICard) => {
    const { addCartItems } = useCartHook();

    return (
        <div className="card-container">
            <img src={getImageUrl(img)} alt={name} className="card-img" />
            <div className="card-content">
                <p>{name}</p>
                {Array.from({ length: rating }).map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="starIcons" />
                ))}
                <p className="price">{price}€</p>
            </div>
            <Button
                type="button"
                onClick={(e: Event) => {
                    e.stopPropagation();
                    addCartItems(cartItem);
                }}
                className="cart-btn">
                Add to Cart
            </Button>
        </div>
    );
}

export default Card;