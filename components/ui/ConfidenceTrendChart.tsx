"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ConfidenceTrendChart({
  analyses,
}: {
  analyses: any[];
}) {
  const chartData = analyses.map((item, index) => ({
    name: `#${index + 1}`,
    confidence: item.confidence,
  }));

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        📈 Confidence Trend
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#334155" />

          <XAxis
            dataKey="name"
            stroke="#cbd5e1"
          />

          <YAxis
            stroke="#cbd5e1"
            domain={[0, 100]}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="confidence"
            stroke="#22c55e"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}