import { useEffect } from "react";
import type { ReactNode } from "react";
import React from "react";
import { ToggleLightDarkContext, defaultState, getCurrentMode, setCurrentMode } from "./ModeContext";


interface IToggleLightDarkProviderProps {
    children: ReactNode;
}


export const ToggleModeProvider: React.FC<IToggleLightDarkProviderProps> = ({ children }) => {
    const [mode, setMode] = React.useState<boolean>(getCurrentMode() ?? defaultState.mode);
    const darkMode = "dark-theme";

    const toggleMode = () => {
        setCurrentMode(getCurrentMode() ? false : true);
        setMode(m => !m);
    };

    useEffect(() => {
        if (mode) document.body.classList.add(darkMode);
        else document.body.classList.remove(darkMode);
    }, [mode]);

    return (
        <ToggleLightDarkContext.Provider
            value={{
                mode,
                toggleMode,
            }}
        >
            {children}
        </ToggleLightDarkContext.Provider>
    );
} 