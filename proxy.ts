import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_KEY } from "./lib/constants";

const PROTECTED_ROUTES = [
  "/dashboard",
  "/links",
  "/analytics",
  "/settings",
  "/admin",
];
const AUTH_ROUTES = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthPage = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value;

  // if trying to access a protected route without a token -> Redirect to Login
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // if trying to access Login/Register WITH a token -> Redirect to Dashboard
  if (isAuthPage && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
