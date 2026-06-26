import { cookies } from "next/headers";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-config";
import { SESSION_COOKIE_NAME, type SessionUser } from "@/lib/auth/session";

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    if (!isFirebaseAdminConfigured()) {
      return null;
    }

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionCookie) {
      return null;
    }

    const { verifySessionCookie } = await import("@/lib/auth/session-server");
    return await verifySessionCookie(sessionCookie);
  } catch {
    return null;
  }
}
