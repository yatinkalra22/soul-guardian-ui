import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

// Configure AuthKit middleware for authentication
// The root path '/' and callback route are accessible without authentication
export default authkitMiddleware({
    middlewareAuth: {
        enabled: true,
        unauthenticatedPaths: ['/', '/callback'],
    },
});

// Use the recommended matcher pattern from WorkOS documentation
// This ensures middleware runs on all application routes
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};