import { createContext } from "react";

interface ICurrentMode {
    mode: boolean;
    toggleMode?: () => void;

}

export const getCurrentMode = () => {
    const mode = localStorage.getItem("mode");
    if (mode === null) return null;
    return mode === "true";
};

export const setCurrentMode = (mode: boolean) => {
    localStorage.setItem("mode", mode.toString());
}

export const defaultState: ICurrentMode = {
    mode: false,
    toggleMode: () => { },
};

export const ToggleLightDarkContext = createContext<ICurrentMode>(defaultState);