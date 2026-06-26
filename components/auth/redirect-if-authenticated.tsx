"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/auth/auth-context";

type RedirectIfAuthenticatedProps = {
  destination?: string;
};

export function RedirectIfAuthenticated({
  destination = "/conta",
}: RedirectIfAuthenticatedProps) {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(destination);
    }
  }, [destination, isLoading, router, user]);

  return null;
}
