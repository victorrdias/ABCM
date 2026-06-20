import type { Metadata } from "next";
import { Footer } from "@/components/footer/footer";
import { PagePlaceholder } from "@/components/ui/page-placeholder";

export const metadata: Metadata = {
  title: "Quem Somos",
};

export default function QuemSomosPage() {
  return (
    <>
      <PagePlaceholder
        title="Quem somos"
        description="A ABCM é uma associação dedicada ao acolhimento de pacientes, pesquisa e democratização do acesso à cannabis medicinal no Brasil."
        cta={{ label: "Saiba como associar", href: "/como-associar" }}
      />
      <Footer />
    </>
  );
}
