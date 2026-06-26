import { NextResponse, type NextRequest } from "next/server";
import { revokeSessionCookie } from "@/lib/auth/session-server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-config";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (sessionCookie && isFirebaseAdminConfigured()) {
    try {
      await revokeSessionCookie(sessionCookie);
    } catch {
      // Cookie may already be invalid — still clear it below.
    }
  }

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
