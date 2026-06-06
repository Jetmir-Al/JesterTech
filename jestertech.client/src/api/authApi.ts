import type { IUser } from "../types/IUser";
import { api } from "./api";

export const Register = async (name: string, email: string, password: string, role: string) => {
    try {
        const response = await api.post('/Auth/register', { name, email, password, role });
        console.log(response);
        return response;
    } catch (error) {
        console.log("Problem with registration!", error);
        return "Problem with registration!";
    }
}

export const Login = async (email: string, password: string) => {
    try {
        const response = await api.post('/Auth/login', { email, password });
        console.log(response);
        return response;
    }
    catch {
        return "Problem with login!";
    }
}

export const Status = async () => {
    try {
        const response = await api.get<IUser>('/Auth/status',
            { credentials: 'include' });
        console.log(response);
        return response;
    }
    catch {
        // console.log("Problem with status!");
        return "Problem with status!";
    }
}

export const Logout = async () => {
    try {
        const response = await api.post('/Auth/logout',
            {},
            { credentials: 'include' }
        );
        return response;
    }
    catch {
        return "Problem with logout!";
    }
}