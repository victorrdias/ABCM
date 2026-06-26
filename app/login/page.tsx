import type { Metadata } from "next";
import { RedirectIfAuthenticated } from "@/components/auth/redirect-if-authenticated";
import { Footer } from "@/components/footer/footer";
import { LoginForm } from "@/components/login/login-form";

export const metadata: Metadata = {
  title: "Entrar",
};

export default function LoginPage() {
  return (
    <>
      <RedirectIfAuthenticated />
      <section className="bg-surface-muted py-10 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <LoginForm />
        </div>
      </section>
      <Footer />
    </>
  );
}
