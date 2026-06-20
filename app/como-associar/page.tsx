import type { Metadata } from "next";
import { Footer } from "@/components/footer/footer";
import { PagePlaceholder } from "@/components/ui/page-placeholder";

export const metadata: Metadata = {
  title: "Como Associar",
};

export default function ComoAssociarPage() {
  return (
    <>
      <PagePlaceholder
        title="Como se associar"
        description="Torne-se associado da ABCM e dê o primeiro passo no seu tratamento com cannabis medicinal. Em breve, você poderá escolher seu plano e iniciar sua associação por aqui."
        cta={{ label: "Criar cadastro", href: "/register" }}
      />
      <Footer />
    </>
  );
}
