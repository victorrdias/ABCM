"use client";

import { useMutation } from "@tanstack/react-query";
import { submitRegistration } from "@/lib/register/api";
import type { RegisterFormValues } from "@/lib/register/schema";

export function useRegisterMutation() {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (values: RegisterFormValues) => submitRegistration(values),
    onSuccess: () => {
      // Hard navigation guarantees the new session cookie is sent and
      // bypasses the Router Cache, avoiding the /conta <-> /login loop.
      window.location.replace("/conta");
    },
  });
}
