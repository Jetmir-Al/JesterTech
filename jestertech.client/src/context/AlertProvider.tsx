import { useState, type ReactNode } from "react";
import { AlertContext } from "./AlertContext";


interface AlertProviderProps {
    children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }: AlertProviderProps) => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [type, setType] = useState<'success' | 'error' | 'info' | 'warning'>('info');

    return (
        <AlertContext.Provider value={{ showAlert, setShowAlert, message, setMessage, type, setType }}>
            {children}
        </AlertContext.Provider>
    );
};
