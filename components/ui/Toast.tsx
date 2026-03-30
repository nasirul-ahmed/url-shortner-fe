import React from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToastItem } from "@/contexts/toast-context";

interface ToastProps {
  toasts: ToastItem[];
  removeToast: (id: string) => void;
}

export default function Toast({ toasts, removeToast }: ToastProps) {
  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 w-full max-w-[400px]">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all duration-300 animate-in slide-in-from-right-5",
            t.type === "success" &&
              "bg-green-50 border-green-200 text-green-800",
            t.type === "error" && "bg-red-50 border-red-200 text-red-800",
            t.type === "warning" &&
              "bg-amber-50 border-amber-200 text-amber-800",
          )}
        >
          {/* Icon Mapping */}
          <div className="shrink-0 mt-0.5">
            {t.type === "success" && (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            )}
            {t.type === "error" && (
              <AlertCircle className="h-5 w-5 text-red-600" />
            )}
            {t.type === "warning" && (
              <Info className="h-5 w-5 text-amber-600" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h4 className="text-sm font-semibold leading-none">{t.title}</h4>
            {t.message && (
              <p className="mt-1 text-xs opacity-90 leading-relaxed">
                {t.message}
              </p>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={() => removeToast(t.id)}
            className="shrink-0 p-0.5 rounded-md hover:bg-black/5 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
