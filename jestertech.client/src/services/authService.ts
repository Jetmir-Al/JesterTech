import { Login, Register } from "../api/authApi";

export const AuthService = {
    login: async (email: string, password: string) => {
        if (!email || !password) {
            throw new Error("Email and password are required!");
        }
        const response = await Login(email, password);
        return response;    
    },
    register: async (name: string, email: string, password: string, role: string) => {
        if (!name || !email || !password || !role) {
            throw new Error("All fields are required!");
        }
        const response = await Register(name, email, password, role);
        return response;
    }

}