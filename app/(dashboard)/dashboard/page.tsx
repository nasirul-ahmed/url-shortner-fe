"use client";
import { useLinks } from "@/hooks/use-links";
import { StatCard } from "@/components/ui/StatCard";
import { LinksTable } from "@/components/links/LinksTable";
import { BarChart3, Link2, MousePointerClick, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import { useDashboardStats } from "@/hooks/use-dashboard";
import dayjs from "dayjs";

export default function DashboardPage() {
  const [page, setPage] = React.useState(1);
  const { data: linksData, isLoading } = useLinks(page);
  const [query, setQuery] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const links = linksData?.links || [];

  const { data: dashboardData, isLoading: dashboardLoader } = useDashboardStats(
    dayjs(query.startDate).subtract(7, "day").toDate().toISOString(),
    dayjs(query.endDate).toDate().toISOString(),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's your link performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          loading={dashboardLoader}
          label="Total Clicks"
          value={dashboardData?.data?.totalClicks.toLocaleString()}
          delta={"+12.5%"}
          icon={<MousePointerClick className="w-5 h-5 text-blue-500" />}
        />
        <StatCard
          loading={dashboardLoader}
          label="Active Links"
          value={dashboardData?.data?.activeLinksCount}
          delta={"+2"}
          icon={<Link2 className="w-5 h-5 text-green-500" />}
        />
        <StatCard
          loading={dashboardLoader}
          label="Avg Clicks/Link"
          value={dashboardData?.data?.avgClicks}
          delta={"+8.2%"}
          icon={<TrendingUp className="w-5 h-5 text-purple-500" />}
        />
        <StatCard
          loading={dashboardLoader}
          label="Total Links"
          value={dashboardData?.data?.totalLinks}
          delta={"+3"}
          icon={<BarChart3 className="w-5 h-5 text-orange-500" />}
        />
      </div>

      {/* Recent Links */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Links</h2>
          <p className="text-sm text-gray-600">
            Your most recently created short links
          </p>
        </div>
        <LinksTable
          data={linksData || { links: [], pagination: {} }}
          isLoading={isLoading}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
