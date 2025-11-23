/**
 * API Constants
 * All API-related URLs, endpoints, and configuration
 */

/**
 * Base API URLs
 */
export const API_BASE_URLS = {
  BACKEND: process.env.BACKEND_API_URL ?? process.env.NEXT_PUBLIC_BACKEND_API_URL ?? 'http://localhost:4000',
  BACKEND_CLIENT: process.env.NEXT_PUBLIC_BACKEND_API_URL ?? 'http://localhost:4000',
  MCP: process.env.NEXT_PUBLIC_RAINDROP_MCP_URL ?? '/api/avatars',
} as const;

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    EXCHANGE: '/api/auth/exchange',
    LOGOUT: '/api/auth/logout',
  },
  
  // User endpoints
  USER: {
    PROFILE: '/api/user/profile',
  },
  
  // Avatar endpoints
  AVATARS: '/api/avatars',
} as const;

/**
 * HTTP Headers
 */
export const HTTP_HEADERS = {
  CONTENT_TYPE: {
    JSON: 'application/json',
    FORM_DATA: 'multipart/form-data',
  },
  COOKIE: 'Cookie',
  SET_COOKIE: 'set-cookie',
  AUTHORIZATION: 'Authorization',
} as const;

/**
 * HTTP Methods
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

/**
 * API Configuration
 */
export const API_CONFIG = {
  WITH_CREDENTIALS: true,
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
} as const;

