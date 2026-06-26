import { FlaskConical, Heart, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";
import {
  aboutCta,
  aboutHero,
  aboutJourney,
  aboutPillars,
  aboutQuote,
  aboutStats,
  aboutStory,
} from "@/lib/quem-somos/content";

const pillarIcons = {
  heart: Heart,
  shield: Shield,
  flask: FlaskConical,
} as const;

export function AboutPage() {
  return (
    <>
      <section className="relative min-h-[70vh] overflow-hidden">
        <Image
          src="/home.png"
          alt=""
          aria-hidden
          fill
          priority
          className="about-hero-image object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-br from-brand-blue-dark/90 via-brand-blue/75 to-brand-green/60" />

        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <p className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
              {aboutHero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="about-display mt-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {aboutHero.title}
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              {aboutHero.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {aboutStory.title}
            </h2>
          </Reveal>
          <div className="mt-8 space-y-6">
            {aboutStory.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 100}>
                <p className="text-base leading-relaxed text-text-muted sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-surface-muted py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {aboutStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 120}>
                <div className="text-center">
                  <p className="about-stat text-4xl font-bold text-brand-blue sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
              O que nos move
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {aboutPillars.map((pillar, index) => {
              const Icon = pillarIcons[pillar.icon];
              return (
                <Reveal key={pillar.title} delay={index * 120}>
                  <article className="group h-full rounded-2xl border border-slate-200 bg-surface-card p-6 transition-all hover:border-brand-blue/20 hover:bg-brand-green-light/40 hover:shadow-sm sm:p-8">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green-light text-brand-blue transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-brand-blue">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
                      {pillar.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
              Como caminhamos com você
            </h2>
          </Reveal>
          <div className="relative mt-14">
            <div
              aria-hidden
              className="absolute left-4 top-0 hidden h-full w-0.5 bg-brand-blue/15 sm:block"
            />
            <div className="space-y-8">
              {aboutJourney.map((item, index) => (
                <Reveal key={item.step} delay={index * 100}>
                  <div className="relative flex gap-6 sm:gap-8">
                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white sm:h-10 sm:w-10 sm:text-sm">
                      {item.step}
                    </span>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:flex-1 sm:p-6">
                      <h3 className="font-semibold text-brand-blue">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(21_128_61/0.06),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <blockquote className="about-display text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              &ldquo;{aboutQuote.text}&rdquo;
            </blockquote>
            <cite className="mt-6 block text-sm font-medium not-italic text-brand-blue">
              — {aboutQuote.attribution}
            </cite>
          </Reveal>
        </div>
      </section>

      <section className="bg-linear-to-br from-brand-blue to-brand-green py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {aboutCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90">
              {aboutCta.description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={aboutCta.primaryHref}
                className="inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-green-light"
              >
                {aboutCta.primaryLabel}
              </Link>
              <Link
                href={aboutCta.secondaryHref}
                className="inline-flex rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {aboutCta.secondaryLabel}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
