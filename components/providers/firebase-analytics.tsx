"use client";

import { useEffect } from "react";
import { getFirebaseAnalytics } from "@/lib/firebase/analytics";

export function FirebaseAnalytics() {
  useEffect(() => {
    void getFirebaseAnalytics();
  }, []);

  return null;
}
