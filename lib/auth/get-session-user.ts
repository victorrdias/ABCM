import { cookies } from "next/headers";
import {
  isFirebaseAdminConfigured,
  verifySessionCookie,
} from "@/lib/auth/session-server";
import { SESSION_COOKIE_NAME, type SessionUser } from "@/lib/auth/session";

export async function getSessionUser(): Promise<SessionUser | null> {
  if (!isFirebaseAdminConfigured()) {
    return null;
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    return await verifySessionCookie(sessionCookie);
  } catch {
    // Cookie deletion is only allowed in Route Handlers / Server Actions,
    // not during Server Component render — deleting here causes a 500.
    return null;
  }
}
