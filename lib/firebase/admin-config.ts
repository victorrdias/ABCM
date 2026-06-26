function normalizePrivateKey(raw: string) {
  let key = raw.trim();

  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }

  return key.replace(/\\n/g, "\n");
}

export function getAdminCredentials() {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL?.trim();
  const privateKeyRaw = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKeyRaw) {
    return null;
  }

  const privateKey = normalizePrivateKey(privateKeyRaw);

  if (!privateKey.includes("BEGIN PRIVATE KEY")) {
    return null;
  }

  return { projectId, clientEmail, privateKey };
}

export function isFirebaseAdminConfigured(): boolean {
  return getAdminCredentials() !== null;
}
