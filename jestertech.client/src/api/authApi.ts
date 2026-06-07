import type { IAPIMessage } from "../types/apiTypes";
import type { IUser } from "../types/IUser";
import { api } from "./api";

export const Register = async (Name: string, Email: string, Password: string, Role: string) => {
    return await api.post<IAPIMessage>('/Auth/register', { Name, Email, Password, Role });
}

export const Login = async (email: string, password: string) => {
    return await api.post<IUser>('/Auth/login', { email, password });
}

export const Status = async () => {
    return await api.get<IUser>('/Auth/status',
        { credentials: 'include' });
}

export const Logout = async () => {
    return await api.post<IAPIMessage>('/Auth/logout',
        {},
        { credentials: 'include' }
    );
}