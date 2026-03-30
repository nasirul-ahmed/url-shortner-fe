import React, { createContext, useContext, useState, useCallback } from "react";

export type ToastType = "success" | "error" | "warning";

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
  duration?: number;
}

export interface ToastOptions {
  title: string;
  message?: string;
  type?: ToastType;
  duration?: number;
}

const ToastContext = createContext<any>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback(
    ({ title, message, type = "success", duration = 4000 }: ToastOptions) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, title, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* RENDER THE TOASTS HERE GLOBALLY */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`p-4 rounded shadow-lg text-white ${
              t.type === "error" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            <strong>{t.title}</strong>
            {t.message && <p>{t.message}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default function useToast() {
  return useContext(ToastContext);
}
