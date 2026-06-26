import type { Metadata } from "next";
import { Footer } from "@/components/footer/footer";
import { AboutPage } from "@/components/quem-somos/about-page";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a história da ABCM — associação dedicada ao acolhimento, orientação e acesso seguro à cannabis medicinal no Brasil.",
};

export default function QuemSomosPage() {
  return (
    <>
      <AboutPage />
      <Footer />
    </>
  );
}
