"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { tokenStore } from "@/lib/token-store";
import { authApi } from "@/lib/api-module";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

interface User {
  _id?: string;
  email: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  emailVerified: boolean;
  emailVerifyToken?: string;
  emailVerifyTokenExpiresAt?: Date;
  resetPasswordTokenHash?: string;
  resetPasswordExpiresAt?: Date;
  disabled: boolean;
  loginAttempts: number;
  lockUntil?: Date;
  lastLoginAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = useCallback(
    async (email: string, password: string) => {
      console.log("Logging in from auth context");

      setIsLoading(true);
      const { data } = await authApi.login(email, password);
      tokenStore.setAccessToken(data.accessToken);
      tokenStore.setSessionId(data.sessionId);

      try {
        const userDetails = await authApi.me();

        console.log({ userDetails: userDetails.data });
        setUser(userDetails.data);
        // window.location.href = "/dashboard";
        router.push("/dashboard");
      } catch (e) {
        const payload = JSON.parse(atob(data.accessToken.split(".")[1]));
        setUser(payload.user);
        // window.location.href = "/dashboard";
        router.push("/dashboard");
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const logout = useCallback(async () => {
    const sessionId = tokenStore.getSessionId();

    if (sessionId) await authApi.logout(sessionId).catch(() => {});

    tokenStore.clear();
    setUser(null);

    // router.push("/login");

    window.location.href = "/login";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
