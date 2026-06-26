import type { Metadata } from "next";
import { Footer } from "@/components/footer/footer";
import {
  privacyPolicyMeta,
  privacyPolicySections,
} from "@/lib/legal/privacy-policy";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade e proteção de dados da Associação Brasileira de Cannabis Medicinal (ABCM), em conformidade com a LGPD.",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <section className="bg-surface-muted py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10">
            <p className="text-sm font-medium text-brand-blue">LGPD</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Política de Privacidade
            </h1>
            <p className="mt-4 text-sm text-text-muted">
              Versão {privacyPolicyMeta.version} · Vigente desde{" "}
              {privacyPolicyMeta.effectiveDate}
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Controlador: {privacyPolicyMeta.controller}
            </p>

            <div className="mt-10 space-y-10">
              {privacyPolicySections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-lg font-semibold text-brand-blue">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-3">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-relaxed text-text-muted sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {"list" in section && section.list && (
                    <ul className="mt-4 list-disc space-y-2 pl-5">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="text-sm leading-relaxed text-text-muted sm:text-base"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {"footer" in section && section.footer && (
                    <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
                      {section.footer}
                    </p>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
