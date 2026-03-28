"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/use-toast";
import { Mail, Lock, User, AlertCircle } from "lucide-react";

const PRIMARY = "#5e72e4";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Call register API
      toast({
        title: "Account created",
        message: "Check your email to verify your account",
        type: "success",
      });
      router.push("/login?verified=true");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        message: error?.message || "Something went wrong",
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
            Create account
          </h1>
          <p className="text-gray-600">Join ShortUrl and start shortening URLs</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-blue-500/15 p-9 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 text-gray-900 outline-none transition-colors focus:border-blue-500 focus:bg-blue-50/30"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

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
              {loading ? "Creating account..." : "Create account →"}
            </button>
          </form>

          {/* Sign in link */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
