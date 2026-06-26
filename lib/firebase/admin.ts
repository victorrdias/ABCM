import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let adminApp: App | undefined;
let adminAuth: Auth | undefined;
let adminDb: Firestore | undefined;

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

function getAdminCredentials() {
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

export function getFirebaseAdminApp(): App {
  if (!isFirebaseAdminConfigured()) {
    throw new Error(
      "Firebase Admin is not configured. Add FIREBASE_ADMIN_* env vars from your service account.",
    );
  }

  if (!adminApp) {
    const credentials = getAdminCredentials()!;

    try {
      adminApp = getApps().length
        ? getApps()[0]
        : initializeApp({
            credential: cert(credentials),
          });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid Firebase Admin credentials";
      throw new Error(
        `Firebase Admin failed to initialize. Check FIREBASE_ADMIN_PRIVATE_KEY in Vercel (no quotes, valid PEM). ${message}`,
      );
    }
  }

  return adminApp;
}

export function getFirebaseAdminAuth(): Auth {
  if (!adminAuth) {
    adminAuth = getAuth(getFirebaseAdminApp());
  }

  return adminAuth;
}

export function getFirebaseAdminDb(): Firestore {
  if (!adminDb) {
    adminDb = getFirestore(getFirebaseAdminApp());
  }

  return adminDb;
}
