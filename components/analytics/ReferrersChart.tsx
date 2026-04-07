"use client";

import React from "react";

interface ReferrerData {
  referer: string;
  count: number;
}

interface ReferrersChartProps {
  data: ReferrerData[];
}

export function ReferrersChart({ data }: ReferrersChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 h-80 flex items-center justify-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Top Referrers</h3>
      <div className="space-y-4">
        {data.map((d) => (
          <div key={d.referer} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {d.referer}
              </span>
              <span className="text-sm font-bold text-gray-900">{d.count}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-blue-500"
                style={{
                  width: `${(d.count / maxCount) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
