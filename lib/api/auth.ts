import { serverApiClient, handleApiError } from './client';
import { API_ENDPOINTS } from '@/constants/api';
import { COOKIES } from '@/constants/app';
import { HTTP_HEADERS } from '@/constants/api';

/**
 * Auth API module
 * Handles authentication-related API calls
 */

export interface AuthExchangeRequest {
  code: string;
}

export interface AuthExchangeResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
  workosLogoutUrl?: string;
}

/**
 * Exchange OAuth code for auth token
 * Server-side only
 */
export async function exchangeAuthCode(code: string): Promise<AuthExchangeResponse> {
  try {
    const response = await serverApiClient.post<AuthExchangeResponse>(
      API_ENDPOINTS.AUTH.EXCHANGE,
      { code }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Logout user
 * Server-side only
 */
export async function logout(authToken?: string): Promise<LogoutResponse> {
  try {
    const headers: Record<string, string> = {};
    if (authToken) {
      // Include both Cookie header (for backward compatibility) and Authorization header
      headers[HTTP_HEADERS.COOKIE] = `${COOKIES.AUTH_TOKEN}=${authToken}`;
      headers[HTTP_HEADERS.AUTHORIZATION] = `Bearer ${authToken}`;
    }
    const response = await serverApiClient.post<LogoutResponse>(
      API_ENDPOINTS.AUTH.LOGOUT,
      {},
      { headers }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

