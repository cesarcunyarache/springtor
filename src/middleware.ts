export  { auth as middleware } from "@/auth";

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
