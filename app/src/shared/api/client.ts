// api/apiClient.ts
import axios, { AxiosError } from 'axios';


import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ApiConfig, ApiMethod, RequestData, Response, ResponseData } from './types';



export class ApiClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string, config?: ApiConfig) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers,
            },
            ...config,
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.axiosInstance.interceptors.request.use(
            (config) => {
                // Здесь можно добавить логику для токена
                // if (config.withToken) {
                //   const token = localStorage.getItem('token');
                //   if (token) {
                //     config.headers.Authorization = `Bearer ${token}`;
                //   }
                // }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse<Response>) => {
                return response;
            },
            (error: AxiosError) => {
                if (error.response) {
                    return Promise.reject({
                        success: false,
                        code: error.response.status,
                        error: {
                            text: "Ошибка сервера",
                        },
                    });
                }

                // Для сетевых ошибок
                return Promise.reject({
                    success: false,
                    code: 0,
                    error: {
                        text: "Неизвестная ошибка. Нет ответа"
                    },
                });
            }
        );
    }

    public async request<TRequest, TResponse>(
        method: ApiMethod,
        url: string,
        data?: TRequest,
        config?: ApiConfig
    ): Promise<Response<TResponse>> {
        const requestConfig: AxiosRequestConfig = {
            method,
            url,
            ...config,
        };

        if (method === 'GET' || method === 'DELETE') {
            requestConfig.params = data;
        } else {
            requestConfig.data = data;
        }

        
        const response = await this.axiosInstance.request<Response<TResponse>>(requestConfig)
        response.data.code = response.status

        return response.data
    
    }

    public async get<TRequest = RequestData, TResponse = ResponseData>(url: string, params?: TRequest, config?: ApiConfig): Promise<Response<TResponse>> {
        return this.request<TRequest, TResponse>('GET', url, params, config);
    }

    public async post<TRequest = RequestData, TResponse = ResponseData>(url: string, data?: TRequest, config?: ApiConfig): Promise<Response<TResponse>> {
        return this.request<TRequest, TResponse>('POST', url, data, config);
    }

    // public async put<T = any>(url: string, data?: any, config?: ApiConfig): Promise<Response<T>> {
    //     return this.request<T>('PUT', url, data, config);
    // }

    // public async patch<T = any>(url: string, data?: any, config?: ApiConfig): Promise<Response<T>> {
    //     return this.request<T>('PATCH', url, data, config);
    // }

    // public async delete<T = any>(url: string, params?: any, config?: ApiConfig): Promise<Response<T>> {
    //     return this.request<T>('DELETE', url, params, config);
    // }
}