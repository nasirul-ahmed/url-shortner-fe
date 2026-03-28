"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ClicksChart } from "@/components/analytics/ClicksChart";
import { ReferrersChart } from "@/components/analytics/ReferrersChart";
import { StatCard } from "@/components/ui/StatCard";
import { ChevronLeft, MousePointerClick, Eye, Globe } from "lucide-react";

// TODO: Replace with actual API call
const MOCK_LINK = {
  shortCode: "gh-report",
  originalUrl: "https://github.com/acme/q4-report/releases/latest",
  totalClicks: 4821,
  status: "active" as const,
  createdAt: "2025-03-01",
};

const MOCK_CLICKS_DATA = [
  { date: "Mar 1", clicks: 312 },
  { date: "Mar 3", clicks: 489 },
  { date: "Mar 5", clicks: 721 },
  { date: "Mar 7", clicks: 534 },
];

const MOCK_REFERRERS = [
  { referrer: "twitter.com", count: 2431 },
  { referrer: "linkedin.com", count: 1218 },
  { referrer: "direct", count: 652 },
];

export default function LinkAnalyticsPage() {
  const params = useParams();
  const shortCode = params.shortCode as string;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Link href="/links" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="font-mono text-blue-600">/{shortCode}</span>
          </h1>
          <p className="text-sm text-gray-600">{MOCK_LINK.originalUrl}</p>
        </div>
        <div className="ml-auto">
          <Badge status={MOCK_LINK.status} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Clicks"
          value={MOCK_LINK.totalClicks}
          delta={"+256"}
          icon={<MousePointerClick className="w-5 h-5 text-blue-500" />}
        />
        <StatCard
          label="Unique Visitors"
          value={Math.round(MOCK_LINK.totalClicks * 0.73)}
          delta={"+18.2%"}
          icon={<Eye className="w-5 h-5 text-green-500" />}
        />
        <StatCard
          label="Top Referrer"
          value="twitter.com"
          icon={<Globe className="w-5 h-5 text-purple-500" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ClicksChart data={MOCK_CLICKS_DATA} />
        </div>
        <div>
          <ReferrersChart data={MOCK_REFERRERS} />
        </div>
      </div>
    </div>
  );
}
