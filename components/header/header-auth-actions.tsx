"use client";

import clsx from "clsx";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

const linkClassName =
  "rounded-full px-4 py-2 text-sm font-medium text-brand-blue transition-colors hover:bg-brand-green-light";

const outlineClassName =
  "rounded-full border border-brand-blue px-4 py-2 text-sm font-medium text-brand-blue transition-colors hover:bg-brand-green-light";

type HeaderAuthActionsProps = {
  onNavigate?: () => void;
  className?: string;
  mobile?: boolean;
};

export function HeaderAuthActions({
  onNavigate,
  className,
  mobile = false,
}: HeaderAuthActionsProps) {
  const { user, isLoading } = useAuth();

  const itemClassName = mobile ? clsx(linkClassName, "py-3 text-center") : linkClassName;
  const outlineItemClassName = mobile
    ? clsx(outlineClassName, "py-3 text-center")
    : outlineClassName;

  if (isLoading) {
    return (
      <span
        className={clsx(
          "text-sm font-medium text-brand-blue/50",
          mobile ? "py-3 text-center" : "rounded-full px-4 py-2",
          className,
        )}
      >
        ...
      </span>
    );
  }

  if (user) {
    return (
      <div className={clsx("flex items-center gap-2", mobile && "flex-col", className)}>
        <Link href="/conta" onClick={onNavigate} className={itemClassName}>
          Minha conta
        </Link>
        <Link
          href="/nossos-produtos"
          onClick={onNavigate}
          className={outlineItemClassName}
        >
          {mobile ? "Nossos Produtos" : "Produtos"}
        </Link>
      </div>
    );
  }

  return (
    <div className={clsx("flex items-center gap-2", mobile && "flex-col", className)}>
      <Link href="/register" onClick={onNavigate} className={itemClassName}>
        Cadastrar
      </Link>
      <Link href="/login" onClick={onNavigate} className={outlineItemClassName}>
        Entrar
      </Link>
    </div>
  );
}
