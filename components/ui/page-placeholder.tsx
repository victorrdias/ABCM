import Link from "next/link";

type PagePlaceholderProps = {
  title: string;
  description: string;
  cta?: {
    label: string;
    href: string;
  };
};

export function PagePlaceholder({
  title,
  description,
  cta,
}: PagePlaceholderProps) {
  return (
    <section className="mx-auto flex min-h-[50vh] max-w-3xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
        {description}
      </p>
      {cta && (
        <Link
          href={cta.href}
          className="mt-8 inline-flex w-fit rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
        >
          {cta.label}
        </Link>
      )}
    </section>
  );
}
