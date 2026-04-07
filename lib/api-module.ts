import { httpClient } from "./http-client";
import * as T from "../types/api";
import { toQueryString } from "./utils";

export const authApi = {
  me: () => httpClient.get<any>("/auth/me"),

  login: (email: string, password: string) => {
    return httpClient.post<T.LoginResponse>("/auth/login", {
      email,
      password,
    });
  },

  register: (input: { email: string; password: string; username: string }) => {
    return httpClient.post<{ userId: string; email: string; username: string }>(
      "auth/register",
      input,
    );
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

  getLongUrl: async (shortCode: string) =>
    httpClient.get<string>(`/${shortCode}`),

  getAnalytics: (shortCode: string) =>
    httpClient.get(`/analytics/${shortCode}`),

  getDashboardAnalytics: (query?: { days?: number }) => {
    const params = query ? toQueryString(query) : "";
    return httpClient.get<T.DashboardLinkAnalytics>(`/analytics${params}`);
  },
};
