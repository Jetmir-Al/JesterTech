import { useState, type ReactNode } from "react";
import { CartContext, type CartItem } from "./CartContext";
import { useToggleAlertHook } from "../hooks/useToggle/useToggleAlert";

interface CartProviderProps {
    children: ReactNode;
}


export const CartProvider = ({ children }: CartProviderProps) => {
    const { setMessage, setShowAlert, setType } = useToggleAlertHook();
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
        const cartArr = localStorage.getItem("cartItems");
        const arrLength = cartArr ? JSON.parse(cartArr) : [];
        if (arrLength.length >= 10) {
            setType("warning");
            setMessage("You have hit the max number of cart items!");
            setShowAlert(true);
            return;
        }
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