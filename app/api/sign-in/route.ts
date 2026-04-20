import { NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  constantTimeEqual,
  issueSessionCookie
} from "@/lib/gate/session";

export const runtime = "nodejs";

interface SignInBody {
  password?: unknown;
}

export async function POST(request: Request) {
  let body: SignInBody;
  try {
    body = (await request.json()) as SignInBody;
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  const password =
    typeof body.password === "string" ? body.password : "";

  const expected = process.env.GSL_STUDIO_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "Studio is not configured yet. Ask Anish." },
      { status: 500 }
    );
  }

  if (!constantTimeEqual(password, expected)) {
    return NextResponse.json(
      { error: "That is not the password. Check with the team." },
      { status: 401 }
    );
  }

  const cookieValue = await issueSessionCookie(expected);
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: cookieValue,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS
  });
  return response;
}
