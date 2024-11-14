import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the session token from cookies

  const authCookieName = process.env.AD_AUTH_COOKIE_NAME || "";
  const cookie = request.cookies.get(authCookieName);

  // Extract the pathname from the request URL
  const pathname = new URL(request.url).pathname;

  if (!cookie && pathname !== "/flights") {
    return NextResponse.redirect(new URL("/flights", request.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/flights", request.url));
  }

  if (pathname === "/login" && cookie)
    return NextResponse.redirect(new URL("/flights", request.url));

  return NextResponse.next();
}

// Configure middleware to apply to all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
};
