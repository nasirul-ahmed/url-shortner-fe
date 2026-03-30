import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { BASE_URL } from "./constants";
import { tokenStore } from "./token-store";

interface QueueItem {
  resolve: (value: string | null) => void;
  reject: (reason?: unknown) => void;
}

export const httpClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const drainQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

// Request Interceptor
httpClient.interceptors.request.use((config) => {
  const token = tokenStore.getAccessToken();
  const sessionId = tokenStore.getSessionId();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (sessionId && config.headers) {
    config.headers["x-session-id"] = sessionId;
  }

  return config;
});

// Response Interceptor
httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/auth/refresh")) {
      tokenStore.clear();
      if (typeof window !== "undefined")
        window.location.href = "/login?error=session_expired";
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string | null) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(httpClient(originalRequest)); // Resolve with the retried request
          },
          reject: (err: any) => reject(err),
        });
      });
    }

    isRefreshing = true;
    try {
      const sessionId = tokenStore.getSessionId();
      const { data } = await axios.post(
        `${BASE_URL}/auth/refresh`,
        { sessionId },
        { withCredentials: true },
      );

      tokenStore.setAccessToken(data.accessToken);
      tokenStore.setSessionId(data.sessionId);

      drainQueue(null, data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return httpClient(originalRequest);
    } catch (err) {
      console.log(err);
      drainQueue(err, null);
      tokenStore.clear();
      if (typeof window !== "undefined")
        window.location.href = "/login?error=session_expired";
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
