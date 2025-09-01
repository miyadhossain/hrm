"use client";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function BarChartSimple({
  data,
}: {
  data: { label: string; value: number }[];
}) {
  const COLORS = [
    "#50E3C2",
    "#4A90E2",
    "#333333",
    "#F5A623",
    "#6FCF97",
    "#9B9B9B",
    "#BD10E0",
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" barSize={20} radius={5}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
