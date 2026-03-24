"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";

interface RevokeAllButtonProps {
  onRevokeAll?: () => Promise<void> | void;
}

export function RevokeAllButton({ onRevokeAll }: RevokeAllButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRevokeAll = async () => {
    setLoading(true);
    try {
      await onRevokeAll?.();
      setShowConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
        <div>
          <p className="font-semibold text-red-900">Revoke all sessions?</p>
          <p className="text-sm text-red-700">
            You will be signed out everywhere.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowConfirm(false)}
            className="px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-100 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleRevokeAll}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-semibold disabled:opacity-50"
          >
            {loading ? "Revoking..." : "Confirm"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors font-semibold"
    >
      <Trash2 className="w-4 h-4" />
      Revoke all sessions
    </button>
  );
}
