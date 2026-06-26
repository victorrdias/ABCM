import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/navigation";
import { DATA_PROTECTION_CONTACT_EMAIL } from "@/lib/legal/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-surface-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image
              src="/logl.png"
              alt="ABCM - Associação Brasileira de Cannabis Medicinal"
              width={80}
              height={80}
              className="h-16 w-16 object-contain"
            />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-text-muted">
              Associação Brasileira de Cannabis Medicinal. Acolhimento,
              orientação e acesso seguro ao tratamento com cannabis medicinal.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Navegação</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-brand-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Acesso</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/login"
                  className="text-sm text-text-muted transition-colors hover:text-brand-blue"
                >
                  Entrar
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-text-muted transition-colors hover:text-brand-blue"
                >
                  Cadastrar
                </Link>
              </li>
              <li>
                <Link
                  href="/como-associar"
                  className="text-sm text-text-muted transition-colors hover:text-brand-blue"
                >
                  Como associar
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-text-muted sm:text-left">
          <p>
            © {new Date().getFullYear()} Associação Brasileira de Cannabis
            Medicinal (ABCM). Todos os direitos reservados.
          </p>
          <p className="mt-2">
            <Link
              href="/politica-de-privacidade"
              className="font-medium text-brand-blue hover:underline"
            >
              Política de Privacidade
            </Link>
            {" · "}
            <a
              href={`mailto:${DATA_PROTECTION_CONTACT_EMAIL}`}
              className="hover:text-brand-blue"
            >
              {DATA_PROTECTION_CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
