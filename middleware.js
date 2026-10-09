import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "kkl-inventory-secret-security-key-2026"
);

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("session_token")?.value;

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtected =
    pathname === "/" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/inventory") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/master-data") ||
    pathname.startsWith("/hardware-specs");

  let isValidSession = false;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      if (payload?.status === "APPROVED") {
        isValidSession = true;
      }
    } catch {
      isValidSession = false;
    }
  }

  // If trying to access dashboard routes without approved session -> go to /login
  if (isProtected && !isValidSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If already logged in and visiting /login or /register -> go to dashboard
  if (isAuthRoute && isValidSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images/).*)"],
};