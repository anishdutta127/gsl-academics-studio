import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  isValidSessionCookie
} from "@/lib/gate/session";

/*
 * The password gate. Runs on the Edge runtime (Next 14 middleware).
 *
 * Exempt paths:
 *   /sign-in         the form itself
 *   /api/sign-in     the form submit handler
 *   Next internals and static assets handled by the matcher below
 *
 * Everything else is redirected to /sign-in with ?from=<original-path>
 * unless the caller has a valid session cookie.
 */

const EXEMPT_EXACT = new Set<string>(["/sign-in"]);
const EXEMPT_PREFIX = ["/api/sign-in"];

export const config = {
  matcher: [
    // Match every route except Next internals and static files with an extension.
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"
  ]
};

function isExempt(pathname: string): boolean {
  if (EXEMPT_EXACT.has(pathname)) return true;
  return EXEMPT_PREFIX.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isExempt(pathname)) return NextResponse.next();

  const secret = process.env.GSL_STUDIO_PASSWORD;
  if (!secret) {
    console.error("[gate] GSL_STUDIO_PASSWORD not set, redirecting to /sign-in");
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!cookie || !(await isValidSessionCookie(cookie, secret))) {
    const signIn = new URL("/sign-in", request.url);
    if (pathname !== "/") {
      signIn.searchParams.set("from", pathname + request.nextUrl.search);
    }
    return NextResponse.redirect(signIn);
  }

  return NextResponse.next();
}
