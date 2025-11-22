/**
 * API Client Index
 * Central export point for all API modules
 */

// Export clients
export { serverApiClient, clientApiClient, handleApiError } from './client';

// Export auth API
export * from './auth';

// Export avatar API
export * from './avatar';

// Export user API
export * from './user';

