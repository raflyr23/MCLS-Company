// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config"; // <--- Pastikan import ini ke .config
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // ... (Logika middleware Anda yang sudah ada, tetap sama) ...
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;
  const { nextUrl } = req;
  
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isAuthRoute = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/pendaftaran");
  const isPublicRoute = nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/programs") || nextUrl.pathname.startsWith("/about") || nextUrl.pathname.startsWith("/contact");

  if (isLoggedIn && userRole === "ADMIN") {
    if (isAuthRoute || isPublicRoute) {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }
  }

  if (isLoggedIn && userRole !== "ADMIN") {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  if (!isLoggedIn) {
    if (isAdminRoute || nextUrl.pathname.startsWith("/profile") || nextUrl.pathname.startsWith("/daftar-program")) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};