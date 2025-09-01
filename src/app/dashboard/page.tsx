"use client";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import Protected from "@/components/auth/Protected";
import BarChartSimple from "@/components/charts/BarChartSimple";
import DonutChart from "@/components/charts/DonutChart";
import Badge from "@/components/ui/Badge";
import {
  useGetAttendanceQuery,
  useGetChartsQuery,
  useGetKpisQuery,
} from "@/services/api";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { data: kpis, isLoading: kLoading } = useGetKpisQuery();
  const { data: charts, isLoading: cLoading } = useGetChartsQuery();
  const { data: attendance, isLoading: aLoading } = useGetAttendanceQuery();

  return (
    <Protected>
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">KPIs</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(kLoading
              ? Array.from({ length: 4 }).map((_, i) => ({
                  label: "—",
                  value: 0,
                }))
              : [
                  {
                    label: "Total Employees",
                    value: kpis?.totalEmployees,
                  },
                  { label: "Job View", value: kpis?.jobView, title: "Viewers" },
                  {
                    label: "Job Applied",
                    value: kpis?.jobApplied,
                  },
                  {
                    label: "Resigned Employees",
                    value: kpis?.resigned,
                  },
                ]
            ).map((k, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 shadow-soft"
              >
                <div className="text-sm flex items-center gap-x-2">
                  <div className="font-semibold">{k.label}</div>
                  {!kLoading && kpis?.trends?.[i] && (
                    <div>
                      <Badge
                        intent={
                          kpis.trends[i].dir === "up" ? "success" : "danger"
                        }
                      >
                        {kpis.trends[i].dir === "up" ? (
                          <TrendingUp size={15} />
                        ) : (
                          <TrendingDown size={15} />
                        )}{" "}
                        {kpis.trends[i].pct}%
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="text-2xl font-semibold">
                  {k.value?.toLocaleString?.() ?? "—"}
                </div>
                <p className="text-sm text-gray-500">Employee</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 shadow-soft">
            <div className="font-medium mb-2">Employee Composition</div>
            {cLoading ? (
              <div className="p-6 text-center">Loading chart…</div>
            ) : (
              <DonutChart data={charts.composition} />
            )}
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 shadow-soft">
            <div className="font-medium mb-2">Hiring Sources</div>
            {cLoading ? (
              <div className="p-6 text-center">Loading chart…</div>
            ) : (
              <BarChartSimple data={charts.sources} />
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">Employee Attendance</h2>
          </div>
          {aLoading ? (
            <div className="p-6 text-center">Loading attendance…</div>
          ) : (
            <AttendanceTable rows={attendance ?? []} />
          )}
        </section>
      </div>
    </Protected>
  );
}
