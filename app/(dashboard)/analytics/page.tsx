"use client";

import { ClicksChart } from "@/components/analytics/ClicksChart";
import { ReferrersChart } from "@/components/analytics/ReferrersChart";
import { DeviceChart } from "@/components/analytics/DeviceChart";
import { StatCard } from "@/components/ui/StatCard";
import { BarChart3, MousePointerClick, Users, Zap } from "lucide-react";
import { useDashboardStats } from "@/hooks/use-dashboard";

const MOCK_CLICKS_DATA = [
  { date: "Mar 1", clicks: 312 },
  { date: "Mar 3", clicks: 489 },
  { date: "Mar 5", clicks: 721 },
  { date: "Mar 7", clicks: 534 },
  { date: "Mar 9", clicks: 892 },
  { date: "Mar 11", clicks: 1203 },
  { date: "Mar 13", clicks: 967 },
  { date: "Mar 15", clicks: 1450 },
  { date: "Mar 17", clicks: 1102 },
  { date: "Mar 19", clicks: 1678 },
  { date: "Mar 21", clicks: 2011 },
];

const MOCK_REFERRERS = [
  { referrer: "twitter.com", count: 8431 },
  { referrer: "linkedin.com", count: 6218 },
  { referrer: "direct", count: 5102 },
  { referrer: "github.com", count: 3890 },
  { referrer: "google.com", count: 2744 },
  { referrer: "newsletter", count: 1823 },
];

const MOCK_DEVICES = [
  { device: "Desktop", count: 54, color: "#5e72e4" },
  { device: "Mobile", count: 34, color: "#8898aa" },
  { device: "Tablet", count: 12, color: "#b0bec5" },
];

export default function AnalyticsPage() {
  const { data: dashboardData } = useDashboardStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">
          Track your link performance and user behavior
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Clicks"
          value={dashboardData?.totalClicks}
          delta={"+24.5%"}
          icon={<MousePointerClick className="w-5 h-5 text-blue-500" />}
        />
        <StatCard
          label="Unique Visitors"
          value={dashboardData?.uniqueVisitors}
          delta={"+18.2%"}
          icon={<Users className="w-5 h-5 text-green-500" />}
        />
        <StatCard
          label="Avg. Click"
          value={dashboardData?.avgClicks}
          // delta={"+45s"}
          icon={<Zap className="w-5 h-5 text-orange-500" />}
        />
        <StatCard
          label="Total Links"
          value={dashboardData?.totalLinks}
          delta={"+3"}
          icon={<BarChart3 className="w-5 h-5 text-orange-500" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ClicksChart data={MOCK_CLICKS_DATA} />
        </div>
        <div>
          <DeviceChart data={MOCK_DEVICES} />
        </div>
      </div>

      {/* Referrers */}
      <div>
        <ReferrersChart data={MOCK_REFERRERS} />
      </div>
    </div>
  );
}
