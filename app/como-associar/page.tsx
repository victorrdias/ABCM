import type { Metadata } from "next";
import { Footer } from "@/components/footer/footer";
import { AssociationGuide } from "@/components/como-associar/association-guide";

export const metadata: Metadata = {
  title: "Como Associar",
};

export default function ComoAssociarPage() {
  return (
    <>
      <section className="bg-surface-muted py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AssociationGuide />
        </div>
      </section>
      <Footer />
    </>
  );
}
