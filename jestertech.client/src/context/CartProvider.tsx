import { useState, type ReactNode } from "react";
import { CartContext, type CartItem } from "./CartContext";

interface CartProviderProps {
    children: ReactNode;
}


export const CartProvider = ({ children }: CartProviderProps) => {

    const getInitialCart = () => {
        try {
            const cartArr = localStorage.getItem("cartItems");
            return cartArr ? JSON.parse(cartArr) : [];
        } catch {
            return []
        }
    }

    const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCart);

    const addCartItems = (item: CartItem) => {
        setCartItems(prev => {
            const updated = [...prev, item];
            localStorage.setItem("cartItems", JSON.stringify(updated));
            return updated;
        });
       
    }
    const removeCartItem = (id: number) => {
        setCartItems(prev => {
            const updated = prev.filter(i => i.id !== id);
            localStorage.setItem("cartItems", JSON.stringify(updated));
            return updated;
        });
    }
    return (
        <CartContext.Provider value={{
            cartItems,
            addCartItems,
            removeCartItem
        }}>
            {children}
        </CartContext.Provider> 
    );
}