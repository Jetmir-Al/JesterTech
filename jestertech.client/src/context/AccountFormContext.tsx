import { createContext } from "react";

interface AccountFormContextType {
    toggleForm: boolean;
    toggleFormFunc: () => void;
    toggleDisplayForm: boolean;
    toggleDisplayFormFunc: () => void;
}

const defaultValue: AccountFormContextType = {
    toggleForm: false,
    toggleFormFunc: () => { },
    toggleDisplayForm: false,
    toggleDisplayFormFunc: () => { }
}


export const AccountFormContext = createContext<AccountFormContextType>(defaultValue);