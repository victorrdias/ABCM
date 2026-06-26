import type { App } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";
import { getAdminCredentials, isFirebaseAdminConfigured } from "./admin-config";

export { isFirebaseAdminConfigured } from "./admin-config";

let adminApp: App | undefined;
let adminAuth: Auth | undefined;
let adminDb: Firestore | undefined;

export async function getFirebaseAdminApp(): Promise<App> {
  if (!isFirebaseAdminConfigured()) {
    throw new Error(
      "Firebase Admin is not configured. Add FIREBASE_ADMIN_* env vars from your service account.",
    );
  }

  if (!adminApp) {
    const { cert, getApps, initializeApp } = await import("firebase-admin/app");
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

export async function getFirebaseAdminAuth(): Promise<Auth> {
  if (!adminAuth) {
    const { getAuth } = await import("firebase-admin/auth");
    adminAuth = getAuth(await getFirebaseAdminApp());
  }

  return adminAuth;
}

export async function getFirebaseAdminDb(): Promise<Firestore> {
  if (!adminDb) {
    const { getFirestore } = await import("firebase-admin/firestore");
    adminDb = getFirestore(await getFirebaseAdminApp());
  }

  return adminDb;
}
