import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { auth } from "../auth";

const publicRoutes = [''];
const authRoutes = ["/sign-up", "/sign-in"];
const apiAuthPrefix = "/api/auth";

export default auth((req) => {
  /* const { nextUrl } = req;
  const isLoggedIn = !!req.auth;


  if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }


  if (publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }


  if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }


  if (
    !isLoggedIn &&
    !authRoutes.includes(nextUrl.pathname) &&
    !publicRoutes.includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }
 */
 return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};