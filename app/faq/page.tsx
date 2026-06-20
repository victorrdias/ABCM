import type { Metadata } from "next";
import { Footer } from "@/components/footer/footer";
import { PagePlaceholder } from "@/components/ui/page-placeholder";

export const metadata: Metadata = {
  title: "FAQ",
};

const faqItems = [
  {
    question: "Como faço para me associar?",
    answer:
      "Clique em \"Quero me associar\" e siga o passo a passo em Como Associar. Nossa equipe orienta todo o processo.",
  },
  {
    question: "Preciso de receita médica para me associar?",
    answer:
      "Não. A associação pode ser feita sem receita. Para adquirir produtos, é necessário receita e laudo médico.",
  },
  {
    question: "Em quanto tempo começo a sentir os efeitos?",
    answer:
      "Os efeitos variam conforme patologia, dose e características do paciente. Siga sempre a orientação médica.",
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Perguntas frequentes
        </h1>
        <p className="mt-4 text-base leading-relaxed text-text-muted">
          Tire suas dúvidas sobre associação, tratamento e acesso aos produtos
          da ABCM.
        </p>

        <dl className="mt-10 space-y-6">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-slate-200 bg-surface-card p-5"
            >
              <dt className="font-semibold text-brand-blue">{item.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <Footer />
    </>
  );
}
