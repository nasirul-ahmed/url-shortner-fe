export interface LoginResponse {
  accessToken: string;
  expiresIn: string;
  sessionId: string;
}

export interface Session {
  id: string;
  device: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface ShortUrlLink {
  // shortCode: string;
  // originalUrl: string;
  // totalClicks: number;
  // status: "active" | "expired" | "paused";
  // createdAt: string;
  // expiresAt?: string;

  _id?: string;
  shortCode: string;
  longUrl: string;
  customAlias?: string;
  createdAt: Date;
  expiresAt?: Date;
  userId?: string;
  isActive: boolean;
  clickCount: number;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedLinks {
  links: ShortUrlLink[];
  pagination: Pagination;
}

export interface CreateLinkPayload {
  longUrl: string;
  customAlias?: string;
}

export interface LinkAnalytics {
  clicksOverTime: { date: string; clicks: number }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: number;
    message: string;
    details?: any;
  };
}
