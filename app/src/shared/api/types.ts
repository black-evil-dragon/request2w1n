import type { AxiosRequestConfig } from "axios";
import type { InputMessageType } from "@shared/ui/components/Input";


export interface ApiConfig extends AxiosRequestConfig {
    withToken?: boolean;
    retry?: boolean;
}

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';



export type ResponseData = object | string | number | undefined
export type RequestData = object | string | number | undefined



export interface Response<T = unknown> {
    success: boolean;
    code: number;

    data?: T;
    error?: {
        text: string;

        fields?: {
            [key: string]: InputMessageType
        }
    };

    timestamp?: string;
}

export interface SuccessResponse<T> extends Response {
    success: true,
    code: number,
    data: T
}