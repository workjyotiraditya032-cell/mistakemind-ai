"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function MistakesByTopicChart({
  mistakes,
}: {
  mistakes: any[];
}) {
  const topicCounts = mistakes.reduce(
    (acc: any, item: any) => {
      const topic = item.topic || "Unknown";
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    },
    {}
  );

  const chartData = Object.entries(topicCounts).map(
    ([topic, count]) => ({
      topic,
      count,
    })
  );

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis
            dataKey="topic"
            stroke="#ffffff"
          />

          <YAxis
            stroke="#ffffff"
          />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#06b6d4"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}