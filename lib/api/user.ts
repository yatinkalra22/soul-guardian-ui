import { serverApiClient, clientApiClient, handleApiError } from './client';
import { API_ENDPOINTS } from '@/constants/api';

/**
 * User API module
 * Handles user-related API calls
 */

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  [key: string]: unknown;
}

export interface UserProfileResponse {
  success: boolean;
  user: User;
}

/**
 * Get current user profile
 * Can be used on both server and client side
 */
export async function getUserProfile(isServer = false): Promise<User> {
  try {
    const client = isServer ? serverApiClient : clientApiClient;
    const response = await client.get<UserProfileResponse>(API_ENDPOINTS.USER.PROFILE);
    return response.data.user;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Update user profile
 * Can be used on both server and client side
 */
export async function updateUserProfile(data: Partial<User>, isServer = false): Promise<User> {
  try {
    const client = isServer ? serverApiClient : clientApiClient;
    const response = await client.put<UserProfileResponse>(API_ENDPOINTS.USER.PROFILE, data);
    return response.data.user;
  } catch (error) {
    handleApiError(error);
  }
}

