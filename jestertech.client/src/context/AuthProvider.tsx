import { useEffect, useState, type ReactNode } from "react";
import { Status } from "../api/authApi";
import type { IUser } from "../types/IUser";
import { AuthContext} from "./AuthContext";
interface IAuthProvider {
    children: ReactNode
}


export const AuthProvider = ({ children }: IAuthProvider) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUserInfo] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [reFetch, setRefetch] = useState<boolean>(false);

    useEffect(() => {

        const checkAuthStatus = async () => {
            try {
                const data = await Status();
                if (data) {
                    setUserInfo(data);
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                    setUserInfo(null);
                }
            } catch {
                setUserInfo(null);
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }

        }

        if (reFetch) {
            checkAuthStatus();
            reFetchFunc(false);
        }

        checkAuthStatus();
    }, [reFetch])

    const setUser = (user: IUser | null) => {
        setUserInfo(user);
    }
    const setAuth = (value: boolean) => {
        setAuthenticated(value);
    }
    const reFetchFunc = (value: boolean) => {
        setRefetch(value);
    }



    return (
        <AuthContext.Provider
            value={{
                authenticated,
                user,
                setUser,
                setAuth,
                reFetch,
                reFetchFunc,
            }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}