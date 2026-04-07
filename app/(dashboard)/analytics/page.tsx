"use client";

import { useQuery } from "@tanstack/react-query";
import { ClicksChart } from "@/components/analytics/ClicksChart";
import { ReferrersChart } from "@/components/analytics/ReferrersChart";
import { MyPieChart } from "@/components/analytics/PieChart";
import { StatCard } from "@/components/ui/StatCard";
import {
  BarChart3,
  MousePointerClick,
  Users,
  Link as LinkIcon,
} from "lucide-react";
import { linksApi } from "@/lib/api-module";

const DEVICE_COLORS: Record<string, string> = {
  desktop: "#5e72e4",
  mobile: "#8898aa",
  tablet: "#b0bec5",
  unknown: "#e0e0e0",
};

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-analytics"],
    queryFn: () => linksApi.getDashboardAnalytics(),
    staleTime: 1000 * 60 * 5,
  });

  const deviceData = data?.deviceBreakdown
    ? Object.entries(data.deviceBreakdown).map(([key, count]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: count,
        color: DEVICE_COLORS[key] ?? "#e0e0e0",
      }))
    : [];

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
          value={data?.totalClicks}
          delta={"+24.5%"}
          icon={<MousePointerClick className="w-5 h-5 text-blue-500" />}
        />
        <StatCard
          label="Unique Visitors"
          value={data?.uniqueVisitors}
          delta={"+18.2%"}
          icon={<Users className="w-5 h-5 text-green-500" />}
        />

        <StatCard
          label="Total Links"
          value={data?.totalUrls}
          delta={"+3"}
          icon={<LinkIcon className="w-5 h-5 text-purple-500" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ClicksChart data={data?.clicksOverTime ?? []} />
        </div>
        <div>
          <MyPieChart data={deviceData} title="Device Breakdown" />
        </div>
      </div>

      {/* Referrers */}
      <div>
        <ReferrersChart data={data?.topReferrers ?? []} />
      </div>
    </div>
  );
}
