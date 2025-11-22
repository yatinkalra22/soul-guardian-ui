import { cookies } from 'next/headers';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  [key: string]: unknown;
}

export interface AuthResult {
  user: User | null;
}

/**
 * Decode JWT token payload without verification (for reading user data)
 * Note: This doesn't verify the signature - verification should happen on the backend
 */
function decodeJWT(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[1];
    const decoded = Buffer.from(payload, 'base64').toString('utf-8');
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

/**
 * Custom auth helper that decodes the JWT token to extract user information.
 * The auth_token cookie is set by the backend after successful OAuth flow.
 */
export async function getAuthUser(): Promise<AuthResult> {
  const cookieStore = await cookies();

  // Get the auth token from your backend
  const authToken = cookieStore.get('auth_token');

  if (!authToken?.value) {
    console.log('No auth token found in cookies');
    return { user: null };
  }

  try {
    // Decode the JWT to extract user information
    const payload = decodeJWT(authToken.value);

    if (!payload) {
      console.error('Failed to decode JWT token');
      return { user: null };
    }

    // Extract user information from the JWT payload
    // Adjust the mapping based on your backend's JWT structure
    const user: User = {
      id: (payload.sub || payload.userId || payload.id) as string,
      email: payload.email as string,
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
    };

    console.log('Extracted user:', user);
    return { user };
  } catch (error) {
    console.error('Failed to extract user from JWT:', error);
    return { user: null };
  }
}

/**
 * Sign out by clearing the backend cookies
 */
export async function signOutUser() {
  'use server';
  const cookieStore = await cookies();

  // Clear your backend cookie
  cookieStore.delete('auth_token');
}
