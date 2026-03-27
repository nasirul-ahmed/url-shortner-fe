import { httpClient } from "./http-client";
import * as T from "../types/api";

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

  logout: (sessionId: string) => httpClient.post("/auth/logout", { sessionId }),

  getSessions: () => httpClient.get<T.Session[]>("/auth/sessions"),
};

export const linksApi = {
  list: (page = 1, limit = 10) =>
    httpClient.get<T.PaginatedLinks>(`/links?page=${page}&limit=${limit}`),

  create: (payload: T.CreateLinkPayload) =>
    httpClient.post<T.ShortUrlLink>("/shorten", payload),

  getAnalytics: (shortCode: string) =>
    httpClient.get<T.LinkAnalytics>(`/${shortCode}/analytics`),
};
