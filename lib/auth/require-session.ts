import { redirect } from "next/navigation";
import { getSessionUser } from "./get-session-user";

export async function requireSession() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function redirectIfAuthenticated(destination = "/conta") {
  const user = await getSessionUser();
  if (user) {
    redirect(destination);
  }
}
