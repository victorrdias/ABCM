import type { NextConfig } from "next";

const requiredPublicFirebaseEnv = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
] as const;

const requiredServerFirebaseEnv = [
  "FIREBASE_ADMIN_PROJECT_ID",
  "FIREBASE_ADMIN_CLIENT_EMAIL",
  "FIREBASE_ADMIN_PRIVATE_KEY",
] as const;

function validateEnvAtBuildTime() {
  if (process.env.SKIP_ENV_VALIDATION === "1") return;

  const missingPublic = requiredPublicFirebaseEnv.filter(
    (key) => !process.env[key],
  );
  const missingAdmin = requiredServerFirebaseEnv.filter(
    (key) => !process.env[key],
  );

  if (missingPublic.length > 0) {
    throw new Error(
      [
        "Build blocked: missing Firebase client env vars:",
        missingPublic.join(", "),
        "",
        "Add them in your host (Vercel → Project → Settings → Environment Variables),",
        "scope: Production + Preview, then trigger a new deploy.",
        "",
        "NEXT_PUBLIC_* vars are baked in at build time — adding them after deploy without rebuilding will not work.",
      ].join("\n"),
    );
  }

  if (missingAdmin.length > 0) {
    console.warn(
      `[build] Missing Firebase Admin env vars: ${missingAdmin.join(", ")}. ` +
        "Auth session cookies and /conta protection will not work until these are set.",
    );
  }
}

validateEnvAtBuildTime();

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
