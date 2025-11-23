'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { tokenManager } from '@/lib/tokenManager';

/**
 * Client component to sync auth token from URL to tokenManager
 * After OAuth callback, the token is passed as a query param
 * This component stores it in sessionStorage and cleans up the URL
 */
export function AuthTokenSync() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // Store token in sessionStorage
      tokenManager.setToken(token);
      console.log('✅ Auth token stored in sessionStorage');

      // Clean up URL by removing the token query param
      const url = new URL(window.location.href);
      url.searchParams.delete('token');
      router.replace(url.pathname + url.search);
    } else {
      // Initialize tokenManager on page load
      tokenManager.init();
    }
  }, [searchParams, router]);

  return null; // This component doesn't render anything
}
