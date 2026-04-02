import { useState } from "react";
import { NavbarUtilsContext } from "./NavbarUtilsContext";


interface NavbarUtilsProps {
    children: React.ReactNode;
}



export const NavbarUtilsProvider: React.FC<NavbarUtilsProps> = ({ children }: NavbarUtilsProps) => {
    const [toggleForm, setToggleForm] = useState<boolean>(false);
    const [toggleDisplayForm, setToggleDisplayForm] = useState<boolean>(false);
    const [openSideBar, setOpenSideBar] = useState<boolean>(false);
    const [openSearchBar, setOpenSearchBar] = useState<boolean>(false);


    const toggleFormFunc = () => {
        setToggleForm(t => !t);
    }
    const toggleDisplayFormFunc = () => {
        setToggleDisplayForm(d => !d)
    }
    const openSideBarFunc = () => {
        setOpenSideBar(s => !s);
    }
    const openSearchBarFunc = () => {
        setOpenSearchBar(s => !s);
    }

    return (
        <NavbarUtilsContext.Provider
            value={{
                openSideBar,
                openSideBarFunc,
                openSearchBar,
                openSearchBarFunc,
                toggleForm,
                toggleDisplayForm,
                toggleFormFunc,
                toggleDisplayFormFunc,
            } }>
            { children }
        </NavbarUtilsContext.Provider>
    )
}