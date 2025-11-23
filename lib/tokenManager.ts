/**
 * Client-side token management
 * Stores the access token in sessionStorage for API calls
 */

const TOKEN_KEY = 'access_token';

class TokenManager {
  private token: string | null = null;

  /**
   * Initialize token from sessionStorage on client-side
   */
  init() {
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem(TOKEN_KEY);
    }
  }

  /**
   * Set the access token
   */
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  /**
   * Get the current access token
   */
  getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = sessionStorage.getItem(TOKEN_KEY);
    }
    return this.token;
  }

  /**
   * Clear the access token
   */
  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(TOKEN_KEY);
    }
  }
}

export const tokenManager = new TokenManager();
