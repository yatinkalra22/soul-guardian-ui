/**
 * Application Constants
 * General application-wide constants
 */

/**
 * Application Metadata
 */
export const APP_METADATA = {
  NAME: 'Soul Guardian',
  VERSION: '0.1.0',
  DESCRIPTION: 'Soul Guardian - Your personal avatar management system',
} as const;

/**
 * Cookie Names
 */
export const COOKIES = {
  AUTH_TOKEN: 'auth_token',
  WOS_SESSION: 'wos-session', // WorkOS session ID cookie
} as const;

/**
 * Environment
 */
export const ENVIRONMENT = {
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
  NODE_ENV: process.env.NODE_ENV,
} as const;

/**
 * Locale Settings
 */
export const LOCALE = {
  DEFAULT_LANGUAGE: 'en',
  SUPPORTED_LANGUAGES: ['en'] as const,
} as const;

/**
 * Date/Time Formats
 */
export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM DD, YYYY',
  WITH_TIME: 'MM/DD/YYYY HH:mm',
  ISO: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
} as const;

/**
 * File Upload Limits
 */
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const,
  ALLOWED_IMAGE_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp'] as const,
} as const;

/**
 * Pagination
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const;

/**
 * Cache Settings
 */
export const CACHE = {
  NO_STORE: 'no-store',
  REVALIDATE_TIME: 60, // seconds
} as const;

