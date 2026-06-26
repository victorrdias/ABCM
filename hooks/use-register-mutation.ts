"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { submitRegistration } from "@/lib/register/api";
import type { RegisterFormValues } from "@/lib/register/schema";

export function useRegisterMutation() {
  const router = useRouter();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: (values: RegisterFormValues) => submitRegistration(values),
    onSuccess: () => {
      router.push("/conta");
    },
  });
}
