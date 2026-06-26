import type { Metadata } from "next";
import Link from "next/link";
import { RedirectIfAuthenticated } from "@/components/auth/redirect-if-authenticated";
import { Footer } from "@/components/footer/footer";
import { RegisterForm } from "@/components/register/register-form";

export const metadata: Metadata = {
  title: "Cadastrar",
};

export default function RegisterPage() {
  return (
    <>
      <RedirectIfAuthenticated />
      <section className="bg-surface-muted py-10 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <RegisterForm />
        </div>
      </section>
      <div className="pb-8 text-center">
        <Link
          href="/politica-de-privacidade"
          className="text-sm font-medium text-brand-blue hover:underline"
        >
          Política de Privacidade
        </Link>
      </div>
      <Footer />
    </>
  );
}
