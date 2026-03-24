"use client";

import React from "react";

interface DeviceData {
  device: string;
  count: number;
  color: string;
}

interface DeviceChartProps {
  data: DeviceData[];
}

export function DeviceChart({ data }: DeviceChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 h-80 flex items-center justify-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.count, 0);

  // Simple donut chart using CSS
  const cumulativePercentage: number[] = [];
  let current = 0;
  data.forEach((d) => {
    cumulativePercentage.push((current += (d.count / total) * 100));
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Device breakdown</h3>
      <div className="flex items-center justify-between gap-8">
        {/* Pie Chart */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 120 120">
              {data.map((d, i) => {
                const startAngle = (cumulativePercentage[i - 1] || 0) * 3.6;
                const endAngle = cumulativePercentage[i] * 3.6;
                const startRad = (startAngle - 90) * (Math.PI / 180);
                const endRad = (endAngle - 90) * (Math.PI / 180);

                const x1 = 60 + 40 * Math.cos(startRad);
                const y1 = 60 + 40 * Math.sin(startRad);
                const x2 = 60 + 40 * Math.cos(endRad);
                const y2 = 60 + 40 * Math.sin(endRad);

                const largeArc = endAngle - startAngle > 180 ? 1 : 0;

                return (
                  <path
                    key={d.device}
                    d={`M 60 60 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={d.color}
                    opacity={0.8}
                    className="hover:opacity-100 transition-opacity cursor-pointer"
                  />
                );
              })}
              <circle cx="60" cy="60" r="25" fill="white" />
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {data.map((d) => (
            <div key={d.device} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: d.color }}
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700">{d.device}</div>
                <div className="text-xs text-gray-500">
                  {d.count} ({((d.count / total) * 100).toFixed(0)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
