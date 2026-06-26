import type { Metadata } from "next";
import { Footer } from "@/components/footer/footer";
import { LoginForm } from "@/components/login/login-form";
import { redirectIfAuthenticated } from "@/lib/auth/require-session";

export const metadata: Metadata = {
  title: "Entrar",
};

export default async function LoginPage() {
  await redirectIfAuthenticated();

  return (
    <>
      <section className="bg-surface-muted py-10 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <LoginForm />
        </div>
      </section>
      <Footer />
    </>
  );
}
