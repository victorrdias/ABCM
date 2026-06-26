"use client";

import { useMutation } from "@tanstack/react-query";
import {
  getFirebaseAuthErrorMessage,
  signInWithEmail,
} from "@/lib/auth/firebase-auth";
import { establishSession } from "@/lib/auth/session-client";
import type { LoginFormValues } from "@/lib/login/schema";

export function useLoginMutation() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }: LoginFormValues) => {
      try {
        const credential = await signInWithEmail(email, password);
        const idToken = await credential.user.getIdToken();
        await establishSession(idToken);
        return credential;
      } catch (error) {
        const code =
          error && typeof error === "object" && "code" in error
            ? String(error.code)
            : "auth/unknown";
        throw new Error(getFirebaseAuthErrorMessage(code));
      }
    },
    onSuccess: () => {
      // Hard navigation guarantees the new session cookie is sent and
      // bypasses the Router Cache, avoiding the /conta <-> /login loop.
      window.location.replace("/conta");
    },
  });
}
