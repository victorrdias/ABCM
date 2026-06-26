"use client";

import { getFirebaseAuth } from "@/lib/firebase/client";

export async function establishSession(idToken: string): Promise<void> {
  const response = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(payload?.error ?? "Não foi possível iniciar a sessão.");
  }
}

export async function clearSession(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}

/**
 * Establishes the server session cookie for the currently signed-in user.
 * Returns false when there is no signed-in user. Throws if the session
 * endpoint rejects the token.
 */
export async function ensureServerSession(): Promise<boolean> {
  const current = getFirebaseAuth().currentUser;
  if (!current) {
    return false;
  }

  const idToken = await current.getIdToken();
  await establishSession(idToken);
  return true;
}
