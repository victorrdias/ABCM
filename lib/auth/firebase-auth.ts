"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type UserCredential,
} from "firebase/auth";
import { clearSession } from "@/lib/auth/session-client";
import { getFirebaseAuth } from "@/lib/firebase/client";

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<UserCredential> {
  return signInWithEmailAndPassword(getFirebaseAuth(), email, password);
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string,
): Promise<UserCredential> {
  const credential = await createUserWithEmailAndPassword(
    getFirebaseAuth(),
    email,
    password,
  );

  await updateProfile(credential.user, { displayName });

  return credential;
}

export async function signOutUser(): Promise<void> {
  await clearSession();
  await firebaseSignOut(getFirebaseAuth());
}

export function getFirebaseAuthErrorMessage(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "Este e-mail já está cadastrado.";
    case "auth/invalid-email":
      return "Informe um e-mail válido.";
    case "auth/weak-password":
      return "A senha deve ter ao menos 6 caracteres.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "E-mail ou senha incorretos.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente mais tarde.";
    default:
      return "Não foi possível concluir a operação. Tente novamente.";
  }
}
