import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY, SESSION_ID_KEY } from "./constants";

export const tokenStore = {
  getAccessToken: (): string | null =>
    typeof window !== "undefined"
      ? localStorage.getItem(ACCESS_TOKEN_KEY)
      : null,

  setAccessToken: (token: string, expiresIn?: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);

      // Note: js-cookie handles numeric days
      let expiryDate: Date | number = 7; // Default fallback: 7 days

      // if (expiresIn) {
      //   const numericValue = parseInt(expiresIn, 10);
      //   const unit = expiresIn.slice(-1).toLowerCase();
      //   const now = new Date();

      //   switch (unit) {
      //     case "s": // Seconds
      //       expiryDate = new Date(now.getTime() + numericValue * 1000);
      //       break;
      //     case "m": // Minutes
      //       expiryDate = new Date(now.getTime() + numericValue * 60000);
      //       break;
      //     case "h": // Hours
      //       expiryDate = new Date(now.getTime() + numericValue * 3600000);
      //       break;
      //     case "d": // Days
      //       expiryDate = numericValue;
      //       break;
      //     default:
      //       // If the backend sends just a number (e.g - "3600"),
      //       // assume it's seconds.
      //       if (!isNaN(Number(expiresIn))) {
      //         expiryDate = new Date(now.getTime() + Number(expiresIn) * 1000);
      //       }
      //   }
      // }

      Cookies.set(ACCESS_TOKEN_KEY, token, {
        expires: expiryDate,
        path: "/",
        sameSite: "strict",
        secure: true,
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
