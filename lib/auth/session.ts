export const SESSION_COOKIE_NAME = "__session";
export const SESSION_MAX_AGE_MS = 60 * 60 * 24 * 5 * 1000; // 5 days
export const SESSION_MAX_AGE_SEC = SESSION_MAX_AGE_MS / 1000;

export type SessionUser = {
  uid: string;
  email: string | null;
  name: string | null;
};
