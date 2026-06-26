import { getFirebaseAdminAuth, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import type { SessionUser } from "./session";

export async function createSessionCookie(idToken: string): Promise<string> {
  const auth = getFirebaseAdminAuth();
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  return auth.createSessionCookie(idToken, { expiresIn });
}

export async function verifySessionCookie(
  sessionCookie: string,
): Promise<SessionUser> {
  const auth = getFirebaseAdminAuth();
  const decoded = await auth.verifySessionCookie(sessionCookie, true);

  return {
    uid: decoded.uid,
    email: decoded.email ?? null,
    name: decoded.name ?? null,
  };
}

export async function revokeSessionCookie(sessionCookie: string): Promise<void> {
  const auth = getFirebaseAdminAuth();
  const decoded = await auth.verifySessionCookie(sessionCookie);

  await auth.revokeRefreshTokens(decoded.sub);
}

export { isFirebaseAdminConfigured };
