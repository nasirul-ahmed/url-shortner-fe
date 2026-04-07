"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ClicksChart } from "@/components/analytics/ClicksChart";
import { ReferrersChart } from "@/components/analytics/ReferrersChart";
import { MyPieChart } from "@/components/analytics/PieChart";
import { StatCard } from "@/components/ui/StatCard";
import { ChevronLeft, MousePointerClick, Eye, Globe } from "lucide-react";
import { BASE_URL } from "@/lib/constants";
import { io, Socket } from "socket.io-client";
import { authApi, linksApi } from "@/lib/api-module";
import { AnalyticsData, ShortUrlLink } from "@/types/api";

interface RealtimeAnalytics {
  shortCode: string;
  totalClicks: number;
  recentClicks: number;
  uniqueVisitors: number;
  lastUpdated: string;
}

export default function LinkAnalyticsPage() {
  const params = useParams();
  const shortCode = params.shortCode as string;

  // State for analytics data
  const [analytics, setAnalytics] = React.useState<AnalyticsData | null>(null);
  const [linkData, setLinkData] = React.useState<ShortUrlLink | null>(null);
  const [isLive, setIsLive] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!shortCode) return;

    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        const data = (await linksApi.getAnalytics(shortCode)) as AnalyticsData;

        setAnalytics(data);

        // const linkResponse = await fetch(`${BASE_URL}/links/${shortCode}`, {
        //   credentials: "include",
        // });

        // if (linkResponse.ok) {
        //   const link = await linkResponse.json();
        //   setLinkData(link);
        // }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load analytics",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [shortCode]);

  React.useEffect(() => {
    if (!shortCode) return;

    const socket: Socket = io("http://localhost:4000", {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected to Analytics Stream");
      setIsLive(true);

      socket.emit("subscribe", shortCode);
    });

    socket.on("analytics_stats", (data: AnalyticsData) => {
      if (data.shortCode === shortCode) {
        setAnalytics((prev) => (prev ? { ...prev, ...data } : data));
      }
    });

    // Receive full analytics snapshot (initial data + periodic updates)
    socket.on("analytics_snapshot", (data: AnalyticsData) => {
      if (data.shortCode === shortCode) {
        console.log("Received analytics snapshot:", data);
        setAnalytics(data);
      }
    });

    socket.on("realtime_analytics", (data: RealtimeAnalytics) => {
      if (data.shortCode === shortCode) {
        console.log("Received realtime update:", data);
        setAnalytics((prev) =>
          prev
            ? {
                ...prev,
                totalClicks: data.totalClicks,
                uniqueVisitors: data.uniqueVisitors,
              }
            : prev,
        );
      }
    });

    socket.on(
      "click_update",
      (data: { shortCode: string; count: number; timestamp: string }) => {
        if (data.shortCode === shortCode) {
          setAnalytics((prev) =>
            prev
              ? {
                  ...prev,
                  totalClicks: data.count,
                }
              : prev,
          );
        }
      },
    );

    socket.on("disconnect", () => {
      setIsLive(false);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsLive(false);
    });

    return () => {
      socket.emit("unsubscribe", shortCode);
      socket.disconnect();
    };
  }, [shortCode]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600">No analytics data available</p>
      </div>
    );
  }

  // Device breakdown data for pie chart
  const deviceData = analytics.deviceBreakdown
    ? [
        {
          name: "Desktop",
          value: analytics.deviceBreakdown.desktop,
          color: "#5e72e4",
        },
        {
          name: "Mobile",
          value: analytics.deviceBreakdown.mobile,
          color: "#10b981",
        },
        {
          name: "Tablet",
          value: analytics.deviceBreakdown.tablet,
          color: "#b0bec5",
        },
        {
          name: "Unknown",
          value: analytics.deviceBreakdown.unknown,
          color: "#e0e0e0",
        },
      ]
    : [];

  const topReferrer =
    analytics.topReferrers.length > 0
      ? analytics.topReferrers[0].referer
      : "None";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Link
          href="/links"
          className="p-2 bg-gray-200 hover:bg-gray-700 rounded-lg transition-colors text-black hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="font-mono text-blue-600">/{shortCode}</span>
            {isLive && (
              <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                Live
              </span>
            )}
          </h1>
          {/* <p className="text-sm text-gray-600">{linkData.longUrl}</p> */}
        </div>
        <div className="ml-auto">
          {/* <Badge status={linkData.isActive ? "active" : "inactive"} /> */}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Clicks"
          value={analytics.totalClicks}
          delta={isLive ? "Live" : ""}
          icon={<MousePointerClick className="w-5 h-5 text-blue-500" />}
        />
        <StatCard
          label="Unique Visitors"
          value={analytics.uniqueVisitors}
          delta={isLive ? "Live" : ""}
          icon={<Eye className="w-5 h-5 text-green-500" />}
        />
        <StatCard
          label="Top Referrer"
          value={topReferrer}
          icon={<Globe className="w-5 h-5 text-purple-500" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {analytics.clicksOverTime.length > 0 && (
          <div className="lg:col-span-2">
            <ClicksChart data={analytics.clicksOverTime} />
          </div>
        )}
        {analytics.topReferrers.length > 0 && (
          <div>
            <ReferrersChart data={analytics.topReferrers} />
          </div>
        )}
        <MyPieChart data={deviceData} title="Device Breakdown" />
      </div>

      {/* Device Breakdown */}
    </div>
  );
}
