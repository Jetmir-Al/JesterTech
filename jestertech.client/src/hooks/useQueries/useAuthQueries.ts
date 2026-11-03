import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Login, Logout, Register, Status } from "../../api/authApi";

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (params: { email: string, password: string }) => {
            return await Login(params.email, params.password);
        },
        onError: (err) => {
            console.error("Error during login", err);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["authStatus"]
            })
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

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            return await Logout();
        },
        onError: (err) => {
            console.error("Error during registration", err);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["authStatus"]
            })
        }
    });
}

export const useAuthStatus = () => {
    return useQuery({
        queryKey: ["authStatus"],
        queryFn: async () => {
            try {
                const response = await Status();
                return response ?? null;
            } catch {
                return null;
            }
        },
        retry: false,
        staleTime: 5 * 60 * 1000,
    })
}