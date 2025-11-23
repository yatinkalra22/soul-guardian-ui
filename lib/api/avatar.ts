import { clientApiClient, handleApiError } from './client';
import { HTTP_HEADERS } from '@/constants/api';
import { ERROR_MESSAGES } from '@/constants/ui';
import { tokenManager } from '@/lib/tokenManager';

/**
 * Avatar API module
 * Calls backend API directly (BACKEND_API_URL) with Bearer token
 */

export interface Avatar {
  id: string;
  name: string;
  relationship: string;
  image?: string | null;
}

export interface CreateAvatarRequest {
  name: string;
  relationship: string;
  photo?: File;
}

/**
 * Get authorization headers with Bearer token
 */
function getAuthHeaders(): Record<string, string> {
  const token = tokenManager.getToken();
  if (!token) {
    throw new Error('No access token found. Please log in again.');
  }
  return {
    [HTTP_HEADERS.AUTHORIZATION]: `Bearer ${token}`,
  };
}

/**
 * Get all avatars
 * Calls backend directly with Authorization header
 */
export async function getAvatars(): Promise<Avatar[]> {
  try {
    const response = await clientApiClient.get<Avatar[]>('/api/avatars', {
      headers: getAuthHeaders(),
    });
    return response.data ?? [];
  } catch (error) {
    console.warn(ERROR_MESSAGES.AVATAR.FETCH_FAILED, error);
    return [];
  }
}

/**
 * Create a new avatar
 * Calls backend directly with Authorization header
 */
export async function createAvatar(data: CreateAvatarRequest): Promise<Avatar> {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('relationship', data.relationship);
    if (data.photo) {
      formData.append('photo', data.photo);
    }

    const response = await clientApiClient.post<Avatar>('/api/avatars', formData, {
      headers: {
        ...getAuthHeaders(),
        // Don't set Content-Type - browser will set it with boundary for FormData
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Delete an avatar
 * Calls backend directly with Authorization header
 */
export async function deleteAvatar(id: string): Promise<void> {
  try {
    await clientApiClient.delete(`/api/avatars/${id}`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    handleApiError(error);
  }
}

