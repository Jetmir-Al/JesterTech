import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import type { ICard } from "../../types/ICard";
import Button from "./Button";
import "./card.css";


const Card = ({ img, price, name, rating }: ICard) => {
    return (
        <div className="card-container">
            <img src={img} alt={name} className="card-img" />
            <div className="card-content">
                <p>{name}</p>
                {Array.from({ length: rating }).map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="starIcons" />
                ))}
                <p className="price">{price}€</p>
            </div>
            <Button
                type="button"
                onClick={() => { }}
                className="cart-btn">
                Add to Cart
            </Button>
        </div>
    );
}

export default Card;