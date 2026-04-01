import { useState } from "react";
import { AccountFormContext } from "./AccountFormContext";

interface AccountFormProviderProps {
    children: React.ReactNode;
}

export const AccountFormProvider: React.FC<AccountFormProviderProps> = ({ children }: AccountFormProviderProps) => {
    const [toggleForm, setToggleForm] = useState<boolean>(false);
    const [toggleDisplayForm, setToggleDisplayForm] = useState<boolean>(false);

    const toggleFormFunc = () => {
        setToggleForm(t => !t);
    }
    const toggleDisplayFormFunc = () => {
        setToggleDisplayForm(d => !d)
    }
    return (
        <AccountFormContext.Provider
            value={{
                toggleForm,
                toggleDisplayForm,
                toggleFormFunc,
                toggleDisplayFormFunc,
            }}>
            {children}
        </AccountFormContext.Provider>
    );
}
