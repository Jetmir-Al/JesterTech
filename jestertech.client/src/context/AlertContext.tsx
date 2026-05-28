import { createContext } from "react";


export interface AlertContextType {
    showAlert: boolean;
    setShowAlert: (show: boolean) => void;
    message?: string;
    setMessage?: (message: string) => void;
    type?: 'success' | 'error' | 'info' | 'warning';
    setType?: (type: 'success' | 'error' | 'info' | 'warning') => void;
}
const defaultAlertContext: AlertContextType = {
    showAlert: false,
    setShowAlert: () => { },
    message: '',
    setMessage: () => { },
    type: 'info',
    setType: () => { },
}

export const AlertContext = createContext<AlertContextType>(defaultAlertContext);
