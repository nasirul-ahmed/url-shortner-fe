"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCreateLink } from "@/hooks/use-create-link";
import useToast from "@/hooks/use-toast";
import { ArrowUpRight, LogIn, Zap, BarChart3, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY = "#5e72e4";

export function PublicHome() {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { mutate: createLink } = useCreateLink();

  const isValid = url.match(/^https?:\/\/.+\..+/);

  const handleCreate = async () => {
    if (!isValid) return;
    setLoading(true);

    try {
      createLink(
        {
          longUrl: url,
          customAlias: customCode || undefined,
        },
        {
          onSuccess: (data: any) => {
            toast({
              title: "Link created!",
              message: `Short link: ${data.shortCode}`,
              type: "success",
            });
            setUrl("");
            setCustomCode("");
          },
          onError: () => {
            toast({
              title: "Failed to create link",
              type: "error",
            });
          },
        },
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid && !loading) handleCreate();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{
              background: `linear-gradient(135deg, ${PRIMARY} 0%, #8898f5 100%)`,
            }}
          >
            S
          </div>
          <span
            className="text-lg font-bold text-gray-900"
            style={{ fontFamily: "Georgia, serif" }}
          >
            ShortUrl
          </span>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
        >
          <LogIn className="w-4 h-4" />
          Sign in
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-blue-50 to-blue-100/50">
        <div className="w-full max-w-2xl">
          {/* Headline */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Short links,
              <br />
              <span style={{ color: PRIMARY }}>Big Impact</span>
            </h1>
            <p className="text-lg text-gray-600">
              Create short, memorable links instantly. Track clicks and analyze
              performance in real-time.
            </p>
          </div>

          {/* URL Shortener Card */}
          <div className="bg-white rounded-2xl border border-blue-500/15 p-8 shadow-2xl mb-12">
            {/* URL Input */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 block mb-3">
                Your long URL
              </label>
              <div
                className={cn(
                  "flex items-center gap-3 rounded-xl border-2 p-4 transition-colors",
                  url && !isValid
                    ? "border-red-300 bg-red-50"
                    : url && isValid
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 bg-gray-50",
                )}
              >
                <ArrowUpRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Paste your long URL here... https://example.com/very/long/url"
                  className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500 text-sm"
                />
                {url && isValid && (
                  <span className="text-green-600 font-bold">✓</span>
                )}
              </div>
            </div>

            {/* Custom Code Input */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Custom code{" "}
                <span className="font-normal text-gray-500">(optional)</span>
              </label>
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 px-4">
                <span className="text-sm text-gray-500 font-semibold whitespace-nowrap">
                  short-url.io/
                </span>
                <input
                  value={customCode}
                  onChange={(e) =>
                    setCustomCode(
                      e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                    )
                  }
                  placeholder="my-link"
                  className="flex-1 bg-transparent outline-none p-3 text-gray-900 text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleCreate}
              disabled={!isValid || loading}
              className={cn(
                "w-full py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2",
                !isValid || loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700",
              )}
            >
              <Zap className="w-4 h-4" />
              {loading ? "Creating..." : "Create Short Link →"}
            </button>

            {/* Info */}
            <p className="text-xs text-gray-500 text-center mt-4">
              ✨ Free and instant. No account required to get started.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Instant Links</h3>
              <p className="text-sm text-gray-600">
                Create short URLs in seconds
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center mb-3">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Analytics</h3>
              <p className="text-sm text-gray-600">
                Track clicks and see detailed stats
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mb-3">
                <Lock className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Account Optional</h3>
              <p className="text-sm text-gray-600">
                Sign up for advanced features
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Want advanced features and analytics?
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all"
              style={{ background: PRIMARY }}
            >
              Create Free Account →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-sm py-6 px-6 text-center">
        <p>© 2026 ShortUrl. Simple URL shortening.</p>
      </footer>
    </div>
  );
}
