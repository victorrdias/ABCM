import type { Metadata } from "next";
import { AccountView } from "@/components/account/account-view";
import { Footer } from "@/components/footer/footer";
import { getAssociateProfile } from "@/lib/associates/get-associate-profile";
import { requireSession } from "@/lib/auth/require-session";

export const metadata: Metadata = {
  title: "Minha conta",
};

export default async function ContaPage() {
  const sessionUser = await requireSession();
  const profile = await getAssociateProfile(sessionUser.uid);

  return (
    <>
      <section className="bg-surface-muted py-10 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AccountView sessionUser={sessionUser} profile={profile} />
        </div>
      </section>
      <Footer />
    </>
  );
}
