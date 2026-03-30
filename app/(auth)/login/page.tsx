"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Mail, Lock } from "lucide-react";
import useToast from "@/contexts/toast-context";

const PRIMARY = "#5e72e4";

export default function LoginPage() {
  const [email, setEmail] = useState("nasirul369@gmail.com");
  const [password, setPassword] = useState("nasir1234");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const shownRef = React.useRef(false);

  useEffect(() => {
    if (!shownRef.current) {
      const verified = searchParams.get("verified");
      const error = searchParams.get("error");

      if (verified === "true") {
        toast({
          title: "Email verified",
          message: "Your account is ready. Sign in below.",
          type: "success",
        });
      } else if (error === "expired" || error === "session_expired") {
        toast({
          title: "Session expired",
          message: "Please sign in again to continue.",
          type: "warning",
        });
      }
      shownRef.current = true;
    }
  }, [searchParams, toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (error: any) {
      console.error("❌ Login error:", error);
      toast({
        title: "Login failed",
        message: error?.message || "Invalid credentials",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #f6f8ff 0%, #eef0fc 100%)",
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-9">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold mx-auto mb-4"
            style={{
              background: `linear-gradient(135deg, ${PRIMARY} 0%, #8898f5 100%)`,
            }}
          >
            S
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Welcome back
          </h1>
          <p className="text-gray-600">Sign in to your ShortUrl workspace</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-blue-500/15 p-9 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 text-gray-900 outline-none transition-colors focus:border-blue-500 focus:bg-blue-50/30"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 text-gray-900 outline-none transition-colors focus:border-blue-500 focus:bg-blue-50/30"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white transition-all mt-6"
              style={{
                background: loading ? "#a5b0f0" : PRIMARY,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
          <p className="text-center text-gray-600 text-sm mt-4">
            Don't want to create an account?
            <Link
              href="/"
              className="font-semibold text-blue-600 ml-2 hover:underline"
            >
              Try as a Guest
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
