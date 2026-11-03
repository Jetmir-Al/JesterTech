import { createContext } from "react";
import type { IUser } from "../types/IUser";

interface IAuthContext {
    authenticated: boolean,
    user: IUser | null,
    refetch: () => Promise<void>
}

export const defaultAuth: IAuthContext = {
    authenticated: false,
    user: null,
    refetch: async () => { }
}



export const AuthContext = createContext<IAuthContext>(defaultAuth);