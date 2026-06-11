import { Navigate, Outlet } from "react-router";
import { useAuthHook } from "../hooks/useAuthHook";

const ProtectedRoutes = () => {
    const { authenticated, user } = useAuthHook();
    if (authenticated && user) return <Outlet />
    else return <Navigate to="/" />
}

export default ProtectedRoutes;