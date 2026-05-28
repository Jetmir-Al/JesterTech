import { createContext } from "react";


export interface AlertContextType {
    showAlert: boolean;
    setShowAlert: (show: boolean) => void;
}
const defaultAlertContext: AlertContextType = {
    showAlert: false,
    setShowAlert: () => { },
}

export const AlertContext = createContext<AlertContextType>(defaultAlertContext);
