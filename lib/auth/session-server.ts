import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-config";
import type { SessionUser } from "./session";

export async function createSessionCookie(idToken: string): Promise<string> {
  const { getFirebaseAdminAuth } = await import("@/lib/firebase/admin");
  const auth = await getFirebaseAdminAuth();
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  return auth.createSessionCookie(idToken, { expiresIn });
}

export async function verifySessionCookie(
  sessionCookie: string,
): Promise<SessionUser> {
  const { getFirebaseAdminAuth } = await import("@/lib/firebase/admin");
  const auth = await getFirebaseAdminAuth();
  const decoded = await auth.verifySessionCookie(sessionCookie, true);

  return {
    uid: decoded.uid,
    email: decoded.email ?? null,
    name: decoded.name ?? null,
  };
}

export async function revokeSessionCookie(sessionCookie: string): Promise<void> {
  const { getFirebaseAdminAuth } = await import("@/lib/firebase/admin");
  const auth = await getFirebaseAdminAuth();
  const decoded = await auth.verifySessionCookie(sessionCookie);

  await auth.revokeRefreshTokens(decoded.sub);
}

export { isFirebaseAdminConfigured };
