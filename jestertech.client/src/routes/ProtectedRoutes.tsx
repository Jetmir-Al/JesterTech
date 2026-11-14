import { Navigate, Outlet } from "react-router";
import { useAuthHook } from "../hooks/useAuthHook";

interface IProtectedRoutesProps {
    allowedRoles?: 'Admin' | "User";
}

const ProtectedRoutes = ({ allowedRoles }: IProtectedRoutesProps) => {
    const { authenticated, user } = useAuthHook();

    if (authenticated && user) {
        if (allowedRoles && allowedRoles !== user.role) {
            return <Navigate to="/" />
        }
        return <Outlet />
    } else {
        return <Navigate to="/" />
    }
}

export default ProtectedRoutes;