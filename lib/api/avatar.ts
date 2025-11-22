import { clientApiClient, handleApiError } from './client';
import { API_BASE_URLS, HTTP_HEADERS } from '@/constants/api';
import { ERROR_MESSAGES } from '@/constants/ui';

/**
 * Avatar API module
 * Handles avatar-related API calls
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
 * Get all avatars
 * Client-side
 */
export async function getAvatars(): Promise<Avatar[]> {
  try {
    const response = await clientApiClient.get<Avatar[]>(API_BASE_URLS.MCP);
    return response.data ?? [];
  } catch (error) {
    console.warn(ERROR_MESSAGES.AVATAR.FETCH_FAILED, error);
    return [];
  }
}

/**
 * Create a new avatar
 * Client-side
 */
export async function createAvatar(data: CreateAvatarRequest): Promise<Avatar> {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('relationship', data.relationship);
    if (data.photo) {
      formData.append('photo', data.photo);
    }

    const response = await clientApiClient.post<Avatar>(API_BASE_URLS.MCP, formData, {
      headers: {
        'Content-Type': HTTP_HEADERS.CONTENT_TYPE.FORM_DATA,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Delete an avatar
 * Client-side
 */
export async function deleteAvatar(id: string): Promise<void> {
  try {
    await clientApiClient.delete(`${API_BASE_URLS.MCP}/${id}`);
  } catch (error) {
    handleApiError(error);
  }
}

