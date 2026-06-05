import { useContext } from "react";
import { AlertContext } from "../../context/AlertContext";

export const useToggleAlertHook = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("Context problem!");
    }
    return context;
}