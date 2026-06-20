import { Brain, CloudLightning, Frown, Moon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { benefits } from "@/lib/navigation";

const benefitIcons = {
  "cloud-lightning": CloudLightning,
  frown: Frown,
  brain: Brain,
  moon: Moon,
} as const;

export function BenefitsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8">
            <Image
              src="/how-to-help.jpg"
              alt=""
              aria-hidden
              fill
              className="pointer-events-none object-contain object-right opacity-[0.07]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="relative z-10">
              <h2 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl">
                Como a cannabis pode te ajudar
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
                Os fitocanabinoides podem auxiliar em diversos quadros clínicos,
                sempre com acompanhamento médico especializado.
              </p>
              <Link
                href="/quem-somos"
                className="mt-6 inline-flex rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
              >
                Saiba tudo sobre
              </Link>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefitIcons[benefit.icon];

              return (
                <li
                  key={benefit.title}
                  className="rounded-2xl bg-surface-card p-5 transition-colors hover:bg-brand-green-light"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green-light text-brand-blue">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-semibold text-brand-blue">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {benefit.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
