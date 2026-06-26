"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export function AccountLogoutButton() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    try {
      await signOut();
      router.push("/");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-blue px-6 py-3 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-green-light disabled:cursor-not-allowed disabled:opacity-60"
    >
      <LogOut className="h-4 w-4" strokeWidth={1.75} />
      {isLoading ? "Saindo..." : "Sair da conta"}
    </button>
  );
}
