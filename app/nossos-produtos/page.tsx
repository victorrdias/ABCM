import type { Metadata } from "next";
import { Footer } from "@/components/footer/footer";
import { PagePlaceholder } from "@/components/ui/page-placeholder";

export const metadata: Metadata = {
  title: "Nossos Produtos",
};

export default function NossosProdutosPage() {
  return (
    <>
      <PagePlaceholder
        title="Nossos produtos"
        description="Conheça os óleos e fitoterápicos à base de cannabis medicinal desenvolvidos com qualidade, segurança e rastreabilidade para associados ABCM."
        cta={{ label: "Quero me associar", href: "/como-associar" }}
      />
      <Footer />
    </>
  );
}
