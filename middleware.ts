import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

// IMPORTANT: middlewareAuth is disabled due to Netlify deployment compatibility issues.
//
// When middlewareAuth.enabled is set to true, Netlify's Edge Runtime throws the error:
// "You are calling 'withAuth' on a route that isn't covered by the AuthKit middleware"
//
// This happens because the middleware authentication enforcement doesn't work properly
// on Netlify's serverless/edge environment, even though it works fine locally.
//
// Related issue: https://github.com/workos/authkit-nextjs/issues/288
// (Similar issue reported with Bun, but same root cause with edge runtime environments)
//
// With middlewareAuth.enabled: false, the middleware still runs to:
// - Manage session cookies
// - Handle authentication state
// - Allow withAuth() to work in server components
//
// Authentication checks are now handled at the component level using withAuth()
// instead of being enforced at the middleware level.
export default authkitMiddleware({
    middlewareAuth: {
        enabled: false,
        unauthenticatedPaths: ['/'],
    },
});

export const config = {
    // This matcher includes all routes except Next.js internals and static files
    matcher: [
        '/',
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};