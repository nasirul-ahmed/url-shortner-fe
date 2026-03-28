"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import {
  BarChart3,
  Link2,
  Settings,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const PRIMARY = "#5e72e4";

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  console.log({ user });

  const navItems = [
    {
      id: "dashboard",
      label: "Overview",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    { id: "links", label: "Links", icon: Link2, href: "/links" },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
    },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href);

  return (
    <aside
      className="w-60 flex-shrink-0 h-screen sticky top-0 bg-white/70 backdrop-blur-2xl border-r border-blue-500/10 flex flex-col shadow-sm"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(239,240,252,0.95) 100%)",
      }}
    >
      {/* Logo Section */}
      <div className="px-6 py-7 border-b border-blue-500/10">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold"
            style={{
              background: `linear-gradient(135deg, ${PRIMARY} 0%, #8898f5 100%)`,
            }}
          >
            S
          </div>
          <span
            className="text-base font-bold text-gray-900"
            style={{ fontFamily: "Georgia, serif" }}
          >
            ShortUrl
          </span>
          {/* <span className="text-xs font-bold text-blue-600 bg-blue-50 rounded px-2 py-1">PRO</span> */}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-500 transition-all",
                active
                  ? "bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-600 border border-blue-100"
                  : "text-gray-600 hover:bg-gray-50",
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="px-4 py-4 border-t border-blue-500/10 space-y-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${PRIMARY} 0%, #8898f5 100%)`,
            }}
          >
            {user?.username
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase() || "U"}
          </div>
          <div className="overflow-hidden flex-1">
            <div className="text-sm font-bold text-gray-900 truncate">
              {user?.username || "User"}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {user?.email || "user@example.com"}
            </div>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-500 hover:bg-gray-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
