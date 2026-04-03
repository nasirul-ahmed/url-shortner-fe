import { httpClient } from "./http-client";
import * as T from "../types/api";
import { toQueryString } from "./utils";
import { redirect } from "next/dist/server/api-utils";

export const authApi = {
  me: () => httpClient.get<any>("/auth/me"),

  login: (email: string, password: string) => {
    return httpClient.post<{
      accessToken: string;
      sessionId: string;
      expiresIn: string;
    }>("/auth/login", {
      email,
      password,
    });
  },

  register: (input: { email: string; password: string; username: string }) => {
    return httpClient.post<{
      userId: "69ccc65bdd7974a5c4de9d4a";
      email: "nasirul3691@gmail.com";
      username: "nasir1";
    }>("auth/register", input);
  },

  logout: (sessionId: string) => httpClient.post("/auth/logout", { sessionId }),

  getSessions: () => httpClient.get<T.Session[]>("/auth/sessions"),
};

export const linksApi = {
  dashboardData: (query: any) =>
    httpClient.get(`/dashboard${toQueryString(query)}`),

  list: (page = 1, limit = 10) =>
    httpClient.get<T.PaginatedLinks>(`/links?page=${page}&limit=${limit}`),

  create: (payload: T.CreateLinkPayload) =>
    httpClient.post<T.ShortUrlLink>("/shorten", payload),

  getLongUrl: async (shortCode: string) => httpClient.get<string>(`/${shortCode}`),

  getAnalytics: (shortCode: string) =>
    httpClient.get<T.LinkAnalytics>(`/${shortCode}/analytics`),
};
