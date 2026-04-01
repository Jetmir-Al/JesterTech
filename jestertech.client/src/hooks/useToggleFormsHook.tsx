import { useContext } from "react";
import { AccountFormContext } from "../context/AccountFormContext";



export const useToggleFormsHook = () => {
    const context = useContext(AccountFormContext);
    if (!context) {
        throw new Error("Context Problem!");
    }
    return context;
}