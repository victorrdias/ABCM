import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer/footer";
import { PagePlaceholder } from "@/components/ui/page-placeholder";

export const metadata: Metadata = {
  title: "Entrar",
};

export default function LoginPage() {
  return (
    <>
      <PagePlaceholder
        title="Área do associado"
        description="Acesse sua conta para acompanhar seu tratamento, enviar receitas e solicitar produtos."
      />
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-sm text-text-muted">
          Ainda não tem cadastro?{" "}
          <Link href="/register" className="font-medium text-brand-blue hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
