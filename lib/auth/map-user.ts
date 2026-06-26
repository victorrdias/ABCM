import type { User } from "firebase/auth";
import type { AuthUser } from "./types";

export function mapFirebaseUser(user: User): AuthUser {
  return {
    id: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
}
