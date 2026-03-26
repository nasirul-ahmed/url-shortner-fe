export interface Session {
  id: string;
  device: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface ShortUrlLink {
  shortCode: string;
  originalUrl: string;
  totalClicks: number;
  status: "active" | "expired" | "paused";
  createdAt: string;
  expiresAt?: string;
}

export interface PaginatedLinks {
  data: ShortUrlLink[];
  total: number;
}

export interface CreateLinkPayload {
  originalUrl: string;
  customCode?: string;
}

export interface LinkAnalytics {
  clicksOverTime: { date: string; clicks: number }[];
}
