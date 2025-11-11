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
    // This matcher excludes the internal Next.js files and API routes
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|_next/server).*)',
    ],
};