"use client";

import { useEffect, useRef } from "react";
import { useAuthContext } from "@/lib/auth/auth-context";
import { ensureServerSession } from "@/lib/auth/session-client";

type RedirectIfAuthenticatedProps = {
  destination?: string;
};

export function RedirectIfAuthenticated({
  destination = "/conta",
}: RedirectIfAuthenticatedProps) {
  const { user, isLoading } = useAuthContext();
  const handledRef = useRef(false);

  useEffect(() => {
    if (isLoading || !user || handledRef.current) {
      return;
    }

    handledRef.current = true;

    void (async () => {
      try {
        // Make sure the server session cookie exists before navigating,
        // otherwise /conta would bounce back here and create a redirect loop.
        await ensureServerSession();
      } catch {
        // If the session cannot be established, stay here instead of
        // bouncing to a protected page (which would loop).
        handledRef.current = false;
        return;
      }

      // Hard navigation: sends the freshly-set cookie and bypasses the
      // Next.js Router Cache (which may hold a stale /conta -> /login redirect).
      window.location.replace(destination);
    })();
  }, [destination, isLoading, user]);

  return null;
}
