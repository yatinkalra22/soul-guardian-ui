'use client';

import { tokenManager } from './tokenManager';

/**
 * Client-side logout helper
 * Clears the access token from sessionStorage
 * Should be called before server-side logout
 */
export function clearClientAuth() {
  tokenManager.clearToken();
  console.log('✅ Cleared access token from sessionStorage');
}
