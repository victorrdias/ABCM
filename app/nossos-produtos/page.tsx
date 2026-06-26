import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer/footer";
import { ProductsGrid } from "@/components/products/products-grid";

export const metadata: Metadata = {
  title: "Nossos Produtos",
};

export default function NossosProdutosPage() {
  return (
    <>
      <section className="bg-surface-muted py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Nossos produtos
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
              Conheça os óleos e fitoterápicos à base de cannabis medicinal
              desenvolvidos com qualidade, segurança e rastreabilidade para
              associados ABCM.
            </p>
          </div>

          <div className="mt-10">
            <ProductsGrid />
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <p className="text-sm text-text-muted">
              Os produtos estão disponíveis para associados. Faça seu cadastro
              para iniciar o processo de associação.
            </p>
            <Link
              href="/como-associar"
              className="mt-4 inline-flex rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Quero me associar
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
