import type { RequestParams } from '../types/apiTypes';

const BASE_URL = import.meta.env.VITE_API_URL;

const request = async <T>({ endpoint, options = {} }: RequestParams): Promise<T | null> => {
    const config: RequestInit = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        credentials: 'include',
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) return null;

    return response.json() as Promise<T>;
};

export const api = {
    get: <T>(endpoint: string, options?: RequestInit) =>
        request<T>({ endpoint, options: { ...options, method: 'GET' } }),

    post: <T>(endpoint: string, body?: any, options?: RequestInit) =>
        request<T>({ endpoint, options: { ...options, method: 'POST', body: JSON.stringify(body) } }),

    put: <T>(endpoint: string, body?: any, options?: RequestInit) =>
        request<T>({ endpoint, options: { ...options, method: 'PUT', body: JSON.stringify(body) } }),

    delete: <T>(endpoint: string, options?: RequestInit) =>
        request<T>({ endpoint, options: { ...options, method: 'DELETE' } }),
};