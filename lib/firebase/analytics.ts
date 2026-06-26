"use client";

import type { Analytics } from "firebase/analytics";
import { getFirebaseApp } from "./client";

let analyticsInstance: Analytics | null | undefined;

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") {
    return null;
  }

  if (analyticsInstance !== undefined) {
    return analyticsInstance;
  }

  const { getAnalytics, isSupported } = await import("firebase/analytics");

  if (!(await isSupported())) {
    analyticsInstance = null;
    return null;
  }

  analyticsInstance = getAnalytics(getFirebaseApp());
  return analyticsInstance;
}
