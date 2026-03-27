import { useContext } from "react";
import { ToggleLightDarkContext } from "../context/ModeContext";

export const useToggleModeHook = () => {
    const context = useContext(ToggleLightDarkContext);
    if (!context) {
        throw new Error("Context problem!");
    }
    return context;
}