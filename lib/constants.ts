import { BarChart3, LayoutDashboard, Link2, Settings } from "lucide-react";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
export const SESSION_ID_KEY = "shorturl_session_id";
export const ACCESS_TOKEN_KEY = "shorturl_access_token";

export const navItems = [
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
