import { useContext } from "react";
import { NavbarUtilsContext } from "../context/NavbarUtilsContext";



export const useToggleNavbarUtilsHook = () => {
    const context = useContext(NavbarUtilsContext);
    if (!context) {
        throw new Error("Context Problem!");
    }
    return context;
}