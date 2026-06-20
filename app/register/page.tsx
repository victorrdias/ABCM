import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer/footer";
import { PagePlaceholder } from "@/components/ui/page-placeholder";

export const metadata: Metadata = {
  title: "Cadastrar",
};

export default function RegisterPage() {
  return (
    <>
      <PagePlaceholder
        title="Criar cadastro"
        description="Cadastre-se para iniciar sua associação e ter acesso ao acolhimento, orientação e produtos da ABCM."
        cta={{ label: "Como associar", href: "/como-associar" }}
      />
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <p className="text-sm text-text-muted">
          Já possui conta?{" "}
          <Link href="/login" className="font-medium text-brand-blue hover:underline">
            Entrar
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
