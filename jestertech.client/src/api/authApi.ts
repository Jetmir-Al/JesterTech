import { api } from "./api";

export const Register = async (name: string, email: string, password: string, role: string) => {
    try {
        const response = await api.post('/Auth/register', { name, email, password, role });
        return response;
    } catch {
        return "Problem with registration!";
    }
}

export const Login = async (email: string, password: string) => {
    try {
        const response = await api.post('/Auth/login', { email, password });
        return response;
    }
    catch {
        return "Problem with login!";
    }
}

export const Status = async () => {
    try {
        const response = await api.get('/Auth/status',
            { credentials: 'include' });
        return response;
    }
    catch {
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