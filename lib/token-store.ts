import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY, SESSION_ID_KEY } from "./constants";

export const tokenStore = {
  getAccessToken: (): string | null =>
    typeof window !== "undefined"
      ? localStorage.getItem(ACCESS_TOKEN_KEY)
      : null,

  setAccessToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);

      // Sync to Cookie for Next.js Middleware
      Cookies.set(ACCESS_TOKEN_KEY, token, {
        expires: 7, // 7 days
        path: "/",
        sameSite: "strict",
        secure: true, //process.env.NODE_ENV === "production",
      });
    }
  },

  getSessionId: (): string | null =>
    typeof window !== "undefined" ? localStorage.getItem(SESSION_ID_KEY) : null,

  setSessionId: (id: string): void => {
    if (typeof window !== "undefined") localStorage.setItem(SESSION_ID_KEY, id);
  },

  clear: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(SESSION_ID_KEY);

      // Clear the Cookie too
      Cookies.remove(ACCESS_TOKEN_KEY);
    }
  },
};
