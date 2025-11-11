import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

// Configure AuthKit middleware for authentication
// The root path '/' and callback route are accessible without authentication
export default authkitMiddleware({
    middlewareAuth: {
        enabled: true,
        unauthenticatedPaths: ['/', '/callback'],
    },
});