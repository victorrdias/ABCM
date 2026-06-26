import { isFirebaseAdminConfigured } from "@/lib/firebase/admin-config";

export type AssociateProfile = {
  associateType?: string;
  patientName?: string;
  email?: string;
  cpf?: string;
  birthDate?: string;
  sex?: string;
  doctorName?: string;
  doctorCrmUf?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  complement?: string;
  city?: string;
  addressState?: string;
  zipCode?: string;
  healthPlan?: string;
  pathologies?: Array<{
    pathology?: string;
    diagnosisYear?: string;
    symptoms?: string;
  }>;
  documents?: {
    status?: string;
  };
};

const ASSOCIATE_TYPE_LABELS: Record<string, string> = {
  paciente: "Paciente",
  responsavel: "Responsável",
  profissional: "Profissional da saúde",
};

const SEX_LABELS: Record<string, string> = {
  masculino: "Masculino",
  feminino: "Feminino",
  outro: "Outro",
  "prefiro-nao-informar": "Prefiro não informar",
};

export function formatAssociateType(value?: string) {
  if (!value) return "—";
  return ASSOCIATE_TYPE_LABELS[value] ?? value;
}

export function formatSex(value?: string) {
  if (!value) return "—";
  return SEX_LABELS[value] ?? value;
}

export function maskCpf(cpf?: string) {
  if (!cpf) return "—";
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return cpf;
  return `***.***.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

export async function getAssociateProfile(
  uid: string,
): Promise<AssociateProfile | null> {
  if (!isFirebaseAdminConfigured()) {
    return null;
  }

  const { getFirebaseAdminDb } = await import("@/lib/firebase/admin");
  const snapshot = await (await getFirebaseAdminDb())
    .collection("associates")
    .doc(uid)
    .get();

  if (!snapshot.exists) {
    return null;
  }

  return snapshot.data() as AssociateProfile;
}
