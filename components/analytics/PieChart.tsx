"use client";

import {
  PieChart,
  Pie,
  Sector,
  PieSectorShapeProps,
  Label,
  LabelList,
  LabelProps,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  title?: string;
  centerLabel?: string;
  centerValue?: string | number;
}

const RADIAN = Math.PI / 180;
const COLORS = [
  "#5e72e4",
  "#8898aa",
  "#b0bec5",
  "#e0e0e0",
  "#10b981",
  "#f59e0b",
];

function CustomPieSlice(props: PieSectorShapeProps) {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
}

function CustomLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
}

export function MyPieChart({
  data,
  title,
  centerLabel,
  centerValue,
}: PieChartProps) {
  console.log("Rendering PieChart with data:", data);
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 h-80 flex items-center justify-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-black font-bold">{title}</h1>
      <PieChart
        style={{
          width: "100%",
          maxWidth: "300px",
          maxHeight: "300px",
          aspectRatio: 1,
        }}
        responsive
        title={title}
      >
        <Pie
          data={data}
          labelLine={false}
          label={CustomLabel}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive={true}
          shape={CustomPieSlice}
        />
      </PieChart>
    </div>
  );
}
