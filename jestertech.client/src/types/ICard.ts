import type { CartItem } from "../context/CartContext";


export interface ICard {
    img: string;
    name: string;
    price: number;
    rating: number;
    cartItem: CartItem;
}