import { Phone } from "lucide-react";
import Link from "next/link";
import {
  acolhimentoContact,
  requiredDocuments,
} from "@/lib/associacao/content";

export function AssociationGuide() {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Como se associar
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
          Para se cadastrar, leia com atenção e siga as instruções:
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-brand-blue">
          Documentos necessários
        </h2>
        <ul className="mt-6 space-y-3">
          {requiredDocuments.map((document) => (
            <li
              key={document}
              className="flex items-start gap-3 text-sm leading-relaxed text-foreground sm:text-base"
            >
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green"
              />
              {document}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-text-muted sm:text-base">
          Com todos estes documentos em mãos, preencha seu cadastro e aguarde a
          confirmação por e-mail em até{" "}
          <span className="font-semibold text-foreground">5 dias</span>. Após o
          recebimento do e-mail de confirmação, você terá acesso à área do
          paciente e poderá solicitar seu óleo.
        </p>

        <Link
          href="/register"
          className="mt-6 inline-flex rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
        >
          Criar cadastro
        </Link>
      </section>

      <section className="rounded-2xl border border-brand-blue/15 bg-brand-green-light/40 p-6 sm:p-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-brand-blue">
          Fale com o acolhimento
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
          Em caso de dúvidas sobre o processo de associação, entre em contato
          diretamente com nossa equipe de acolhimento.
        </p>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-blue">
              {acolhimentoContact.label}
            </p>
            <a
              href={acolhimentoContact.phoneHref}
              className="mt-1 inline-flex items-center gap-2 text-lg font-bold text-foreground transition-colors hover:text-brand-blue"
            >
              <Phone className="h-5 w-5 text-brand-blue" strokeWidth={1.75} />
              {acolhimentoContact.phone}
            </a>
            <p className="mt-1 text-xs text-text-muted">
              {acolhimentoContact.hours}
            </p>
          </div>

          <a
            href={acolhimentoContact.phoneHref}
            className="inline-flex items-center justify-center rounded-full border border-brand-blue px-6 py-3 text-sm font-semibold text-brand-blue transition-colors hover:bg-white"
          >
            Ligar agora
          </a>
        </div>
      </section>
    </div>
  );
}
