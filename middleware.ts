import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

// The middlewareAuth object enables authentication on all paths 
// and specifies which paths (like your root '/') are allowed to be 
// viewed by logged-out users (unauthenticatedPaths).
export default authkitMiddleware({
    middlewareAuth: {
        enabled: true,
        // Add all routes you want accessible *without* a session here (e.g., /, /login, /about)
        unauthenticatedPaths: ['/'], 
    },
});

export const config = {
    // This matcher includes all routes except Next.js internals and static files
    // The pattern now properly matches the root path '/' as well
    matcher: [
        '/',
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};