import { type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useAuthStatus } from "../hooks/useQueries/useAuthQueries";
import Loading from "../utils/Loading";
interface IAuthProvider {
    children: ReactNode
}


export const AuthProvider = ({ children }: IAuthProvider) => {
    const { data: user = null, isLoading: loading, refetch } = useAuthStatus();

    const authenticated = !!user;

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                user,
                refetch: async () => {
                    await refetch();
                }
            }}>
            {
                loading ?
                <Loading />
                :
                children
            }
        </AuthContext.Provider>
    );
}