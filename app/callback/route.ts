import { NextRequest, NextResponse } from 'next/server';
import { serverApiClient } from '@/lib/api/client';
import { AxiosError } from 'axios';
import { API_ENDPOINTS, HTTP_HEADERS } from '@/constants/api';
import { PUBLIC_ROUTES } from '@/constants/routes';
import { AUTH_ERROR_CODES } from '@/constants/auth';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    if (!code) {
      console.error('WorkOS callback missing code parameter');
      return NextResponse.redirect(
        new URL(`${PUBLIC_ROUTES.UNAUTHORIZED}?error=${AUTH_ERROR_CODES.MISSING_CODE}`, request.url)
      );
    }

    // Call backend to exchange code for auth token
    const response = await serverApiClient.post(API_ENDPOINTS.AUTH.EXCHANGE, { code });

    // Forward any Set-Cookie header from backend so the browser receives it
    const setCookie = response.headers[HTTP_HEADERS.SET_COOKIE];

    // Extract the access token from the Set-Cookie header to store in sessionStorage
    let accessToken: string | null = null;
    if (setCookie) {
      const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookie of cookies) {
        if (cookie.includes('auth_token=')) {
          const tokenMatch = cookie.match(/auth_token=([^;]+)/);
          if (tokenMatch && tokenMatch[1]) {
            accessToken = tokenMatch[1];
            break;
          }
        }
      }
    }

    // Redirect to a page that will store the token in sessionStorage
    const homeUrl = new URL(PUBLIC_ROUTES.HOME, request.url);
    if (accessToken) {
      // Pass token as query param so the client can store it
      homeUrl.searchParams.set('token', accessToken);
    }

    const successRedirect = NextResponse.redirect(homeUrl);

    if (setCookie) {
      // Handle both string and array formats
      const cookieValue = Array.isArray(setCookie) ? setCookie.join(', ') : setCookie;
      successRedirect.headers.set(HTTP_HEADERS.SET_COOKIE, cookieValue);
    }

    return successRedirect;
  } catch (err) {
    // Handle axios errors
    if (err instanceof AxiosError) {
      console.error('Backend exchange failed', err.response?.status, err.response?.data);
    } else {
      console.error('Error handling WorkOS callback', err);
    }
    return NextResponse.redirect(
      new URL(`${PUBLIC_ROUTES.UNAUTHORIZED}?error=${AUTH_ERROR_CODES.AUTH_FAILED}`, request.url)
    );
  }
}
