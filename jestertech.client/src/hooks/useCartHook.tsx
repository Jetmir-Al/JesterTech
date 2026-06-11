import { useContext } from "react"
import {CartContext} from "../context/CartContext"

export const useCartHook = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("Problem with context");
    }

    return context
}