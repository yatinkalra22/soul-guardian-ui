'use client';

import { useEffect } from 'react';

/**
 * Global error boundary that catches errors in the root layout.
 * This is a fallback for catastrophic errors that occur before the app can render.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  const handleLogin = () => {
    window.location.href = '/';
  };

  return (
    <html lang="en">
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f7fafc',
          padding: '2rem',
        }}>
          <div style={{
            maxWidth: '32rem',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            padding: '3rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>⚠️</div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#1a202c',
              marginBottom: '1rem',
            }}>
              Oops! Something went wrong
            </h1>
            <p style={{
              color: '#718096',
              fontSize: '1.125rem',
              marginBottom: '2rem',
            }}>
              We&apos;re sorry, but something unexpected happened. Please try again in a moment.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={reset}
                style={{
                  backgroundColor: '#3182ce',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>
              <button
                onClick={handleLogin}
                style={{
                  backgroundColor: 'white',
                  color: '#3182ce',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #3182ce',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

