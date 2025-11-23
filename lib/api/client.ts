import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URLS, HTTP_HEADERS, API_CONFIG } from '@/constants/api';

/**
 * Base API client configuration
 */


/**
 * Server-side axios instance (for server actions and API routes)
 * Includes credentials for cookie handling
 */
export const serverApiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URLS.BACKEND,
  headers: {
    'Content-Type': HTTP_HEADERS.CONTENT_TYPE.JSON,
  },
  withCredentials: API_CONFIG.WITH_CREDENTIALS,
  timeout: API_CONFIG.TIMEOUT,
});

/**
 * Request interceptor for server API to add Authorization header
 * This is useful when the token is passed explicitly in server actions
 */
serverApiClient.interceptors.request.use(
  (config) => {
    // If Authorization header is not already set, we don't add it
    // Server-side calls should explicitly pass the token via Cookie header or Authorization header
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Client-side axios instance (for browser requests)
 * Uses NEXT_PUBLIC_ env variable
 */
export const clientApiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URLS.BACKEND_CLIENT,
  headers: {
    'Content-Type': HTTP_HEADERS.CONTENT_TYPE.JSON,
  },
  withCredentials: API_CONFIG.WITH_CREDENTIALS,
  timeout: API_CONFIG.TIMEOUT,
});

/**
 * Request interceptor for client API
 * Note: We don't add Authorization header here because the auth_token cookie is HTTP-only
 * The backend must read the token from the cookie itself, not from the Authorization header
 */
clientApiClient.interceptors.request.use(
  (config) => {
    // Just pass through - cookies are sent automatically via withCredentials: true
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Error handler for API requests
 */
export function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;
    const message = axiosError.response?.data?.message || axiosError.response?.data?.error || axiosError.message;
    console.error('API Error:', {
      status: axiosError.response?.status,
      message,
      url: axiosError.config?.url,
    });
    throw new Error(message || 'An error occurred');
  }
  console.error('Unexpected error:', error);
  throw error;
}

/**
 * Response interceptor for logging (optional)
 */
serverApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Server API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

clientApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Client API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

