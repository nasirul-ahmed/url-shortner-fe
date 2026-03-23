import React from "react";
import { cn } from "@/lib/utils";

// Matching the status types from our Link interface
type LinkStatus = "active" | "expired" | "paused";

interface BadgeProps {
  status: LinkStatus | string;
}

const statusStyles: Record<LinkStatus, { container: string; dot: string }> = {
  active: {
    container: "bg-green-50 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
  expired: {
    container: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
  },
  paused: {
    container: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
};

export function Badge({ status }: BadgeProps) {
  // Fallback to active if status is undefined or unknown
  const s = statusStyles[status as LinkStatus] || statusStyles.active;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors",
        s.container,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", s.dot)} />
      <span className="capitalize">{status}</span>
    </span>
  );
}
