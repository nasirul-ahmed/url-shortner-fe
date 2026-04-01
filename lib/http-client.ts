import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { BASE_URL } from "./constants";
import { tokenStore } from "./token-store";
import { ApiResponse } from "@/types/api";

interface QueueItem {
  resolve: (value: string | null) => void;
  reject: (reason?: unknown) => void;
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const httpClient = axiosInstance as {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  <T = any>(config: InternalAxiosRequestConfig): Promise<T>;
};

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
axiosInstance.interceptors.request.use((config) => {
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
axiosInstance.interceptors.response.use(
  (response) => {
    const res = response.data as ApiResponse<any>;

    // Unwrap success responses for the frontend
    if (res.success) return res.data;

    // Reject with the custom error object from backend
    return Promise.reject(res.error);
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If not a 401, or already retried, just fail
    if (error.response?.status !== 401 || originalRequest._retry) {
      // Return the backend's error object if available, otherwise the axios error
      const backendError = (error.response?.data as ApiResponse<any>)?.error;
      return Promise.reject(backendError || error);
    }

    // console.log("Attempting silent refresh...");

    // Prevent infinite loops if the refresh call itself fails with 401
    if (originalRequest.url?.includes("/auth/refresh")) {
      tokenStore.clear();
      // if (typeof window !== "undefined")
        // window.location.href = "/login?error=session_expired";
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string | null) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(httpClient(originalRequest));
          },
          reject: (err: any) => reject(err),
        });
      });
    }

    isRefreshing = true;

    try {
      const sessionId = tokenStore.getSessionId();

      /**
       * IMPORTANT: We use raw 'axios' here to bypass the interceptor's
       * auto-unwrapping, but we MUST manually handle the new response structure.
       */
      const response = await axios.post<
        ApiResponse<{
          accessToken: string;
          sessionId: string;
          expiresIn: string;
        }>
      >(`${BASE_URL}/auth/refresh`, { sessionId }, { withCredentials: true });

      const apiResponse = response.data; // This is { success, data, error }

      if (!apiResponse.success || !apiResponse.data) {
        throw new Error("Refresh failed");
      }

      // Extract from the INNER data object
      const {
        accessToken,
        sessionId: newSessionId,
        expiresIn,
      } = apiResponse.data;

      tokenStore.setAccessToken(accessToken, expiresIn);
      tokenStore.setSessionId(newSessionId);

      // Update original request headers
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      originalRequest.headers["x-session-id"] = newSessionId;

      drainQueue(null, accessToken);

      return httpClient(originalRequest);
    } catch (err) {
      console.log("REFRESH FAILED:", err);
      drainQueue(err, null);
      tokenStore.clear();
      // if (typeof window !== "undefined")
      //   window.location.href = "/login?error=session_expired";
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
