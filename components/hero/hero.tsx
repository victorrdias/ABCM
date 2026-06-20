import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[520px] overflow-hidden sm:min-h-[600px] lg:min-h-[680px]">
      <Image
        src="/home.png"
        alt="Cultivo sustentável de cannabis medicinal"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-linear-to-r from-brand-blue-dark/85 via-brand-blue/70 to-brand-green/55" />

      <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-4 py-20 sm:min-h-[600px] sm:px-6 lg:min-h-[680px] lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            Junte-se a milhares de associados em todo o Brasil
          </p>

          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Transformando vidas com o poder da cannabis medicinal
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Uma associação que acolhe, orienta e facilita o acesso ao
            tratamento com cannabis medicinal de forma segura, legal e
            humanizada.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/como-associar"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-green-light"
            >
              Começar meu tratamento
            </Link>
            <Link
              href="/quem-somos"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Quero saber mais
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
