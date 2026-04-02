import { createContext } from "react";

export type NavbarUtilsContextType = {
    openSideBar: boolean;
    openSideBarFunc: () => void;
    openSearchBar: boolean;
    openSearchBarFunc: () => void;
    toggleForm: boolean;
    toggleFormFunc: () => void;
    toggleDisplayForm: boolean;
    toggleDisplayFormFunc: () => void;

}

const defaultValue: NavbarUtilsContextType = {
    openSideBar: false,
    openSideBarFunc: () => { },
    openSearchBar: false,
    openSearchBarFunc: () => { },
    toggleForm: false,
    toggleFormFunc: () => { },
    toggleDisplayForm: false,
    toggleDisplayFormFunc: () => { }
}

export const NavbarUtilsContext = createContext<NavbarUtilsContextType>(defaultValue);