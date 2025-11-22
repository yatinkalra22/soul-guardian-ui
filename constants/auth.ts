/**
 * Authentication Constants
 * All authentication-related constants
 */

/**
 * WorkOS Configuration
 */
export const WORKOS_CONFIG = {
  /**
   * ⚠️ IMPORTANT: Locked to version 0.17.2
   * 
   * WHY: Versions 1.0+ have a known bug with Netlify deployments where the middleware
   * header check fails, causing this error:
   * "You are calling 'withAuth' on a route that isn't covered by the AuthKit middleware"
   * 
   * TECHNICAL DETAILS:
   * - In v1.0+, withAuth() checks for an 'x-workos-middleware' header
   * - Netlify's edge runtime doesn't properly pass middleware headers to server components
   * - The middleware runs, but the header doesn't reach withAuth()
   * - This works on Vercel but NOT on Netlify
   * 
   * GITHUB ISSUE: https://github.com/workos/authkit-nextjs/issues/229
   * STATUS: Open since March 2025, no fix available yet
   * 
   * WHEN TO UPGRADE:
   * - Monitor the GitHub issue above
   * - Upgrade when the issue is closed/resolved
   * - OR migrate to Vercel (confirmed working with v2.x)
   * 
   * DO NOT UPGRADE without testing on Netlify first!
   */
  LOCKED_VERSION: '0.17.2',
  MIDDLEWARE_HEADER: 'x-workos-middleware',
} as const;

/**
 * JWT Configuration
 */
export const JWT_CONFIG = {
  PARTS_COUNT: 3, // JWT has 3 parts: header.payload.signature
  PAYLOAD_INDEX: 1, // Payload is the second part (index 1)
  ENCODING: 'base64',
} as const;

/**
 * Auth Error Codes
 */
export const AUTH_ERROR_CODES = {
  MISSING_CODE: 'missing_code',
  AUTH_FAILED: 'auth_failed',
  UNAUTHORIZED: 'unauthorized',
  TOKEN_EXPIRED: 'token_expired',
  INVALID_TOKEN: 'invalid_token',
} as const;

/**
 * Auth Response Messages
 */
export const AUTH_RESPONSE_MESSAGES = {
  LOGOUT_SUCCESS: 'Logged out successfully',
  LOGIN_SUCCESS: 'Logged in successfully',
  EXCHANGE_SUCCESS: 'Authentication successful',
} as const;

/**
 * Session Configuration
 */
export const SESSION_CONFIG = {
  MAX_AGE: 7 * 24 * 60 * 60, // 7 days in seconds
  REFRESH_THRESHOLD: 24 * 60 * 60, // Refresh if less than 1 day remaining
} as const;

