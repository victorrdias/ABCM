const firebaseEnvKeys = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
} as const;

const requiredFirebaseEnvKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId",
] as const;

function assertFirebaseConfig() {
  const missing = requiredFirebaseEnvKeys.filter((key) => !firebaseEnvKeys[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing Firebase env vars: ${missing.join(", ")}. ` +
        "Add NEXT_PUBLIC_FIREBASE_* in your hosting provider (e.g. Vercel → Settings → Environment Variables) " +
        "for Production, then redeploy. Local: copy .env.example to .env.local.",
    );
  }
}

export function getFirebaseConfig() {
  assertFirebaseConfig();

  return {
    apiKey: firebaseEnvKeys.apiKey!,
    authDomain: firebaseEnvKeys.authDomain!,
    projectId: firebaseEnvKeys.projectId!,
    storageBucket: firebaseEnvKeys.storageBucket!,
    messagingSenderId: firebaseEnvKeys.messagingSenderId!,
    appId: firebaseEnvKeys.appId!,
    measurementId: firebaseEnvKeys.measurementId,
  };
}
