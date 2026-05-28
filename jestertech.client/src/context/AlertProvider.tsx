import { useState, type ReactNode } from "react";
import { AlertContext } from "./AlertContext";


interface AlertProviderProps {
    children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }: AlertProviderProps) => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    return (
        <AlertContext.Provider value={{ showAlert, setShowAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
