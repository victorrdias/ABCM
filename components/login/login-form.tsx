"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/ui/form-fields";
import { useLoginMutation } from "@/hooks/use-login-mutation";
import {
  loginDefaultValues,
  loginSchema,
  type LoginFormValues,
} from "@/lib/login/schema";

export function LoginForm() {
  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const onSubmit = handleSubmit((values) => {
    loginMutation.mutate(values);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      noValidate
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Entrar
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Acesse sua conta para acompanhar seu tratamento e solicitar produtos.
        </p>
      </div>

      <FormInput
        label="E-mail"
        required
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <FormInput
        label="Senha"
        required
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />

      {loginMutation.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {loginMutation.error.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || loginMutation.isPending}
        className="inline-flex w-full items-center justify-center rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loginMutation.isPending ? "Entrando..." : "Entrar"}
      </button>

      <p className="text-center text-sm text-text-muted">
        Ainda não tem cadastro?{" "}
        <Link href="/register" className="font-medium text-brand-blue hover:underline">
          Criar conta
        </Link>
      </p>
    </form>
  );
}
