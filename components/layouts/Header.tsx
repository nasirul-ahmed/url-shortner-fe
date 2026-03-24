"use client";

import React from "react";
import { useAuth } from "@/contexts/auth-context";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">ShortUrl Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-900">{user?.name}</div>
          <div className="text-xs text-gray-500">{user?.email}</div>
        </div>
      </div>
    </header>
  );
}
