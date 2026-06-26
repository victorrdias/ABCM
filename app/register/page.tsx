import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer/footer";
import { RegisterForm } from "@/components/register/register-form";
import { redirectIfAuthenticated } from "@/lib/auth/require-session";

export const metadata: Metadata = {
  title: "Cadastrar",
};

export default async function RegisterPage() {
  await redirectIfAuthenticated();

  return (
    <>
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
