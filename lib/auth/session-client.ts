"use client";

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
