/* export { auth as middleware } from "./auth"; */

import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { guestRegex, isDevelopmentEnvironment } from "./lib/constants";
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  // ⚠️ Evitar redirección infinita en /sign-in o /sign-up
  const isAuthPage = ["/sign-in", "/sign-up", "/"].includes(pathname);

  if (!token) {
    if (!isAuthPage) {
      const redirectUrl = encodeURIComponent(request.nextUrl.href);

      return NextResponse.redirect(
        new URL(`/sign-in?redirectUrl=${redirectUrl}`, request.url)
      );
    }

    return NextResponse.next(); // permite seguir a /sign-in o /sign-up sin token
  }

  const isGuest = guestRegex.test(token?.email ?? "");

  // Si el usuario ya está autenticado y no es guest, redirigir fuera de las auth pages
  if (token && !isGuest && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*     "/", */
    /*  '/chat/:id', */
    "/api/:path*",
    "/sign-in",
    "/sign-up",
    "/",
    "/dashboard",

    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
