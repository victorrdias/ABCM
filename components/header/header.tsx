"use client";

import clsx from "clsx";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/lib/navigation";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
          <Image
            src="/logl.png"
            alt="ABCM - Associação Brasileira de Cannabis Medicinal"
            width={72}
            height={72}
            className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-muted hover:text-brand-blue",
                pathname === link.href
                  ? "text-brand-blue"
                  : "text-slate-700",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-brand-blue transition-colors hover:bg-brand-green-light"
          >
            Entrar
          </Link>
          <Link
            href="/nossos-produtos"
            className="rounded-full border border-brand-blue px-4 py-2 text-sm font-medium text-brand-blue transition-colors hover:bg-brand-green-light"
          >
            Produtos
          </Link>
          <Link
            href="/como-associar"
            className="rounded-full bg-brand-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-blue-dark"
          >
            Quero me associar
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          className="inline-flex items-center justify-center rounded-lg p-2 text-brand-blue lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "rounded-lg px-3 py-3 text-sm font-medium",
                  pathname === link.href
                    ? "bg-brand-green-light text-brand-blue"
                    : "text-slate-700 hover:bg-surface-muted",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="rounded-full px-4 py-3 text-center text-sm font-medium text-brand-blue hover:bg-brand-green-light"
            >
              Entrar / Cadastrar
            </Link>
            <Link
              href="/nossos-produtos"
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-brand-blue px-4 py-3 text-center text-sm font-medium text-brand-blue hover:bg-brand-green-light"
            >
              Nossos Produtos
            </Link>
            <Link
              href="/como-associar"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-brand-blue px-4 py-3 text-center text-sm font-medium text-white hover:bg-brand-blue-dark"
            >
              Quero me associar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
