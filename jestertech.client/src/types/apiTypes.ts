
export interface RequestOptions extends RequestInit {
    headers?: Record<string, string>;
    body?: any | object;
}

export interface RequestParams {
    endpoint: string;
    options?: RequestOptions;
}