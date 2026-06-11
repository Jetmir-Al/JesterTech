import { useMutation } from "@tanstack/react-query";
import { Login, Register } from "../../api/authApi";

export const useLogin = () => {
    return useMutation({
        mutationFn: async (params: { email: string, password: string }) => {
            return await Login(params.email, params.password);
        },
        onError: (err) => {
            console.error("Error during login", err);
        }
    });
}

export const useRegister = () => {
    return useMutation({
        mutationFn: async (params: { name: string, email: string, password: string, role: string }) => {
            return await Register(params.name, params.email, params.password, params.role);
        },
        onError: (err) => {
            console.error("Error during registration", err);
        }
    });
}
