import { NextResponse, type NextRequest } from "next/server";
import { createSessionCookie } from "@/lib/auth/session-server";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-config";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SEC,
} from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json(
      {
        error:
          "Firebase Admin não configurado. Adicione FIREBASE_ADMIN_* no .env.local.",
      },
      { status: 503 },
    );
  }

  const body = (await request.json()) as { idToken?: string };

  if (!body.idToken) {
    return NextResponse.json({ error: "Token inválido." }, { status: 400 });
  }

  try {
    const sessionCookie = await createSessionCookie(body.idToken);
    const response = NextResponse.json({ ok: true });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SEC,
    });

    return response;
  } catch (error) {
    const detail =
      error instanceof Error ? error.message : String(error);
    console.error("[api/auth/session] createSessionCookie failed:", detail);

    return NextResponse.json(
      { error: "Não foi possível criar a sessão.", detail },
      { status: 401 },
    );
  }
}
