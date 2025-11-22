import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

/**
 * WorkOS AuthKit Middleware Configuration
 *
 * ⚠️ IMPORTANT: We are locked to @workos-inc/authkit-nextjs@0.17.2
 *
 * WHY: Versions 1.0+ have a known bug with Netlify deployments where the middleware
 * header check fails, causing this error:
 * "You are calling 'withAuth' on a route that isn't covered by the AuthKit middleware"
 *
 * TECHNICAL DETAILS:
 * - In v1.0+, withAuth() checks for an 'x-workos-middleware' header
 * - Netlify's edge runtime doesn't properly pass middleware headers to server components
 * - The middleware runs, but the header doesn't reach withAuth()
 * - This works on Vercel but NOT on Netlify
 *
 * GITHUB ISSUE: https://github.com/workos/authkit-nextjs/issues/229
 * STATUS: Open since March 2025, no fix available yet
 *
 * WHEN TO UPGRADE:
 * - Monitor the GitHub issue above
 * - Upgrade when the issue is closed/resolved
 * - OR migrate to Vercel (confirmed working with v2.x)
 *
 * DO NOT UPGRADE without testing on Netlify first!
 */
export default authkitMiddleware({
    middlewareAuth: {
        enabled: true,
        unauthenticatedPaths: ['/', '/callback', '/unauthorize'],
    },
});