import { ApiClient } from './client';

import { API_URL } from './paths';


export const API = new ApiClient(API_URL.BASE, {
    timeout: 10000,
    withToken: true,
});


export function sleep(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export * from './types';
