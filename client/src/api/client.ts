import axios, { AxiosError, type AxiosInstance } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
      );
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.url}`, response.data);
    }

    return response;
  },

  (error: AxiosError) => {
    if (error.response) {
      console.error('[API Error', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('[API Error] No response received', error.request);
    } else {
      console.error('[API Error]', error.message);
    }

    return Promise.reject(error);
  },
);

export class ApiError extends Error {
  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
  }
}
