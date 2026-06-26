"use client";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirebaseAuthErrorMessage } from "@/lib/auth/firebase-auth";
import { establishSession } from "@/lib/auth/session-client";
import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase/client";
import { PRIVACY_POLICY_VERSION } from "@/lib/legal/constants";
import type { RegisterFormValues } from "./schema";

export type RegisterResponse = {
  id: string;
  email: string;
  displayName: string;
};

function normalizeCpf(cpf: string) {
  return cpf.replace(/\D/g, "");
}

function fileMetadata(file: File | null | undefined) {
  if (!file) return null;

  return {
    name: file.name,
    size: file.size,
    type: file.type,
  };
}

export async function submitRegistration(
  values: RegisterFormValues,
): Promise<RegisterResponse> {
  const auth = getFirebaseAuth();
  const db = getFirebaseDb();

  let credential;

  try {
    credential = await createUserWithEmailAndPassword(
      auth,
      values.login,
      values.password,
    );
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String(error.code)
        : "auth/unknown";
    throw new Error(getFirebaseAuthErrorMessage(code));
  }

  const { user } = credential;

  await updateProfile(user, {
    displayName: values.patientName,
  });

  await setDoc(doc(db, "associates", user.uid), {
    associateType: values.associateType,
    patientName: values.patientName,
    doctorName: values.doctorName,
    doctorCrmUf: values.doctorCrmUf,
    birthDate: values.birthDate,
    sex: values.sex,
    responsibleName: values.responsibleName ?? "",
    cpf: normalizeCpf(values.cpf),
    rg: values.rg ?? "",
    rgIssuer: values.rgIssuer ?? "",
    rgIssuerState: values.rgIssuerState ?? "",
    maritalStatus: values.maritalStatus ?? "",
    profession: values.profession ?? "",
    birthState: values.birthState ?? "",
    birthCity: values.birthCity ?? "",
    healthPlan: values.healthPlan ?? "",
    zipCode: values.zipCode,
    street: values.street,
    number: values.number,
    neighborhood: values.neighborhood,
    complement: values.complement ?? "",
    addressState: values.addressState,
    city: values.city,
    email: values.login,
    referralSource: values.referralSource ?? "",
    pathologies: values.pathologies,
    lgpdConsent: {
      privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      privacyPolicyAcceptedAt: serverTimestamp(),
      sensitiveDataProcessingAcceptedAt: serverTimestamp(),
    },
    documents: {
      status: "pending_upload",
      note: "Arquivos serão enviados quando o Storage estiver habilitado.",
      patientDocument: fileMetadata(values.patientDocument),
      medicalPrescription: fileMetadata(values.medicalPrescription),
      residenceProof: fileMetadata(values.residenceProof),
      medicalReport: fileMetadata(values.medicalReport),
      responsibleDocument: fileMetadata(values.responsibleDocument),
      filingTerm: fileMetadata(values.filingTerm),
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const idToken = await user.getIdToken();
  await establishSession(idToken);

  return {
    id: user.uid,
    email: values.login,
    displayName: values.patientName,
  };
}
