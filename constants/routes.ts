/**
 * Route Constants
 * All application routes and paths
 */

/**
 * Public Routes (accessible without authentication)
 */
export const PUBLIC_ROUTES = {
  HOME: '/',
  CALLBACK: '/callback',
  UNAUTHORIZED: '/unauthorize',
} as const;

/**
 * Protected Routes (require authentication)
 */
export const PROTECTED_ROUTES = {
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

/**
 * All Routes
 */
export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...PROTECTED_ROUTES,
} as const;

/**
 * Unauthenticated paths for middleware
 */
export const UNAUTHENTICATED_PATHS = [
  PUBLIC_ROUTES.HOME,
  PUBLIC_ROUTES.CALLBACK,
  PUBLIC_ROUTES.UNAUTHORIZED,
] as const;

/**
 * External URLs
 */
export const EXTERNAL_URLS = {
  WORKOS_GITHUB_ISSUE: 'https://github.com/workos/authkit-nextjs/issues/229',
} as const;

