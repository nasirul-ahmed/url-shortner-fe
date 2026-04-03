import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_KEY, BASE_URL } from "./lib/constants";

const PROTECTED_ROUTES = [
  "/dashboard",
  "/links",
  "/analytics",
  "/settings",
  "/admin",
];
const AUTH_ROUTES = ["/login", "/register"];

const privateRoutes = [
  ...PROTECTED_ROUTES.concat(AUTH_ROUTES),
  "/_next",
  "/favicon.ico",
];

export async function proxy(request: NextRequest) {
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

  const isShortCodeRoute =
    pathname.length === 9 &&
    !privateRoutes.some((route) => pathname.startsWith(route));

  console.log("isShortCodeRoute: ", isShortCodeRoute, pathname);

  if (isShortCodeRoute) {
    console.log("Attempting to redirect short code: ", pathname);
    const shortcode = pathname.substring(1);
    try {
      const response = await fetch(`${BASE_URL}/${shortcode}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(2000),
      });

      if (response.ok) {
        const json = await response.json();
        const targetUrl = json.data?.longUrl;

        if (targetUrl) {
          const finalUrl = targetUrl.startsWith("http")
            ? targetUrl
            : `https://${targetUrl}`;
          // 307 (Temporary Redirect) is better for analytics tracking
          return NextResponse.redirect(new URL(finalUrl));
        } else NextResponse.next();
      }
    } catch (error) {
      console.log("Redirect error: ", error);
    }
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
