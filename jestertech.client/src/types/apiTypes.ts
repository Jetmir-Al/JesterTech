
export interface RequestOptions extends Omit<RequestInit, 'body'> {
    headers?: HeadersInit;
    body?: Record<string, unknown> | string | null | undefined;
    credentials?: RequestCredentials; 
}

export interface RequestParams {
    endpoint: string;
    options?: RequestOptions;
}

export interface IAPIMessage {
    data: object;
    message?: string;
}