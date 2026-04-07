"use client";

import React from "react";

interface ClicksData {
  date: string;
  clicks: number;
}

interface ClicksChartProps {
  data: ClicksData[];
}

export function ClicksChart({ data }: ClicksChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 h-80 flex items-center justify-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const maxClicks = Math.max(...data.map((d) => d.clicks));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Clicks over time</h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {data.map((d) => (
          <div key={d.date} className="flex flex-col items-center gap-2 flex-1">
            <div
              className="w-full bg-gradient-to-t from-blue-400 to-blue-500 rounded-t-lg transition-all hover:opacity-80"
              style={{
                height: `${(d.clicks / maxClicks) * 200}px`,
              }}
              title={`${d.clicks} clicks`}
            />
            <span className="text-xs text-gray-600 text-center text-nowrap">{d.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
