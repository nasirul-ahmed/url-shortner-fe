"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCreateLink } from "@/hooks/use-create-link";
import { X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import useToast from "@/contexts/toast-context";

interface CreateLinkModalProps {
  open: boolean;
  onClose: () => void;
}

const PRIMARY = "#5e72e4";
const PRIMARY_LIGHT = "#eef0fc";

export function CreateLinkModal({ open, onClose }: CreateLinkModalProps) {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { mutate: createLink } = useCreateLink();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

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
          onSuccess: (data) => {
            toast({
              title: "Link created!",
              message: `Short link: ${data.shortCode}`,
              type: "success",
            });
            setUrl("");
            setCustomCode("");
            onClose();
          },
          onError: (err) => {
            toast({
              title: err.message || "Failed to create link",
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
    if (e.key === "Escape") onClose();
    if (e.key === "Enter" && isValid && !loading) handleCreate();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-xl border border-blue-500/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
            style={{ background: PRIMARY_LIGHT, color: PRIMARY }}
          >
            ⊕
          </div>
          <div>
            <div className="text-base font-bold text-gray-900">
              Shorten a URL
            </div>
            <div className="text-xs text-gray-500">Cmd+K to open anytime</div>
          </div>
          <button
            onClick={onClose}
            className="ml-auto p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* URL Input */}
          <div>
            <div
              className={cn(
                "flex items-center gap-3 bg-blue-50 rounded-lg border-2 p-3 transition-colors",
                url && !isValid
                  ? "border-red-300"
                  : url && isValid
                    ? "border-green-300"
                    : "border-gray-200",
              )}
            >
              <ArrowUpRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste your long URL here..."
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
              />
              {url && isValid && (
                <span className="text-green-600 text-sm font-bold">✓</span>
              )}
            </div>
          </div>

          {/* Custom Code Input */}
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-2">
              Custom code (optional)
            </label>
            <div className="flex items-center bg-blue-50 rounded-lg border border-gray-200 px-3">
              <span className="text-xs text-gray-500 font-semibold whitespace-nowrap">
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
                className="flex-1 bg-transparent outline-none p-2.5 text-gray-900 text-sm"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!isValid || loading}
              className={cn(
                "flex-1 px-4 py-2.5 rounded-lg font-semibold text-white transition-colors",
                !isValid || loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700",
              )}
            >
              {loading ? "Creating..." : "Create short link →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
