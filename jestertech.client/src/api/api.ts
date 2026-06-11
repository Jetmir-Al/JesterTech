import type { RequestOptions, RequestParams } from '../types/apiTypes';

const BASE_URL = import.meta.env.VITE_API_URL;

const request = async <T>({ endpoint, options = {} }: RequestParams): Promise<T | null> => {
    const config: RequestInit = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        },
        credentials: options.credentials || 'include',
    } as RequestInit; 

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
        throw new Error(data?.message || `HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) return null;

    return data as T;
};

export const api = {
    get: <T>(endpoint: string, options?: RequestOptions) =>
        request<T>({ endpoint, options }),

    post: <T>(endpoint: string, body?: Record<string, unknown>, options?: RequestOptions) =>
        request<T>({
            endpoint,
            options: { ...options, method: 'POST', body: JSON.stringify(body) },
        }),

    put: <T>(endpoint: string, body?: Record<string, unknown>, options?: RequestOptions) =>
        request<T>({
            endpoint,
            options: { ...options, method: 'PUT', body: JSON.stringify(body) }

        }),

    delete: <T>(endpoint: string, options?: RequestOptions) =>
        request<T>({ endpoint, options: { ...options, method: 'DELETE' } }),
};