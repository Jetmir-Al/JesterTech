import { createContext } from 'react'; 


export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addCartItems: (item: CartItem) => void;
    removeCartItem: (id: number) => void;
}

const defaultCartContextValue: CartContextType = {
    cartItems: [] as CartItem[],
    addCartItems: () => { },
    removeCartItem: () => { }
};  

export const CartContext = createContext(defaultCartContextValue);