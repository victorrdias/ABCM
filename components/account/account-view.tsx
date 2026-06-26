import {
  formatAssociateType,
  formatSex,
  maskCpf,
  type AssociateProfile,
} from "@/lib/associates/get-associate-profile";
import type { SessionUser } from "@/lib/auth/session";
import { DATA_PROTECTION_CONTACT_EMAIL } from "@/lib/legal/constants";
import Link from "next/link";
import { AccountLogoutButton } from "./account-logout-button";

type InfoItemProps = {
  label: string;
  value: string;
};

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="rounded-xl bg-surface-card px-4 py-3">
      <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}

type AccountViewProps = {
  sessionUser: SessionUser;
  profile: AssociateProfile | null;
};

export function AccountView({ sessionUser, profile }: AccountViewProps) {
  const displayName =
    profile?.patientName ?? sessionUser.name ?? "Associado ABCM";
  const email = profile?.email ?? sessionUser.email ?? "—";

  const addressParts = [
    profile?.street,
    profile?.number,
    profile?.neighborhood,
    profile?.city,
    profile?.addressState,
  ].filter(Boolean);

  const address = addressParts.length > 0 ? addressParts.join(", ") : "—";

  const primaryPathology = profile?.pathologies?.[0]?.pathology;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <p className="text-sm font-medium text-brand-blue">Área do associado</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Olá, {displayName.split(" ")[0]}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base">
          Aqui você acompanha os dados do seu cadastro na ABCM. Em breve,
          também poderá enviar receitas e solicitar produtos por aqui.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-brand-blue">
          Dados da conta
        </h2>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem label="Nome" value={displayName} />
          <InfoItem label="E-mail" value={email} />
          <InfoItem
            label="Tipo de associado"
            value={formatAssociateType(profile?.associateType)}
          />
          <InfoItem label="CPF" value={maskCpf(profile?.cpf)} />
          <InfoItem label="Data de nascimento" value={profile?.birthDate ?? "—"} />
          <InfoItem label="Sexo" value={formatSex(profile?.sex)} />
        </dl>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-brand-blue">
          Informações médicas
        </h2>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem label="Médico" value={profile?.doctorName ?? "—"} />
          <InfoItem label="CRM/UF" value={profile?.doctorCrmUf ?? "—"} />
          <InfoItem label="Plano de saúde" value={profile?.healthPlan ?? "—"} />
          <InfoItem label="Patologia principal" value={primaryPathology ?? "—"} />
        </dl>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-brand-blue">
          Endereço
        </h2>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          <InfoItem label="Endereço completo" value={address} />
          <InfoItem label="CEP" value={profile?.zipCode ?? "—"} />
        </dl>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-brand-blue">
          Documentação
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-text-muted">
          {profile?.documents?.status === "pending_upload"
            ? "Seus documentos ainda serão enviados quando o upload estiver disponível."
            : "Status dos documentos não disponível no momento."}
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-brand-blue">
          Privacidade e seus direitos
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-text-muted">
          Seus dados são tratados conforme a LGPD. Você pode solicitar acesso,
          correção ou exclusão dos seus dados pessoais a qualquer momento.
        </p>
        <p className="mt-3 text-sm text-text-muted">
          <Link
            href="/politica-de-privacidade"
            className="font-medium text-brand-blue hover:underline"
          >
            Ler Política de Privacidade
          </Link>
          {" · "}
          <a
            href={`mailto:${DATA_PROTECTION_CONTACT_EMAIL}`}
            className="font-medium text-brand-blue hover:underline"
          >
            {DATA_PROTECTION_CONTACT_EMAIL}
          </a>
        </p>
      </section>

      <div className="flex justify-end">
        <AccountLogoutButton />
      </div>
    </div>
  );
}
