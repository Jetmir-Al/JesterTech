
export interface RequestOptions extends Omit<RequestInit, 'body'> {
    headers?: HeadersInit;
    body?: Record<string, unknown> | string | null | undefined;
}

export interface RequestParams {
    endpoint: string;
    options?: RequestOptions;
}

