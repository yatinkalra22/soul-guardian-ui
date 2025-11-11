import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware();

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files, API routes, etc.
     * The root route ('/') is implicitly covered here.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|_next/server).*)",
  ],
};