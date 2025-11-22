import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logout } from './api/auth';
import { COOKIES } from '@/constants/app';
import { JWT_CONFIG } from '@/constants/auth';
import { PUBLIC_ROUTES } from '@/constants/routes';

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
    if (parts.length !== JWT_CONFIG.PARTS_COUNT) {
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[JWT_CONFIG.PAYLOAD_INDEX];
    const decoded = Buffer.from(payload, JWT_CONFIG.ENCODING).toString('utf-8');
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
  const authToken = cookieStore.get(COOKIES.AUTH_TOKEN);

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
    return { user };
  } catch (error) {
    console.error('Failed to extract user from JWT:', error);
    return { user: null };
  }
}

/**
 * Sign out by calling the backend logout endpoint and clearing cookies
 *
 * Flow:
 * 1. Call backend POST /auth/logout to clear backend cookies and get WorkOS logout URL
 * 2. Clear frontend cookies (auth_token and wos-session)
 * 3. Redirect to WorkOS logout URL (if provided) to clear WorkOS session
 * 4. WorkOS redirects back to configured logout redirect URI
 *
 * Note: The backend needs to return workosLogoutUrl for proper WorkOS session clearing.
 * See BACKEND_UPDATE_PROMPT.md for backend update instructions.
 */
export async function signOutUser() {
  'use server';

  const cookieStore = await cookies();
  const authToken = cookieStore.get(COOKIES.AUTH_TOKEN);

  let workosLogoutUrl: string | undefined;

  // Call the backend logout endpoint to clear the JWT cookie and get WorkOS logout URL
  try {
    const response = await logout(authToken?.value);
    console.log('🔍 Backend logout response:', JSON.stringify(response, null, 2));
    workosLogoutUrl = response.workosLogoutUrl;

    if (workosLogoutUrl) {
      console.log('✅ WorkOS logout URL received:', workosLogoutUrl);
    } else {
      console.log('⚠️ No WorkOS logout URL in response - backend needs to be updated');
      console.log('⚠️ User will be logged out locally but WorkOS session will remain active');
    }
  } catch (error) {
    console.error('❌ Error calling backend logout:', error);
  }

  // Clear all frontend cookies (both auth_token and wos-session)
  cookieStore.delete(COOKIES.AUTH_TOKEN);
  cookieStore.delete(COOKIES.WOS_SESSION);

  // Redirect to WorkOS logout URL if provided, otherwise redirect to home
  if (workosLogoutUrl) {
    console.log('🔄 Redirecting to WorkOS logout URL to clear SSO session');
    redirect(workosLogoutUrl);
  } else {
    console.log('🔄 Redirecting to home page (WorkOS session NOT cleared)');
    redirect(PUBLIC_ROUTES.HOME);
  }
}
