"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { signOutUser } from "@/lib/auth/firebase-auth";
import { mapFirebaseUser } from "@/lib/auth/map-user";
import { establishSession } from "@/lib/auth/session-client";
import type { AuthUser } from "@/lib/auth/types";
import { getFirebaseAuth } from "@/lib/firebase/client";

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser ? mapFirebaseUser(firebaseUser) : null);
      setIsLoading(false);

      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          await establishSession(idToken);
        } catch {
          // Session cookie requires Firebase Admin env vars.
          // Client auth still works without it.
        }
      }
    });

    return unsubscribe;
  }, []);

  const signOut = useCallback(async () => {
    await signOutUser();
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, signOut }),
    [user, isLoading, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
