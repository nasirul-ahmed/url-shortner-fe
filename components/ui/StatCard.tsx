import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string; // e.g., "+12.5%" or "-2.1%"
  icon: ReactNode; // we can pass icon or emoji : <MousePointerClick className="w-5 h-5" />
}

export function StatCard({ label, value, delta, icon }: StatCardProps) {
  const isPositive = delta?.startsWith("+");
  const isNegative = delta?.startsWith("-");

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex-1 min-w-[160px] shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </span>
        <span className="text-xl opacity-80">{icon}</span>
      </div>

      <div className="text-3xl font-bold text-slate-900 tracking-tight">
        {value}
      </div>

      {delta && (
        <div
          className={cn(
            "text-xs mt-2 font-semibold flex items-center gap-1",
            isPositive && "text-green-600",
            isNegative && "text-red-600",
            !isPositive && !isNegative && "text-gray-500",
          )}
        >
          <span>{delta}</span>
          <span className="font-normal text-gray-400">vs last month</span>
        </div>
      )}
    </div>
  );
}
