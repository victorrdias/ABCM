import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { ImpactStatement } from "@/components/impact-statement/impact-statement";
import { Steps } from "@/components/steps/steps";
import { BenefitsSection } from "@/components/subhero/benefits-section";
import { Subhero } from "@/components/subhero/subhero";

export default function Home() {
  return (
    <>
      <Hero />
      <Subhero />
      <ImpactStatement />
      <Steps />
      <BenefitsSection />
      <Footer />
    </>
  );
}
